import sys
import os

# ⚡️ FIX: Remove Azure's outdated 'agents' path causing the typing_extensions crash
# This forces Python to look in your virtual environment first.
sys.path = [p for p in sys.path if "agents/python" not in p]



import os
import uuid
import shutil
import asyncio
from datetime import datetime, timedelta, timezone
from typing import Dict, Any

from fastapi import (
    FastAPI,
    HTTPException,
    UploadFile,
    File,
    Depends,
    status,
    Request,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import FileResponse, JSONResponse
# ✅ ADDED THESE CRITICAL IMPORTS
from fastapi.staticfiles import StaticFiles 
from jose import JWTError, jwt
from passlib.context import CryptContext
from dotenv import load_dotenv

# ===============================
# APP LIBS
# ===============================
from app.libs.database import DatabaseService
from app.libs.extract import extract_text
from app.libs.google_search import google_search
from app.libs.scraper import extract_text_from_url
from app.libs.ai_detection import detect_ai_content
from app.libs.plagiarism import (
    local_plagiarism_score,
    local_plagiarism_score_with_commoncrawl,
    build_web_source_tokens,
)
from app.libs.models import AnalysisResult
from slowapi.errors import RateLimitExceeded
from app.core.limitter import limiter
from app.api import student
from fastapi import Response

# ===============================
# ENV
# ===============================
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
STORAGE_DIR = os.getenv("STORAGE_DIR", "/tmp/plagiarism_files")
MIN_TEXT_LENGTH = int(os.getenv("MIN_ANALYSIS_TEXT_LENGTH", 20))

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY missing in .env")

os.makedirs(STORAGE_DIR, exist_ok=True)

app = FastAPI(
    title="Plagiarism Analysis API",
    version="1.0.0",
    description="Upload documents, detect plagiarism & AI content",
)

app.state.limiter = limiter

# ===============================
# EXCEPTION HANDLER
# ===============================
@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Too many requests. Please slow down."},
    )

# ===============================
# CORS
# ===============================
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://plagiarism-analysis-app.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# ROUTERS
# ===============================
app.include_router(student.router, prefix="/student", tags=["Student"])

# ===============================
# AUTH SETUP
# ===============================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/login",
    scopes={"admin": "Admin access", "student": "Student access"},
)

# ===============================
# DB
# ===============================
db_service = DatabaseService()

@app.on_event("startup")
async def startup():
    await db_service.init_db()

# ===============================
# JWT HELPERS
# ===============================
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        username = payload.get("username")
        role = payload.get("role")
        if not user_id or not username or not role:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"id": user_id, "username": username, "role": role}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

def require_role(required_role: str):
    def checker(user: Dict[str, Any] = Depends(get_current_user)):
        if user["role"] != required_role:
            raise HTTPException(status_code=403, detail="Forbidden")
        return user
    return checker

# ===============================
# API ENDPOINTS
# ===============================
@app.get("/api/health") 
async def health_check():
    return {"status": "Plagiarism Analysis API running"}

@app.post("/auth/login")
@limiter.limit("10/minute")
async def login(
    request: Request,
    response: Response,
    form: OAuth2PasswordRequestForm = Depends(),
):
    user = await db_service.get_user(form.username)
    if not user or not pwd_context.verify(form.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    role = user.get("role", "student")

    token = create_access_token(
        {
            "sub": user["user_id"],
            "username": user["username"],
            "role": role,
        },
        timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )

    # ✅ PRODUCTION COOKIE SETTINGS
    # SameSite='lax' + Secure=True ensures cookies work on the same domain (Render)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=True, 
        samesite="lax", 
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        path="/"
    )

    return {
        "success": True,
        "user_id": user["user_id"],
        "username": user["username"],
        "role": role,
    }

@app.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"success": True}

@app.get("/auth/validate-token")
async def validate_token(user=Depends(get_current_user)):
    return user

@app.get("/admin/dashboard")
async def admin_dashboard(user=Depends(require_role("admin"))):
    return await db_service.get_all_documents()

@app.post("/upload")
@limiter.limit("20/minute")
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    user=Depends(get_current_user),
):
    ext = os.path.splitext(file.filename)[1].lower()
    uid = str(uuid.uuid4())
    file_path = os.path.join(STORAGE_DIR, f"{uid}{ext}")

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    extracted_text = ""
    try:
        extracted_text = await extract_text(file_path, file.content_type)
    except Exception:
        pass

    doc = await db_service.create_document(
        user_id=user["id"],
        file_name=file.filename,
        content_type=file.content_type,
        size=len(content),
        file_path=file_path,
    )

    if extracted_text:
        await db_service.store_extracted_text(doc["id"], extracted_text)

    return {"success": True, "document_id": doc["id"]}

@app.post("/analyze/{document_id}")
@limiter.limit("20/minute")
async def analyze(request: Request, document_id: int, user=Depends(get_current_user)):
    doc = await db_service.get_document(document_id)
    if not doc:
        raise HTTPException(404, "Document not found")
    if doc["user_id"] != user["id"] and user["role"] != "admin":
        raise HTTPException(403, "Unauthorized")

    text = doc.get("extracted_text", "")
    if len(text) < MIN_TEXT_LENGTH:
        raise HTTPException(400, "Insufficient text")

    start = datetime.utcnow()

    # LOCAL DB
    others = await db_service.get_all_documents_texts(exclude_id=document_id)
    def get_text(doc: dict) -> str:
        return (doc.get("extracted_text") or doc.get("text") or "")
    
    other_texts = [get_text(d) for d in others if get_text(d)]
    local_score = local_plagiarism_score(text, other_texts)

    # GOOGLE
    snippet = " ".join(text.split()[:50])
    urls = await asyncio.to_thread(google_search, snippet)
    pages = await asyncio.gather(
        *[asyncio.to_thread(extract_text_from_url, u) for u in urls],
        return_exceptions=True,
    )
    web_texts = [p for p in pages if isinstance(p, str)]
    google_score = local_plagiarism_score(text, web_texts)

    # COMMONCRAWL & AI
    commoncrawl_score = local_plagiarism_score_with_commoncrawl(text)
    ai_score = min(100.0, max(0.0, detect_ai_content(text)))

    web_score = max(google_score, commoncrawl_score, local_score)
    human_score = max(0.0, 100.0 - web_score)

    sources = []
    if urls:
        sources.extend(build_web_source_tokens(urls))
    if local_score > 0:
        sources.append(f"local_db::document:{document_id}")
    sources = list(dict.fromkeys(sources))

    end = datetime.utcnow()

    result = AnalysisResult(
        document_id=document_id,
        analyzed_by=user["id"],
        ai_detected_percentage=round(ai_score, 2),
        web_source_percentage=round(web_score, 2),
        local_similarity_percentage=round(local_score, 2),
        human_written_percentage=round(human_score, 2),
        analysis_summary="Analysis completed",
        analysis_date=end,
        matched_web_sources=sources,
        processing_time_seconds=(end - start).total_seconds(),
    )

    await db_service.create_analysis_result(result)
    return {"success": True, "status": "completed"}

@app.get("/analysis-status/{document_id}")
@limiter.limit("30/minute")
async def analysis_status(request: Request, document_id: int, user=Depends(get_current_user)):
    doc = await db_service.get_document(document_id)
    if not doc:
        raise HTTPException(404)
    if doc["user_id"] != user["id"] and user["role"] != "admin":
        raise HTTPException(403)

    result = await db_service.get_analysis_result_for_document(document_id)
    if not result:
        return {"status": "pending"}

    raw_sources = result.get("matched_web_sources", []) or []
    decoded_sources = []
    for s in raw_sources:
        if isinstance(s, str) and "::" in s:
            t, v = s.split("::", 1)
            decoded_sources.append({"type": t, "source": v})

    return {
        "success": True,
        "status": "completed",
        "result": {
            "document_id": result["document_id"],
            "ai_detected_percentage": float(result["ai_detected_percentage"]),
            "web_source_percentage": float(result["web_source_percentage"]),
            "human_written_percentage": float(result["human_written_percentage"]),
            "analysis_summary": result["analysis_summary"],
            "analysis_date": result["analysis_date"].isoformat() if result["analysis_date"] else None,
            "matched_sources": decoded_sources,
            "processing_time_seconds": result.get("processing_time_seconds", 0),
        },
    }

@app.get("/files/original/{document_id}")
async def view_file(document_id: int, user=Depends(get_current_user)):
    doc = await db_service.get_document(document_id)
    if not doc:
        raise HTTPException(404)
    if doc["user_id"] != user["id"] and user["role"] != "admin":
        raise HTTPException(403)

    return FileResponse(
        path=doc["file_path"],
        filename=doc["file_name"],
        media_type=doc["content_type"],
    )

# ============================================================
# ⚡️ SERVE REACT FRONTEND (Production Mode)
# ============================================================

# ✅ ROBUST PATH FINDING
# This ensures we find the build folder whether running from /backend or /opt/render/project/src
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Path to backend/app
BUILD_DIR = os.path.join(BASE_DIR, "build") # Path to backend/app/build

# 1. Mount the "assets" folder (JS/CSS)
if os.path.isdir(os.path.join(BUILD_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(BUILD_DIR, "assets")), name="assets")

# 2. Catch-all route: Requests that are NOT api/ go to index.html
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    # Check if a specific file exists (like favicon.svg, robots.txt)
    file_path = os.path.join(BUILD_DIR, full_path)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Otherwise, return index.html (React Router handles the rest)
    index_path = os.path.join(BUILD_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    return {"error": "Frontend build not found. Did you run the build and move the folder?"}

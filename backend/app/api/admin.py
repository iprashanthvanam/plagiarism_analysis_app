from fastapi import APIRouter, Depends
from app.libs.database import db_service
from app.api.auth import get_current_user
from app.libs.models import User

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard(user: User = Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    documents = await db_service.get_all_documents()
    return [{"id": doc.id, "user_id": doc.user_id, "file_name": doc.file_name, "upload_date": doc.upload_date} for doc in documents]
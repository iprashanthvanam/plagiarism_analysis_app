




from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.env import SECRET_KEY, ALGORITHM
from app.libs.database import db_service

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# =========================
# PASSWORD HANDLING
# =========================

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# =========================
# AUTHENTICATION
# =========================

async def authenticate_user(username: str, password: str):
    user = await db_service.get_user_by_username(username)
    if not user:
        return None
    if not verify_password(password, user["password_hash"]):
        return None
    return user


# =========================
# JWT TOKEN
# =========================

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=24))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# =========================
# ✅ REQUIRED BY analysis.py, student.py, admin.py
# =========================

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        return {
            "id": payload["sub"],          # user_id
            "role": payload["role"],
            "username": payload["username"],
        }

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

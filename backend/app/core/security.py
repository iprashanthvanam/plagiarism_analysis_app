# app/core/security.py
from fastapi import Request, HTTPException, status
from jose import jwt, JWTError
import os



SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {
            "id": payload["sub"],
            "username": payload["username"],
            "role": payload["role"],
        }
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

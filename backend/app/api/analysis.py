from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import JSONResponse
from app.libs.database import db_service
from app.libs.auth import get_current_user
# from app.libs.storage import save_file, get_file_path
from app.libs.models import User, Document, AnalysisResult
import uuid
from datetime import datetime

router = APIRouter()


# backend/app/libs/storage.py
# Compatibility helpers ONLY

from fastapi import UploadFile
from typing import Optional

async def save_file(file: UploadFile, unique_name: Optional[str] = None) -> str:
    raise RuntimeError("save_file is deprecated. Upload handled in main.py")

def get_file_path(path: str) -> str:
    return path












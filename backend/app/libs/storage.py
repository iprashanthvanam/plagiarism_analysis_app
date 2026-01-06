import os
from fastapi import UploadFile
from app.env import STORAGE_DIR
from fastapi import HTTPException
from fastapi import UploadFile
from typing import Optional






BASE_UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")
BASE_REPORT_DIR = os.getenv("REPORT_DIR", "reports")


async def save_file(file: UploadFile, unique_name: Optional[str] = None) -> str:
    """
    Deprecated.
    Upload logic is handled directly in main.py.
    This function exists only to avoid ImportError.
    """
    raise RuntimeError(
        "save_file() is deprecated. "
        "File saving is handled directly in main.py."
    )


def get_file_path(file_path: str) -> str:
    """
    Identity helper for backward compatibility.
    """
    return file_path

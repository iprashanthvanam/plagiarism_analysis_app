




import os
from dotenv import load_dotenv

# Load .env from the project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

def get_env_var(name: str, default: str = None, required: bool = False) -> str:
    value = os.getenv(name, default)
    if required and not value:
        raise EnvironmentError(f"Missing required environment variable: {name}")
    return value

# Database configuration
DB_USER = get_env_var("DB_USER", "postgres")
DB_PASSWORD = get_env_var("DB_PASSWORD", "password")
DB_HOST = get_env_var("DB_HOST", "localhost")
DB_PORT = get_env_var("DB_PORT", "5432")
DB_NAME = get_env_var("DB_NAME", "plagiarism_db")

# Storage directory
STORAGE_DIR = get_env_var("STORAGE_DIR", "/tmp/plagiarism_files")

# Security
SECRET_KEY = get_env_var("SECRET_KEY", "your-secret-key")
ALGORITHM = get_env_var("ALGORITHM", "HS256")

# API Keys (critical, no overriding print)
GOOGLE_API_KEY = get_env_var("GOOGLE_API_KEY", required=True)  # For Google Search
GOOGLE_CSE_ID = get_env_var("GOOGLE_CSE_ID", required=True)
GEMINI_API_KEY = get_env_var("GEMINI_API_KEY", required=True)  # For Gemini OCR, separate

if os.getenv("GOOGLE_API_KEY") and GEMINI_API_KEY:
    print("[WARN] Both keys set; GOOGLE_API_KEY for search, GEMINI_API_KEY for OCR.")  # Clear warning

# Frontend URL
FRONTEND_URL = get_env_var("FRONTEND_URL", "http://localhost:3000")

# Ensure storage directory exists
os.makedirs(STORAGE_DIR, exist_ok=True)
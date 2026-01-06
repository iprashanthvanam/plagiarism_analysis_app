import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "plagiarism_db")
STORAGE_DIR = os.getenv("STORAGE_DIR", "/tmp/plagiarism_files")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

# Create storage dir
if not os.path.exists(STORAGE_DIR):
    os.makedirs(STORAGE_DIR)




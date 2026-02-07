# Plagiarism Analysis Application

Live Site  
https://plagiarismanalyser-d8a6d0f9f2deczhn.southindia-01.azurewebsites.net/

---

## Project Overview

The Plagiarism Analysis Application is a full-stack web platform designed to detect, analyze, and manage plagiarism in academic and professional documents. It supports multiple file formats, role-based access, secure authentication, and AI-assisted analysis workflows.

The application allows users to:

- Upload documents for plagiarism analysis
- View analysis results and similarity insights
- Manage users with admin and student roles
- Reset, reseed, and maintain database consistency
- Perform OCR-based analysis for scanned documents
- Maintain a clean and predictable development environment

This project demonstrates a production-grade full-stack system using modern backend and frontend technologies.

---

## Key Features

- Role-based access with admin and student roles
- Secure JWT-based authentication
- Multi-format document upload support
- AI-assisted plagiarism analysis
- Database seeding with default users
- Safe database resets without schema loss
- Frontend dashboards for uploads and results
- Predictable development and restart workflow

---

## Tech Stack

### Backend
- FastAPI for REST APIs and authentication
- SQLAlchemy for ORM and database interaction
- PostgreSQL for data storage
- JWT for secure authentication
- Gemini API for OCR and text analysis
- Uvicorn as ASGI server

### Frontend
- React for user interface and dashboards

---

## Backend Setup

Create and Activate Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

You should see:
```
(venv)
```

Install Backend Dependencies:
```
pip install -r requirements.txt
```
Start Backend Server:
```
uvicorn main:app --reload
```
Backend runs at:
```
http://127.0.0.1:8000
```
---
### Frontend Setup
Navigate to Frontend Directory
```
cd frontend
```

Install Dependencies:
```
npm install
```

Start Frontend Server:
```
npm start
```


Frontend runs at:
```
http://localhost:3000
```
---


### Database Setup
Enter PostgreSQL Shell:
```
psql -U postgres
```

If your database name is plagiarism_db:
```
\c plagiarism_db;
```

Run:
```
psql -U username -d dbname -f schema.sql
```
```
TRUNCATE TABLE analysis_results CASCADE;
TRUNCATE TABLE documents CASCADE;
TRUNCATE TABLE users CASCADE;
```


---

### Database Seeding (seed.py):
Purpose: seed.py creates default admin and student users with known credentials for testing, demos, and development.

```
python seed.py
```

## Example Seeded Accounts:

| Role    | Username      | Password   |
|---------|---------------|------------|
| Admin   | admin-001     | admin123   |
| Admin   | admin-002     | admin123   |
| Student | student-001   | student123 |
| Student | student-002   | student123 |

Run Seeding Script:
```
cd backend
```
```
python seed.py
```

Expected Output:

- Admin users created
- Student users created
- Database seeding completed
---

### Changing Passwords (Recommended Method):
Truncate users & documents (SQL above)
Modify credentials inside seed.py

Re-run:
```
python seed.py
```

- Passwords are hashed automatically
- No manual SQL updates required
---

### Full Restart Flow (Recommended):
-Stop backend & frontend
-Truncate users, documents, analysis_results
-Run seed.py
-Start backend
-Start frontend

- Guarantees a clean, predictable state
- Avoids token, cache & mismatch issues
---
### 🧪 Supported File Types:
- PDF (text & scanned)
- DOC / DOCX
- PPT / PPTX
- PDF (Imagescanner/Digital)
- TXT
- Images (OCR via Gemini)


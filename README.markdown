# Plagiarism Analysis Application


The **Plagiarism Analysis Application** is a full-stack web platform designed to detect, analyze, and manage plagiarism in academic and professional documents. It supports multiple file formats, role-based access, secure authentication, and AI-assisted analysis workflows.

The application allows users to:

- Upload documents for plagiarism analysis
- View analysis results and similarity insights
- Manage users with admin & student roles
- Reset, reseed, and maintain database consistency
- Support OCR-based analysis for scanned documents
- Maintain a clean and predictable development environment

The project demonstrates a **production-grade full-stack system** using modern backend and frontend technologies.

---

## Key Features

- **Role-Based Access:** Admin & Student authentication
- **Secure Login:** JWT-based authentication
- **Document Upload:** Multiple supported formats
- **Plagiarism Analysis:** AI-assisted text comparison
- **Database Seeding:** One-command fresh setup
- **Safe Resets:** Truncate data without schema loss
- **Frontend Dashboard:** Clean UI for uploads & results
- **Predictable Dev Flow:** Clean restart & reseed process

---

## Tech Stack

| Layer | Technology | Purpose |
|------|-----------|---------|
| **Backend** | FastAPI | REST APIs, authentication, analysis |
| **Frontend** | React | User interface & dashboards |
| **Database** | PostgreSQL | User, document & analysis storage |
| **ORM** | SQLAlchemy | Database interaction |
| **Auth** | JWT | Secure role-based access |
| **AI / OCR** | Gemini API | Text extraction & analysis |
| **Server** | Uvicorn | ASGI backend server |

---

### Backend Setup (FastAPI):
Create & Activate Virtual Environment
```
cd backend
```
```
python3 -m venv venv
```
```
source venv/bin/activate
```

### You should see:
```
(venv)
```

### Install Backend Dependencies:
```
pip install -r requirements.txt
```
### Start Backend Server:
```
uvicorn main:app --reload
```
### Backend runs at:
```
http://127.0.0.1:8000
```
---
### Frontend Setup (React):
```
cd frontend
```

### Install Dependencies:
```
npm install
```

### Start Frontend Server:
```
npm start
```


### Frontend runs at:
```
http://localhost:3000
```
---



### Enter PostgreSQL Shell:
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


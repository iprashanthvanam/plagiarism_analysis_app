🐘 PostgreSQL — Access & Reset
🔑 Enter PostgreSQL Shell
psql -U postgres

If your database name is plagiarism_db:

\c plagiarism_db;

🧹 Reset Users, Documents & Analysis Data (Safe Reset)

Use this when you want to:

Change admin/student passwords

Re-seed fresh users

Remove all uploaded documents & analysis results

⚠️ This does NOT delete schema, only data.
TRUNCATE TABLE analysis_results CASCADE;
TRUNCATE TABLE documents CASCADE;
TRUNCATE TABLE users CASCADE;

✔ Passwords
✔ Tokens
✔ Uploaded files (DB references)
✔ Analysis results

❌ Tables remain intact
❌ No migrations required

🌱 Database Seeding (seed.py)
Purpose

seed.py creates default admin and student users with known credentials for testing and demo.

Example Seeded Accounts
Role Username Password
Admin admin-001 admin123
Admin admin-002 admin123
Student student-001 student123
Student student-002 student123
▶ Run Seeding Script
cd backend
python seed.py

Expected output:

✔ Admin users created
✔ Student users created
✔ Database seeding completed

You can safely run seed.py after truncating tables.

🔐 Changing Passwords (Recommended Method)

Truncate users & documents (see SQL above)

Modify passwords inside seed.py

Re-run:

python seed.py

✔ Passwords are hashed automatically
✔ No manual SQL updates required

🐍 Backend Setup (FastAPI)
1️⃣ Create & Activate Virtual Environment
cd backend
python3 -m venv venv
source venv/bin/activate

You should see:

(venv)

2️⃣ Install Backend Dependencies
pip install -r requirements.txt

3️⃣ Start Backend Server
uvicorn main:app --reload

Backend will run at:

http://127.0.0.1:8000

⚛️ Frontend Setup (React)
1️⃣ Navigate to Frontend
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Start Frontend Server
npm start

Frontend will run at:

http://localhost:3000

🔁 Full Restart Flow (Recommended)

When things feel inconsistent:

1. Stop backend & frontend
2. TRUNCATE users/documents/analysis_results
3. Run seed.py
4. Start backend
5. Start frontend

This guarantees a clean and predictable state.

🧪 Supported File Types

PDF (text & scanned)

DOC / DOCX

PPT / PPTX

TXT

Images (OCR via Gemini)

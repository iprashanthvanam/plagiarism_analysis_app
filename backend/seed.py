




# from dotenv import load_dotenv


# from passlib.context import CryptContext
# from app.libs.database import db_service

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# load_dotenv()

# async def seed_data():
#     if not db_service.pool:
#         await db_service.init_db()

#     admin_password_hash = pwd_context.hash("admin123")
#     student_password_hash = pwd_context.hash("student123")

#     # ---- ADMINS ----
#     await db_service.create_user(
#         user_id="admin-001",
#         username="admin-001",
#         role="admin",
#         password_hash=admin_password_hash,
#     )

#     await db_service.create_user(
#         user_id="admin-002",
#         username="admin-002",
#         role="admin",
#         password_hash=admin_password_hash,
#     )

#     # ---- STUDENTS ----
#     await db_service.create_user(
#         user_id="student-001",
#         username="student-001",
#         role="student",
#         password_hash=student_password_hash,
#     )

#     await db_service.create_user(
#         user_id="student-002",
#         username="student-002",
#         role="student",
#         password_hash=student_password_hash,
#     )

#     print("✅ Users seeded correctly with real identity separation")


# if __name__ == "__main__":
#     import asyncio
#     asyncio.run(seed_data())












from dotenv import load_dotenv
from passlib.context import CryptContext
from app.libs.database import db_service

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
load_dotenv()

USERS = [
    # ---- ADMINS ----
    {
        "user_id": "admin-001",
        "username": "admin-001",
        "role": "admin",
        "password": "Admin@001",
    },
    {
        "user_id": "admin-002",
        "username": "admin-002",
        "role": "admin",
        "password": "Admin@002",
    },

    # ---- STUDENTS ----
    {
        "user_id": "student-001",
        "username": "student-001",
        "role": "student",
        "password": "Student@001",
    },
    {
        "user_id": "student-002",
        "username": "student-002",
        "role": "student",
        "password": "Student@002",
    },
]

async def seed_data():
    if not db_service.pool:
        await db_service.init_db()

    for user in USERS:
        password_hash = pwd_context.hash(user["password"])

        await db_service.create_user(
            user_id=user["user_id"],
            username=user["username"],
            role=user["role"],
            password_hash=password_hash,
        )

    print("✅ Users seeded with UNIQUE passwords")

if __name__ == "__main__":
    import asyncio
    asyncio.run(seed_data())

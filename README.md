# 🗂 Task Manager API

## 📌 Project Overview

This project is a scalable REST API built using **FastAPI** with **PostgreSQL**, implementing:

- JWT Authentication  
- Role-Based Access Control (RBAC)  
- Full CRUD operations for Tasks  
- Secure password hashing  
- React frontend for testing APIs  

The system supports two roles:

- 👤 User  
- 🛡 Admin  

---

## 🛠 Tech Stack

### 🔹 Backend

- FastAPI  
- PostgreSQL  
- SQLAlchemy ORM  
- JWT (python-jose)  
- bcrypt (passlib)  
- Pydantic  

### 🔹 Frontend

- React.js  
- Axios  

---

## 📁 Project Structure

```
app/
├── auth/
├── core/
├── models/
├── schemas/
├── routers/
├── services/
├── database.py
├── main.py

frontend/
```

The project follows a modular and scalable architecture separating:

- **Routers** → API layer  
- **Services** → Business logic  
- **Models** → Database layer  
- **Schemas** → Validation layer  

---

## 🔐 Authentication & Authorization

- Passwords are hashed using **bcrypt**
- JWT tokens are issued upon login
- Role-based access is enforced at backend level
- Admin-only routes are protected using dependencies

---

## 🧾 Features Implemented

### 1️⃣ User Authentication

- Register  
- Login  
- Password hashing  
- JWT token generation  
- Protected routes  

---

### 2️⃣ Role-Based Access

- `user` role  
- `admin` role  
- Admin can view all tasks  
- Users can manage only their own tasks  

---

### 3️⃣ Task CRUD

- Create task  
- View own tasks  
- Update title & description  
- Update status  
- Delete task (only if completed)  

---

## 🗄 Database Configuration (PostgreSQL)

Make sure PostgreSQL is installed and running.

Create database:

```sql
CREATE DATABASE taskdb;
```

Update `database.py`:

```python
DATABASE_URL = "postgresql://postgres:yourpassword@localhost:5432/taskdb"
```

---

## ▶️ How To Run The Project

### 🔹 Backend Setup

Create virtual environment:

```bash
python -m venv env
```

Activate environment:

```bash
env\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn app.main:app --reload
```

API Docs available at:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm start
```

App runs at:

```
http://localhost:3000
```

---

## 🔍 API Endpoints

### 🔐 Authentication

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### 📋 Tasks

- `GET /api/v1/tasks` → User tasks  
- `GET /api/v1/tasks/all` → Admin only  
- `POST /api/v1/tasks`  
- `PUT /api/v1/tasks/{id}`  
- `DELETE /api/v1/tasks/{id}`  

---

## ⚡ Scalability Considerations

- Modular project structure for maintainability  
- Service layer separation for business logic  
- PostgreSQL for production-grade relational storage  
- Stateless JWT authentication allows horizontal scaling  
- Role-based authorization implemented at backend level  

### 🚀 Future Improvements

- Docker containerization  
- Redis caching  
- Deployment on cloud (AWS / Render)  

---

## 📦 Security Considerations

- Password hashing using bcrypt  
- JWT authentication  
- Role-based backend enforcement  
- Input validation using Pydantic  
- No raw SQL queries (ORM-based)  

---

## 👨‍💻 Author

Built as a scalable backend project demonstrating production-ready architecture using FastAPI.
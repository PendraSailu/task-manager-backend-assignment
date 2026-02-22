# 🚀 Task Manager API

## 📌 Project Overview

This project is a scalable REST API built using **Python (FastAPI)** with **PostgreSQL** as the database 
and **React.js** as the frontend.

The system implements:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Full CRUD operations for Tasks
- Secure password hashing
- Modular & scalable backend architecture
- React frontend to interact with the APIs

The system supports two roles:

- User
- Admin

---

## 🛠 Tech Stack

### 🔹 Backend

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Pydantic
- JWT (python-jose)
- bcrypt (passlib)

### 🔹 Frontend

- React.js
- Axios
- CSS

---

## 📁 Project Structure

```
app/
├── auth/
├── core/
├── models/
├── routers/
├── schemas/
├── services/
├── database.py
├── main.py

frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── public/
├── package.json
```

### Architecture Layers

- **Routers** → API layer  
- **Services** → Business logic  
- **Models** → Database layer  
- **Schemas** → Validation layer  

This layered structure ensures maintainability and scalability.

---

## 🔐 Authentication & Authorization

- Passwords are hashed using bcrypt.
- JWT tokens are generated upon login.
- Protected routes require a valid JWT token.
- Role-based access control is enforced at backend level.
- Admin-only routes are secured using dependency injection.

---

## 👥 Roles

### User
- Register
- Login
- Create tasks
- View own tasks
- Update own tasks
- Delete task (only if completed)

### Admin
- View all users' tasks
- Manage system-level access

---

## 🧾 Features Implemented

### 1️⃣ Authentication APIs

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

Includes:
- Password hashing
- JWT token generation
- Protected route access

---

### 2️⃣ Role-Based Access Control

- `user` role
- `admin` role
- Admin can access all tasks
- Users can access only their own tasks

---

### 3️⃣ Task CRUD APIs

- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/all` (Admin only)
- `PUT /api/v1/tasks/{id}`
- `DELETE /api/v1/tasks/{id}`

---

## 🗄 Database Configuration (PostgreSQL)

Ensure PostgreSQL is installed and running.

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
python -m venv venv
```

Activate environment:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the server:

```bash
uvicorn app.main:app --reload
```

Swagger API documentation:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the React application:

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔍 API Documentation

- Swagger UI available at `/docs`
- Versioned APIs under `/api/v1/`
- Proper HTTP status codes implemented
- Centralized error handling
- Pydantic validation for request and response models

---

## ⚡ Scalability Considerations

- Modular layered backend architecture
- Service layer abstraction
- API versioning
- Stateless JWT authentication
- PostgreSQL for production-ready relational storage
- Clean separation of concerns

---

## 🔒 Security Practices

- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization enforcement
- Input validation using Pydantic
- ORM-based queries (no raw SQL)
- Proper HTTP status handling
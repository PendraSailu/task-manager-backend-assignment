from sqlalchemy.orm import Session
from app.models.user import User
from app.auth.hashing import hash_password, verify_password
from fastapi import HTTPException


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if user and verify_password(password, user.password):
        return user
    return None
def create_user(db: Session, username: str, password: str):
    existing_user = db.query(User).filter(User.username == username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    role = "admin" if db.query(User).count() == 0 else "user"

    user = User(
        username=username,
        password=hash_password(password),
        role=role
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user
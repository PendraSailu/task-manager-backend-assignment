from sqlalchemy.orm import Session
from app.models.task import Task

def create_task(db: Session, task_data, user_id: int):
    task = Task(**task_data.dict(), owner_id=user_id)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

def get_user_tasks(db: Session, user_id: int):
    return db.query(Task).filter(Task.owner_id == user_id).all()

def get_all_tasks(db: Session):
    return db.query(Task).all()
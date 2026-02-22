from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.task import TaskCreate
from app.services.task_service import create_task, get_user_tasks, get_all_tasks
from app.auth.dependencies import get_current_user, require_admin
from app.schemas.task import TaskUpdate
from app.models.task import Task
from fastapi import HTTPException
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from typing import List

router = APIRouter(prefix="/api/v1/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse)
def create(task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return create_task(db, task, user.id)

@router.get("/", response_model=List[TaskResponse])
def my_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return get_user_tasks(db, user.id)

@router.get("/all", response_model=List[TaskResponse])
def all_tasks(db: Session = Depends(get_db), admin=Depends(require_admin)):
    return get_all_tasks(db)


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    task.title = task_data.title
    task.description = task_data.description
    task.status = task_data.status

    db.commit()
    db.refresh(task)

    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.owner_id != user.id and user.role != "admin":
        raise HTTPException(status_code=403, detail="Not allowed")
    
    
    if task.status != "completed":
        raise HTTPException(
            status_code=400,
            detail="Task must be completed before deleting"
        )

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}
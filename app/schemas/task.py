from pydantic import BaseModel
from datetime import datetime
from app.schemas.user import UserResponse
from app.core.enums import TaskStatus
class TaskCreate(BaseModel):
    title: str
    description: str

class TaskUpdate(BaseModel):
    title: str
    description: str
    status: TaskStatus


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    owner: UserResponse 
    created_at: datetime

    class Config:
        from_attributes = True
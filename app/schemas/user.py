from pydantic import BaseModel
from pydantic import BaseModel, field_validator 


class UserCreate(BaseModel):
    username: str
    password: str

    @field_validator("password")
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True
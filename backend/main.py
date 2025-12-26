import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status, Request
from sqlmodel import SQLModel, Field, create_engine, Session, select
from typing import List, Optional, Annotated
from contextlib import asynccontextmanager
import os
from datetime import datetime

# Pydantic models
from pydantic import BaseModel

# Import authentication
from auth import get_current_user, create_access_token

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    title: str
    description: Optional[str] = None

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TaskResponse(TaskBase):
    id: int
    user_id: str
    completed: bool
    created_at: datetime
    updated_at: datetime

# SQLModel
class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

# FastAPI app
app = FastAPI(lifespan=lifespan)

# Dependency
def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

# Routes
@app.get("/")
def read_root():
    return {"message": "Todo API"}

@app.get("/api/{user_id}/tasks", response_model=List[TaskResponse])
def read_tasks(
    user_id: str,
    session: SessionDep,
    status_filter: Optional[str] = None,
    sort: Optional[str] = "created"
):
    query = select(Task).where(Task.user_id == user_id)

    if status_filter == "completed":
        query = query.where(Task.completed == True)
    elif status_filter == "pending":
        query = query.where(Task.completed == False)

    if sort == "title":
        query = query.order_by(Task.title)
    elif sort == "due_date":  # For now, same as created since we don't have due_date yet
        query = query.order_by(Task.created_at)
    else:  # Default or "created"
        query = query.order_by(Task.created_at.desc())

    tasks = session.exec(query).all()
    return tasks

@app.post("/api/{user_id}/tasks", response_model=TaskResponse)
def create_task(user_id: str, task: TaskCreate, session: SessionDep):
    if len(task.title) < 1 or len(task.title) > 200:
        raise HTTPException(status_code=422, detail="Title must be between 1 and 200 characters")

    if task.description and len(task.description) > 1000:
        raise HTTPException(status_code=422, detail="Description must be less than 1000 characters")

    db_task = Task(
        user_id=user_id,
        title=task.title,
        description=task.description,
        completed=False
    )
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@app.get("/api/{user_id}/tasks/{task_id}", response_model=TaskResponse)
def read_task(user_id: str, task_id: int, session: SessionDep):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.put("/api/{user_id}/tasks/{task_id}", response_model=TaskResponse)
def update_task(user_id: str, task_id: int, task: TaskUpdate, session: SessionDep):
    db_task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.title is not None:
        if len(task.title) < 1 or len(task.title) > 200:
            raise HTTPException(status_code=422, detail="Title must be between 1 and 200 characters")
        db_task.title = task.title

    if task.description is not None:
        if len(task.description) > 1000:
            raise HTTPException(status_code=422, detail="Description must be less than 1000 characters")
        db_task.description = task.description

    if task.completed is not None:
        db_task.completed = task.completed

    db_task.updated_at = datetime.utcnow()
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@app.delete("/api/{user_id}/tasks/{task_id}")
def delete_task(user_id: str, task_id: int, session: SessionDep):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}

@app.patch("/api/{user_id}/tasks/{task_id}/complete", response_model=TaskResponse)
def toggle_task_completion(user_id: str, task_id: int, session: SessionDep):
    task = session.exec(select(Task).where(Task.id == task_id, Task.user_id == user_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = not task.completed
    task.updated_at = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
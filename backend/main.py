from datetime import datetime
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, MetaData, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import sqlite3
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


# FastAPI app instance
app = FastAPI()

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
templates = Jinja2Templates(directory="templates")

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define database connection
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define SQLAlchemy base
Base = declarative_base()

# Pydantic model for the Blog Post
class Post(BaseModel):
    title: str
    content: str
    date: Optional[str] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    tag: Optional[str] = None
    like: Optional[int] = None
class Comment(BaseModel):
    post_id: int
    content: str
    date: Optional[str] = datetime
    
class Post(Base):
    __tablename__ = "Post"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    date = Column(String)
    tag = Column(String)
    like = Column(Integer)
    file_path = Column(String)
    comments = relationship("Comment", back_populates="Post")
    
class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("Post.id"))
    content = Column(String)
    date = Column(String)
    Post = relationship("Post", back_populates="comments")


# Create tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app

metadata = MetaData()

    
@app.post("/post/")
async def create_post(title: str = Form(...), content: str = Form(...), date: str = Form(...),
                     tag: str = Form(...), like: int = Form(...), file: UploadFile = File(...)):
    db = SessionLocal()
    contents = await file.read()
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(contents)
    post = Post(title=title, content=content, date=date, tag=tag, like=like, file_path=file.filename)
    db.add(post)
    db.commit()
    db.refresh(post)
    db.close()
    return post

@app.get("/post/{post_id}/")
def get_post(post_id: int):
    db = SessionLocal()
    post = db.query(Post).filter(Post.id == post_id).first()
    db.close()
    if post is None:
        raise HTTPException(status_code=404, detail="post not found")
    return post
@app.get("/getpost/")
def get_post():
    db = SessionLocal()
    post = db.query(Post).all()
    db.close()
    if post is None:
        raise HTTPException(status_code=404, detail="post not found")
    return post

@app.put("/likes/{post_id}")
async def update_post(post_id: int):
    db = SessionLocal()
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    post.like +=1
    db.commit()
    db.refresh(post)
    db.close()

    return post


@app.post("/posts/{post_id}/comments")
async def create_comment(post_id: int, content: str = Form(...), date: str = Form(...)):
    db = SessionLocal()
    post = db.query(Post).filter(Post.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    comment = Comment(post_id=post_id, content=content, date=date)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    db.close()

    return comment

@app.get("/posts/{post_id}/comments")
async def read_comments(post_id: int):
    db = SessionLocal()
    comments = db.query(Comment).filter(Comment.post_id == post_id).all()

    db.close()

    return comments


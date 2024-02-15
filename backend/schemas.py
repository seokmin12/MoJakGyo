from typing import List, Optional
from pydantic import BaseModel


class PostBase(BaseModel):
    filename: str
    image: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    writer_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    job: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    posts: List[Post] = []

    class Config:
        orm_mode = True

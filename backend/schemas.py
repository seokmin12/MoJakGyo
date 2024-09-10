from typing import List
from pydantic import BaseModel


class PostBase(BaseModel):
    filename: str
    image: str


class PostCreate(PostBase):
    liked_people: List[str] = []


class UserBase(BaseModel):
    name: str
    job: str


class UserCreate(UserBase):
    pass


class UserOut(BaseModel):
    id: int
    name: str
    job: str

    class Config:
        orm_mode = True


class Post(BaseModel):
    id: int
    filename: str
    image: str
    likes: int
    writer_id: int
    writer: UserOut

    class Config:
        orm_mode = True
from typing import List
from pydantic import BaseModel


class PostBase(BaseModel):
    id: int
    filename: str
    image: str


class PostCreate(PostBase):
    pass


class PostLikeOut(BaseModel):
    id: int
    is_liked: bool
    liked_len: int
    liked_people: List[int] = []

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    name: str
    job: str


class UserCreate(UserBase):
    pass


class UserOut(BaseModel):
    id: int
    name: str
    job: str
    follower: List[int] = []
    following: List[int] = []

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

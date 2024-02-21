from typing import List
from pydantic import BaseModel


class PostBase(BaseModel):
    filename: str
    image: str
    likes: int


class PostCreate(PostBase):
    pass


class UserOut(BaseModel):
    id: int
    name: str
    job: str

    class Config:
        orm_mode = True


class Post(PostBase):
    id: int
    writer_id: int
    writer: UserOut

    class Config:
        orm_mode = True


class PostOut(BaseModel):
    Post: Post


class UserBase(BaseModel):
    name: str
    job: str


class UserCreate(UserBase):
    pass


class User(UserOut):
    posts: List[Post]

    class Config:
        orm_mode = True

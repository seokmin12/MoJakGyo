from typing import List, Optional
from pydantic import BaseModel


class PostBase(BaseModel):
    filename: str
    image: str


class PostCreate(PostBase):
    writer_id: int
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


class UserOut(UserBase):
    id: int
    follower: List[int] = []
    following: List[int] = []

    class Config:
        orm_mode = True


class Post(PostBase):
    id: int
    likes: int
    writer_id: int
    writer: UserOut

    class Config:
        orm_mode = True


class MarketBase(BaseModel):
    name: str
    description: str
    image: str
    price: int


class Market(MarketBase):
    id: int
    seller_id: int

    class Config:
        orm_mode = True


class MarketOut(MarketBase):
    id: int
    seller: UserOut  # Nested seller information as UserOut
    buyer: Optional[UserOut] = None  # Optional nested buyer information as UserOut

    class Config:
        orm_mode = True


class MarketCreate(MarketBase):
    seller_id: int
    pass

from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class PostBase(BaseModel):
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
        from_attributes = True


class UserBase(BaseModel):
    name: str
    job: str


class UserCreate(UserBase):
    profile_img: str
    pass


class UserOut(UserBase):
    id: int
    follower: List[int] = []
    following: List[int] = []
    profile_img: str

    class Config:
        from_attributes = True


class Post(PostBase):
    id: int
    likes: int
    writer_id: int
    writer: UserOut

    class Config:
        from_attributes = True


class MarketBase(BaseModel):
    name: str
    description: str
    image: str
    price: int


class Market(MarketBase):
    id: int
    seller_id: int

    class Config:
        from_attributes = True


class MarketOut(MarketBase):
    id: int
    seller: UserOut  # Nested seller information as UserOut
    buyer: Optional[UserOut] = None  # Optional nested buyer information as UserOut

    class Config:
        from_attributes = True


class MarketCreate(BaseModel):
    name: str
    description: str
    price: int
    seller_id: int


class ChatMessageBase(BaseModel):
    content: str


class ChatMessageCreate(ChatMessageBase):
    sender_id: int
    room_id: int


class ChatMessage(ChatMessageBase):
    id: int
    timestamp: datetime
    sender: UserOut
    room_id: int

    class Config:
        from_attributes = True


class ChatRoomCreate(BaseModel):
    participant1_id: int
    participant2_id: int


class ChatRoom(BaseModel):
    id: int
    participant1_id: int
    participant2_id: int
    participant1: Optional[UserOut]
    participant2: Optional[UserOut]
    latest_message: Optional[ChatMessage] = None

    class Config:
        from_attributes = True


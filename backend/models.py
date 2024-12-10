from sqlalchemy import Column, ForeignKey, Integer, String, JSON, Table, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Posts(Base):
    __tablename__ = "Posts"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    image = Column(String, nullable=False)
    likes = Column(Integer, default=0, nullable=False)
    liked_people = Column(JSON, default=[])
    writer_id = Column(Integer, ForeignKey("User.id"), nullable=False)

    writer = relationship('User', back_populates='posts')


class Market(Base):
    __tablename__ = "Market"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    seller_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    seller = relationship('User', foreign_keys=[seller_id])
    buyer_id = Column(Integer, ForeignKey("User.id"), nullable=True)
    buyer = relationship('User', foreign_keys=[buyer_id])


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    job = Column(String, nullable=False)
    follower = Column(JSON, default=[])
    following = Column(JSON, default=[])
    # profile_img = Column(String, nullable=False)

    posts = relationship('Posts', back_populates='writer')


class ChatRoom(Base):
    __tablename__ = "ChatRoom"

    id = Column(Integer, primary_key=True, index=True)
    participant1_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    participant2_id = Column(Integer, ForeignKey("User.id"), nullable=False)

    participant1 = relationship('User', foreign_keys=[participant1_id])
    participant2 = relationship('User', foreign_keys=[participant2_id])
    messages = relationship('ChatMessage', back_populates='room')


class ChatMessage(Base):
    __tablename__ = "ChatMessage"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    sender_id = Column(Integer, ForeignKey("User.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("ChatRoom.id"), nullable=False)

    sender = relationship('User', foreign_keys=[sender_id])
    room = relationship('ChatRoom', back_populates='messages')

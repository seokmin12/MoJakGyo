from sqlalchemy import Column, ForeignKey, Integer, String, JSON
from sqlalchemy.orm import relationship
from database import Base


class Posts(Base):
    __tablename__ = "Posts"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    image = Column(String, nullable=False)
    likes = Column(Integer, default=0, nullable=False)
    liked_people = Column(JSON, default=[])
    writer_id = Column(Integer, ForeignKey("User.id"), nullable=False)

    writer = relationship('User', back_populates='posts')


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    job = Column(String, nullable=False)
    follower = Column(JSON, default=[])
    following = Column(JSON, default=[])

    posts = relationship('Posts', back_populates='writer')
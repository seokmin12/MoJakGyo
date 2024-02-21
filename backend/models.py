from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class Posts(Base):
    __tablename__ = "Posts"

    id = Column(Integer, primary_key=True, nullable=False)
    filename = Column(String, nullable=False)
    image = Column(String, nullable=False)
    likes = Column(Integer, default=0, nullable=False)
    writer_id = Column(Integer, ForeignKey("User.id"), nullable=False)

    writer = relationship('User')


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    job = Column(String, nullable=False)

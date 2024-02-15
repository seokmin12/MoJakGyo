from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BLOB
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    job = Column(String)

    posts = relationship("Posts", back_populates='writer')


class Posts(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True)
    filename = Column(String)
    image = Column(String)
    writer_id = Column(Integer, ForeignKey("users.id"))

    writer = relationship("User", back_populates='posts')
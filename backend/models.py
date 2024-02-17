from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BLOB
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    job = Column(String)

    posts = relationship("Posts")


class Posts(Base):
    __tablename__ = "Posts"

    id = Column(Integer, primary_key=True)
    filename = Column(String)
    image = Column(String)
    likes = Column(Integer, default=0)
    writer_id = Column(Integer, ForeignKey("User.id"))

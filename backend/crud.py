from sqlalchemy.orm import Session
import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, job=user.job)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Posts).all()


def get_posts_for_user(db: Session, writer_id: int):
    return db.query(models.Posts).filter(models.Posts.writer_id == writer_id).all()


def create_post(db: Session, post: schemas.PostCreate, writer_id: int):
    db_item = models.Posts(**post.dict(), writer_id=writer_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

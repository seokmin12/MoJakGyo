from sqlalchemy.orm import Session
import models
import schemas


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
    return db.query(models.Posts).offset(skip).limit(limit).all()


def get_posts_for_user(db: Session, writer_id: int):
    return db.query(models.Posts).filter(models.Posts.writer_id == writer_id).all()


def create_post(db: Session, post: schemas.PostCreate, writer_id: int):
    db_post = models.Posts(**post.dict(), writer_id=writer_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


def update_likes(db: Session, post_id: int, is_liked: int):
    db_post = db.query(models.Posts).filter(models.Posts.id == post_id).first()
    if not db_post:
        raise ValueError("Post not found")

    if is_liked == 0 and db_post.likes > 0:
        db_post.likes -= 1
    elif is_liked == 1:
        db_post.likes += 1

    db.commit()
    db.refresh(db_post)
    return db_post.likes
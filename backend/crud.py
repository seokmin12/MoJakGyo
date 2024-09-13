from sqlalchemy.orm import Session
import models
import schemas
import json


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


def update_likes(db: Session, post_id: int, user_id: int, is_liked: bool):
    db_post = db.query(models.Posts).filter(models.Posts.id == post_id).first()
    if not db_post:
        raise ValueError("Post not found")

    liked_people = db_post.liked_people if isinstance(db_post.liked_people, list) else []

    if is_liked:
        if user_id not in liked_people:
            liked_people.append(user_id)
            db_post.likes += 1
    else:
        if user_id in liked_people:
            liked_people.remove(user_id)
            db_post.likes = max(0, db_post.likes - 1)

    # Update the liked_people column with the modified list
    db.query(models.Posts).filter(models.Posts.id == post_id).update(
        {models.Posts.liked_people: liked_people}
    )
    db.commit()
    db.refresh(db_post)

    return db_post.likes


def get_likes(db: Session, post_id: int, user_id: int):
    db_post = db.query(models.Posts).filter(models.Posts.id == post_id).first()
    if not db_post:
        raise ValueError("Post not found")

    liked_people = db_post.liked_people
    is_liked: bool

    if user_id in liked_people:
        is_liked = True
    else:
        is_liked = False

    liked_len = len(liked_people)
    return {
        "id": db_post.id,
        "is_liked": is_liked,
        "liked_len": liked_len,
        "liked_people": liked_people
    }


def get_market(db: Session):
    return db.query(models.Market).all()

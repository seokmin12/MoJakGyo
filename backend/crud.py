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


def create_post(db: Session, writer_id: int, filename: str, image: str):
    db_post = models.Posts(filename=filename, image=image, writer_id=writer_id)
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


def create_market(db: Session, name: str, description: str, price: int, seller_id: int, image: str):
    db_market = models.Market(name=name, description=description, price=price, seller_id=seller_id, image=image)
    db.add(db_market)
    db.commit()
    db.refresh(db_market)
    return db_market


def create_chat_room(db: Session, chat_room: schemas.ChatRoomCreate):
    db_chat_room = models.ChatRoom(**chat_room.dict())
    db.add(db_chat_room)
    db.commit()
    db.refresh(db_chat_room)
    return db_chat_room


def get_chat_rooms(db: Session):
    chat_rooms = db.query(models.ChatRoom).all()

    rooms = []
    for room in chat_rooms:
        latest_messaege = db.query(models.ChatMessage).filter(
            models.ChatMessage.room_id == room.id
        ).order_by(
            models.ChatMessage.timestamp.desc()
        ).first()
        room.latest_message = latest_messaege
        rooms.append(room)

    return rooms


def get_chat_rooms_for_user(db: Session, user_id: int):
    chat_rooms = db.query(models.ChatRoom).filter(
        (models.ChatRoom.participant1_id == user_id) |
        (models.ChatRoom.participant2_id == user_id)
    )

    rooms = []
    for room in chat_rooms:
        latest_messaege = db.query(models.ChatMessage).filter(
            models.ChatMessage.room_id == room.id
        ).order_by(
            models.ChatMessage.timestamp.desc()
        ).first()
        room.latest_message = latest_messaege
        rooms.append(room)

    return rooms


def create_message(db: Session, message: schemas.ChatMessageCreate):
    db_message = models.ChatMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def get_messages_for_room(db: Session, room_id: int, skip: int = 0, limit: int = 50):
    return db.query(models.ChatMessage)\
        .filter(models.ChatMessage.room_id == room_id)\
        .order_by(models.ChatMessage.timestamp.desc())\
        .offset(skip)\
        .limit(limit)\
        .all()

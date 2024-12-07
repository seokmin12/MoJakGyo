from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, models, schemas
from database import SessionLocal, engine
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.UserOut])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{writer_id}/posts/", response_model=schemas.Post)
def create_post_for_user(writer_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)):
    return crud.create_post(db=db, post=post, writer_id=writer_id)


@app.get("/users/{writer_id}/posts/", response_model=List[schemas.Post])
def read_post_for_user(writer_id: int, db: Session = Depends(get_db)):
    return crud.get_posts_for_user(db=db, writer_id=writer_id)


@app.get("/posts/", response_model=List[schemas.Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts


@app.patch("/posts/{post_id}/likes/{user_id}/{is_liked}/", response_model=int)
def update_post_likes(post_id: int, user_id: int, is_liked: bool, db: Session = Depends(get_db)):
    try:
        return crud.update_likes(db=db, post_id=post_id, user_id=user_id, is_liked=is_liked)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@app.get("/posts/{post_id}/likes/{user_id}", response_model=schemas.PostLikeOut)
def get_post_likes(post_id: int, user_id: int, db: Session = Depends(get_db)):
    try:
        liked = crud.get_likes(db=db, post_id=post_id, user_id=user_id)
        return liked  # Wrap the result in a list to match the response_model
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@app.get("/market/", response_model=List[schemas.MarketOut])
def get_market(db: Session = Depends(get_db)):
    market = crud.get_market(db=db)
    return market


@app.post('/market/', response_model=schemas.Market)
def create_market(market: schemas.MarketCreate, db: Session = Depends(get_db)):
    return crud.create_market(db=db, market=market)


@app.post("/chat/rooms/", response_model=schemas.ChatRoom)
def create_chat_room(chat_room: schemas.ChatRoomCreate, db: Session = Depends(get_db)):
    return crud.create_chat_room(db=db, chat_room=chat_room)


@app.get("/chat/room", response_model=List[schemas.ChatRoom])
def get_chat_rooms(db: Session = Depends(get_db)):
    return crud.get_chat_rooms(db=db)

@app.get("/chat/rooms/{user_id}", response_model=List[schemas.ChatRoom])
def get_user_chat_rooms(user_id: int, db: Session = Depends(get_db)):
    return crud.get_chat_rooms_for_user(db=db, user_id=user_id)


@app.post("/chat/messages/", response_model=schemas.ChatMessage)
def create_chat_message(message: schemas.ChatMessageCreate, db: Session = Depends(get_db)):
    return crud.create_message(db=db, message=message)


@app.get("/chat/rooms/{room_id}/messages/", response_model=List[schemas.ChatMessage])
def get_room_messages(
    room_id: int, 
    skip: int = 0, 
    limit: int = 50, 
    db: Session = Depends(get_db)
):
    return crud.get_messages_for_room(db=db, room_id=room_id, skip=skip, limit=limit)


from fastapi import APIRouter, Depends
from database.db_operations import add_item, delete_item, get_all_items, update_item
from database.db import get_db
from models import Item
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter()

@router.get("/")
async def get_items(db: AsyncSession = Depends(get_db)):
    items = await get_all_items(db)
    return items

@router.post("/")
async def add(item: Item, db: AsyncSession  = Depends(get_db)):
    item = await add_item(item,db)
    return item

@router.patch("/{item_id}")
async def update(item_id: int, edited_item: Item, db: AsyncSession  = Depends(get_db)):
    result = await update_item(item_id, edited_item, db)
    return result

@router.delete("/{item_id}")
async def delete(item_id: int, db: AsyncSession  = Depends(get_db)):
    result = await delete_item(item_id, db)
    return result
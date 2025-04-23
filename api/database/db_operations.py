from fastapi import Depends, HTTPException
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from models import Item, ItemModel


async def get_all_items(db: AsyncSession):
    result = await db.execute(select(ItemModel))
    items = result.scalars().all()
    return items

async def add_item(item: Item, db: AsyncSession):
    item_to_add = ItemModel(
        name=item.name, 
        description=item.description,
        quantity=item.quantity,
        purchased=item.purchased
    )
    db.add(item_to_add)
    await db.flush()
    await db.refresh(item_to_add)
    await db.commit()
    return item_to_add

async def update_item(item_id: int, edited_item: Item, db: AsyncSession):
    values_to_update = edited_item.model_dump(exclude_unset=True)
    if not values_to_update:
        raise HTTPException(status_code=400, detail="No fields to update")

    stmt = (
        update(ItemModel)
        .where(ItemModel.id == item_id)
        .values(**values_to_update)
        .execution_options(synchronize_session="fetch")
    )
    await db.execute(stmt)
    await db.commit()

    return {"success": True}

async def delete_item(item_id: int, db: AsyncSession):
    #we get the item by its id
    result = await db.execute(select(ItemModel).where(ItemModel.id == item_id))
    item = result.scalar_one_or_none()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    await db.delete(item)
    await db.commit()

    return { "message": "Deleted successfully." }
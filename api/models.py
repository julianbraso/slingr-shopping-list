from typing import Optional
from database.db import Base
from sqlalchemy import Column, Integer, String, Boolean
from pydantic import BaseModel

class ItemModel(Base):
    __tablename__ = "items"

    id = Column(Integer,primary_key=True,autoincrement=True,index=True)
    name = Column(String,nullable=False)
    description = Column(String,nullable=False)
    quantity = Column(Integer,primary_key=True,nullable=False)
    purchased = Column(Boolean, server_default='FALSE')

# pydantics class, needed for fastapi
class Item(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[int] = None
    purchased: Optional[bool] = None
import os
from typing import AsyncGenerator
from sqlalchemy import create_engine, select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

connection_url = os.getenv('DATABASE_URL')

engine = create_async_engine(
    connection_url,
    pool_pre_ping=True
)

SessionLocal = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine, class_=AsyncSession)

Base = declarative_base()


async def get_db():
    async with SessionLocal() as db:
        yield db

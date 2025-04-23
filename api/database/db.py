import os
from typing import AsyncGenerator
from sqlalchemy import create_engine, select
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

connection_url = os.getenv('DATABASE_URL')

IS_PRODUCTION = os.getenv("ENV") != "dev"

engine = create_async_engine(
    connection_url,
    connect_args={"statement_cache_size": 0} if IS_PRODUCTION else {}
)

SessionLocal = async_sessionmaker(
    autocommit=False, expire_on_commit=False, bind=engine, class_=AsyncSession)

Base = declarative_base()


async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        await db.close()

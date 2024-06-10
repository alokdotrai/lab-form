from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(512), nullable=False)
    type = Column(String(128), nullable=False)
    size = Column(Integer, nullable=False)
    location = Column(String(2048), nullable=False)
    created = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated = Column(DateTime(timezone=True), nullable=False, onupdate=func.now())
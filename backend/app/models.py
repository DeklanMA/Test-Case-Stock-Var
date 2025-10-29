from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class Stock(Base):
    __tablename__ = "stocks"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(10), index=True)
    date = Column(Date)
    price = Column(Float)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    volume = Column(Float)

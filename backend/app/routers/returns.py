from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Stock
from ..utils.var_calculator import calculate_returns
import pandas as pd

router = APIRouter(prefix="/api/returns", tags=["Returns"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{symbol}")
def get_returns(symbol: str, db: Session = Depends(get_db)):
    stocks = db.query(Stock).filter(Stock.symbol == symbol.upper()).all()
    if not stocks:
        raise HTTPException(status_code=404, detail="Symbol not found")

    df = pd.DataFrame([s.__dict__ for s in stocks])
    df = calculate_returns(df)
    return df[["date", "return"]].to_dict(orient="records")

from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Stock
from ..utils.var_calculator import calculate_returns, historical_var, parametric_var
import pandas as pd

router = APIRouter(prefix="/api/var", tags=["VaR"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{symbol}")
def get_var(symbol: str, level: int = Query(95), db: Session = Depends(get_db)):
    stocks = db.query(Stock).filter(Stock.symbol == symbol.upper()).all()
    if not stocks:
        raise HTTPException(status_code=404, detail="Symbol not found")

    df = pd.DataFrame([s.__dict__ for s in stocks])
    df = calculate_returns(df)
    returns = df["return"]

    hist_var = historical_var(returns, level)
    para_var = parametric_var(returns, level)

    return {
        "symbol": symbol.upper(),
        "confidence_level": f"{level}%",
        "historical_VaR": round(hist_var, 5),
        "parametric_VaR": round(para_var, 5)
    }

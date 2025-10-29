from fastapi import FastAPI
from .routers import returns, var
from .database import Base, engine, SessionLocal
from .models import Stock
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)
print("✅ Tables checked or created.")



app = FastAPI(title="Stock VaR API")

app.include_router(returns.router)
app.include_router(var.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    if db.query(Stock).count() == 0:
        file_path = os.path.join(os.path.dirname(__file__), "data", "Python_Full_Stack_2025_Test.xlsx")
        for sheet in ["AAPL", "GOOGL"]:
            df = pd.read_excel(file_path, sheet_name=sheet)
            df.columns = df.columns.str.lower()
            df["symbol"] = sheet
            df["vol."] = df["vol."].str.replace("M", "").astype(float)
            df.rename(columns={"vol.": "volume"}, inplace=True)
            df.to_sql("stocks", engine, if_exists="append", index=False)
        print("✅ Initial stock data imported.")
    db.close()

@app.get("/")
def root():
    return {"message": "Welcome to the Stock VaR API"}

# 📊 Stock Value at Risk (VaR) Analysis App

A simple web-based application for analyzing **stock risk** using **Value at Risk (VaR)** methods — both **Historical** and **Parametric**.

This app provides:

1. 📈 Line chart of stock historical returns
2. 📊 Table of Historical & Parametric VaR results
3. 🧾 Automatic text description of risk analysis

Built with:

* **Frontend:** React.js + TypeScript + Recharts
* **Backend:** FastAPI + NumPy + Pandas + SciPy
* **Containerization:** Docker Compose

---

## 🚀 Quick Start (Docker Compose)

You can run the entire application (frontend + backend) instantly using **Docker Compose**.

### 🧩 Prerequisites

* Docker & Docker Compose installed
  👉 [Download Docker Desktop](https://www.docker.com/products/docker-desktop)

---

### ⚙️ Step 1: Clone Repository

```bash
git clone https://github.com/DeklanMA/Test-Case-Stock-Var.git
cd Test-Case-Stock-Var
```

---

### ⚙️ Step 2: Run with Docker Compose

```bash
docker compose up --build
```

This command will:

* Build both the **frontend (React.js)** and **backend (FastAPI)** images
* Start the containers
* Automatically link them via Docker network

---

### 🌐 Step 3: Open in Browser

| Service               | URL                                                      |
| --------------------- | -------------------------------------------------------- |
| Frontend (React.js)   | [http://localhost:3000](http://localhost:3000)           |
| Backend API (FastAPI) | [http://localhost:8000/docs](http://localhost:8000/docs) |

---

## 📦 Project Structure

```
📦 stock-var-app
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/...
└── backend/
    ├── Dockerfile
    ├── main.py
    ├── requirements.txt
    └── ...
```

---

## 🐳 Docker Configuration

### **docker-compose.yml**

```yaml
version: "3.9"
services:
  frontend:
    container_name: var-frontend
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:8000
    depends_on:
      - backend
    restart: always

  backend:
    container_name: var-backend
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    restart: always
```

---

## 🧠 Example Backend (FastAPI)

`backend/main.py`

```python
from fastapi import FastAPI
import numpy as np, pandas as pd, scipy.stats

app = FastAPI()

@app.get("/returns")
def get_returns(symbol: str = "AAPL"):
    np.random.seed(42)
    dates = pd.date_range(end=pd.Timestamp.today(), periods=100)
    returns = np.random.normal(0.001, 0.02, 100)
    return [{"date": str(d.date()), "return": float(r)} for d, r in zip(dates, returns)]

@app.get("/var")
def get_var(symbol: str = "AAPL", level: int = 95):
    np.random.seed(42)
    returns = np.random.normal(0.001, 0.02, 250)
    hist_var = np.percentile(returns, (100 - level))
    para_var = np.mean(returns) - np.std(returns) * scipy.stats.norm.ppf(level / 100)
    return {
        "symbol": symbol,
        "confidence_level": f"{level}%",
        "historical_VaR": float(hist_var),
        "parametric_VaR": float(para_var)
    }
```

---

## 🖥️ Frontend Preview

When you open `http://localhost:3000`, the app shows:

✅ **Line chart** of daily returns
✅ **VaR table** (Historical & Parametric)
✅ **Text analysis** describing risk

Example output:

```
📈 Daily Returns (Chart)
📊 Value at Risk Table
🧾 Analysis:
Pada tingkat kepercayaan 95%, Historical VaR sebesar -2.35% dan Parametric VaR sebesar -2.10%.
Ini menunjukkan bahwa potensi kerugian maksimum saham AAPL dalam satu hari perdagangan
diperkirakan tidak akan melebihi 2.35% dari nilai investasinya.
```

---

## 🧩 Environment Variables

| Variable       | Description                  | Default               |
| -------------- | ---------------------------- | --------------------- |
| `VITE_API_URL` | Backend URL for API requests | `http://backend:8000` |

---

## 🧱 Stopping the Containers

To stop all running containers:

```bash
docker compose down
```

---

## 🧑‍💻 Author

**Deklan Malik Akbar**
Full-Stack Developer & IoT Engineer
Institut Teknologi Nasional Bandung (ITENAS)
🔗 [LinkedIn](https://linkedin.com/in/deklanmalikakbar) • [GitHub](https://github.com/DeklanMA)

---

## 📜 License

MIT License © 2025 Deklan Malik Akbar

---

# 📊 Stock Value at Risk (VaR) Analysis App

This project is a simple **Stock Analysis Web App** that visualizes **historical returns** and calculates **Value at Risk (VaR)** using both **Historical** and **Parametric** methods.

Built with **Next.js + TypeScript + Recharts**, the app allows users to:
1. View a **line chart** of stock historical returns  
2. Display a **table** of Historical & Parametric VaR  
3. Read a **textual analysis** describing the risk results  

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 14 (React + TypeScript) |
| UI | Tailwind CSS + DaisyUI |
| Charting | Recharts |
| Backend API | (Optional) FastAPI / Flask (for VaR calculations) |

---

## 🧩 Folder Structure

```

📦 stock-var-app
├── src/
│   ├── app/
│   │   └── page.tsx          # Main Home Page
│   ├── components/
│   │   ├── Chart.tsx         # Line chart of stock returns
│   │   ├── VarCard.tsx       # VaR results table
│   │   └── VarAnalysis.tsx   # Text description of analysis
│   ├── lib/
│   │   └── api.ts            # Fetch helpers (getReturns, getVaR)
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
└── README.md

````

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
````

### 2️⃣ Install Dependencies

Make sure you have Node.js ≥ 18.

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

App will be available at **[http://localhost:3000](http://localhost:3000)**

---

## 🔗 API Integration

This app assumes you have two backend endpoints available:

| Endpoint                    | Method | Description                                     |
| --------------------------- | ------ | ----------------------------------------------- |
| `/returns?symbol=AAPL`      | GET    | Returns historical stock returns (date, return) |
| `/var?symbol=AAPL&level=95` | GET    | Returns calculated Historical & Parametric VaR  |

Example API response for `/var`:

```json
{
  "symbol": "AAPL",
  "confidence_level": "95%",
  "historical_VaR": -0.0235,
  "parametric_VaR": -0.0210
}
```

---

## 💻 Frontend Overview

### **Home Page (src/app/page.tsx)**

* Select stock symbol and confidence level
* Fetches returns and VaR data from API
* Renders chart, VaR table, and analysis text

### **Chart Component**

Displays daily stock returns as a smooth line chart:

```tsx
<Chart data={returns} />
```

### **VarCard Component**

Shows VaR results in tabular form:

```tsx
<VarCard data={varData} />
```

### **VarAnalysis Component**

Generates automatic text description:

```tsx
<VarAnalysis data={varData} />
```

---

## 🧠 Example Analysis Output

> Pada tingkat kepercayaan 95%, Historical VaR sebesar -2.35% dan Parametric VaR sebesar -2.10%.
> Ini menunjukkan bahwa potensi kerugian maksimum saham AAPL dalam satu hari perdagangan diperkirakan tidak akan melebihi 2.35% dari nilai investasinya.
> Perbedaan kedua metode terjadi karena asumsi distribusi data return yang berbeda.

---

## 🧮 Optional: Run Local API (FastAPI Example)

If you want to serve your own VaR calculation backend:

```bash
pip install fastapi uvicorn numpy pandas scipy
```

Then create `main.py`:

```python
from fastapi import FastAPI
import pandas as pd, numpy as np, scipy.stats

app = FastAPI()

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

Run it:

```bash
uvicorn main:app --reload
```

---

## 🧩 Features Summary

✅ Line chart of historical returns
✅ VaR table (Historical & Parametric)
✅ Auto-generated risk analysis text
✅ Clean responsive UI with Tailwind + DaisyUI
✅ Modular codebase (easy to extend for more models)

---

## 🪄 Future Improvements

* [ ] Add 99% VaR comparison chart
* [ ] Include Monte Carlo simulation
* [ ] Allow CSV upload for custom stock data
* [ ] Export report as PDF

---

## 🧑‍💻 Author

**Deklan Malik Akbar**
Full-Stack Developer & IoT Engineer
Institut Teknologi Nasional Bandung (ITENAS)
🔗 [LinkedIn](https://linkedin.com/in/deklanmalikakbar) • [GitHub](https://github.com/DeklanMA)

---

## 📜 License

MIT License © 2025 Deklan Malik Akbar

```

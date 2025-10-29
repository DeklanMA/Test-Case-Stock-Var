import numpy as np
import pandas as pd
from scipy.stats import norm

def calculate_returns(df):
    df = df.sort_values("date")
    df["return"] = df["price"].pct_change()
    return df.dropna()

def historical_var(returns, level):
    return np.percentile(returns, 100 - level)

def parametric_var(returns, level):
    mean = np.mean(returns)
    std = np.std(returns)
    z = norm.ppf(1 - level/100)
    return mean + z * std

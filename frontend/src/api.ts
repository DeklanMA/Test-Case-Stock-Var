import axios from "axios";

export const API_URL = "http://localhost:8000/api";

export const getReturns = async (symbol: string) => {
  const res = await axios.get(`${API_URL}/returns/${symbol}`);
  return res.data;
};

export const getVaR = async (symbol: string, level: number) => {
  const res = await axios.get(`${API_URL}/var/${symbol}?level=${level}`);
  return res.data;
};

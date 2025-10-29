import { useEffect, useState } from "react";
import { getReturns, getVaR } from "../api";
import Chart from "../components/Chart";
import VarCard from "../components/VarCard";
import VarAnalysis from "../components/VarAnalysis";

export default function Home() {
  const [symbol, setSymbol] = useState("AAPL");
  const [level, setLevel] = useState(95);
  const [returns, setReturns] = useState<any[]>([]);
  const [varData, setVarData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const ret = await getReturns(symbol);
    const v = await getVaR(symbol, level);
    setReturns(ret);
    setVarData(v);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [symbol, level]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <select
          className="select select-bordered w-40"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="AAPL">AAPL</option>
          <option value="GOOGL">GOOGL</option>
        </select>

        <select
          className="select select-bordered w-40"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        >
          <option value={95}>95%</option>
          <option value={99}>99%</option>
        </select>

        <button className="btn btn-primary" onClick={loadData}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        <>
          <Chart data={returns} />
         {varData && (
        <>
            <VarCard data={varData} />
            <VarAnalysis data={varData} /> 
        </>
        )}
        </>
      )}
    </div>
  );
}

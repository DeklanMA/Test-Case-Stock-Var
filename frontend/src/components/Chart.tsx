import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { date: string; return: number }[];
}

export default function Chart({ data }: ChartProps) {
  if (!data.length)
    return <div className="text-center text-gray-500">No data available</div>;

  return (
    <div className="card bg-base-100 shadow-md mt-4 p-4">
      <h2 className="font-bold text-lg mb-3">📈 Daily Returns</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => `${(v * 100).toFixed(2)}%`} />
          <Tooltip
            formatter={(v: number) => `${(v * 100).toFixed(2)}%`}
            labelFormatter={(d) => `Date: ${d}`}
            contentStyle={{
            backgroundColor: "#ffffff",   // putih biar kontras
            border: "1px solid #ccc",
            borderRadius: "8px",
            color: "#000000",             // teks hitam biar jelas
            fontSize: "13px"
        }}
          />
          <Line type="monotone" dataKey="return" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

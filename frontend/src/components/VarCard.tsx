interface VarCardProps {
  data: {
    symbol: string;
    confidence_level: string;
    historical_VaR: number;
    parametric_VaR: number;
  };
}

export default function VarCard({ data }: VarCardProps) {
  return (
    <div className="card bg-base-100 shadow-md mt-6 p-4">
      <h2 className="font-bold text-lg mb-3">📊 Value at Risk (VaR)</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Method</th>
              <th>Confidence</th>
              <th>VaR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Historical</td>
              <td>{data.confidence_level}</td>
              <td className="text-error font-semibold">
                {(data.historical_VaR * 100).toFixed(3)}%
              </td>
            </tr>
            <tr>
              <td>Parametric</td>
              <td>{data.confidence_level}</td>
              <td className="text-error font-semibold">
                {(data.parametric_VaR * 100).toFixed(3)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

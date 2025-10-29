interface VarAnalysisProps {
  data: {
    symbol: string;
    confidence_level: string;
    historical_VaR: number;
    parametric_VaR: number;
  };
}

export default function VarAnalysis({ data }: VarAnalysisProps) {
  const hist = (data.historical_VaR * 100).toFixed(2);
  const para = (data.parametric_VaR * 100).toFixed(2);
  const conf = data.confidence_level;

  const text = `
Pada tingkat kepercayaan ${conf}, Historical VaR sebesar ${hist}% dan Parametric VaR sebesar ${para}%.
Hal ini menunjukkan bahwa potensi kerugian maksimum portofolio/saham ${data.symbol}
dalam satu periode perdagangan diperkirakan tidak akan melebihi ${hist}% dari nilai investasinya.
Perbedaan kecil antara kedua metode disebabkan oleh asumsi distribusi return — 
Parametric menggunakan distribusi normal, sementara Historical menggunakan data empiris aktual.
`;

  return (
    <div className="card bg-base-100 shadow-md mt-4 p-4 whitespace-pre-line">
      <h2 className="font-bold text-lg mb-2">🧾 Analysis</h2>
      <p className="text-gray-400 leading-relaxed">{text}</p>
    </div>
  );
}

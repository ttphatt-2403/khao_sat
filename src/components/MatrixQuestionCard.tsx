import { MatrixQuestion } from "../types";
import { MediaRenderer } from "./MediaRenderer";

interface Props {
  question: MatrixQuestion;
  values: Record<string, string>; // e.g. { "b1_1": "5", "b1_2": "3" }
  errors: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const MatrixQuestionCard = ({ question, values, errors, onChange }: Props) => {
  const scaleArray = Array.from({ length: question.scaleEnd - question.scaleStart + 1 }, (_, i) => question.scaleStart + i);

  return (
    <div id={`question-${question.id}`} className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,54,155,0.1)] border border-white overflow-hidden transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,54,155,0.15)]">
      {/* Header - Vibrant Blue */}
      <div className="px-5 py-5 bg-gradient-to-r from-[#00369b] to-[#0050d0] text-white">
        <div className="flex items-start gap-3">
          {question.number && (
            <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-white text-[#00369b] text-sm font-bold flex items-center justify-center shadow-sm">
              {question.number}
            </span>
          )}
          <div>
            <h3 className="font-bold text-[15px] sm:text-base leading-snug">
              {question.text}
            </h3>
            {question.description && (
              <p className="text-blue-100 text-[13px] sm:text-sm mt-1.5 leading-relaxed whitespace-pre-wrap">
                {question.description}
              </p>
            )}</div>
        </div>
      </div>

      {/* Images */}
      <MediaRenderer images={question.images} />

      {/* Matrix Table */}
      <div className="overflow-x-auto custom-scrollbar pb-2">
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead className="bg-[#00369b]/5 text-[#00369b] font-bold border-b border-[#00369b]/10">
            <tr>
              <th className="px-5 py-3 w-1/2">Phát biểu</th>
              {scaleArray.map((num) => (
                <th key={num} className="px-2 py-3 text-center">{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.rows.map((row, idx) => {
              const rowKey = `${question.id}_${row.id}`;
              const error = errors[rowKey];
              const isEven = idx % 2 === 0;

              return (
                <tr key={row.id} className={`border-b border-slate-100 last:border-none transition-colors ${isEven ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 ${error ? 'bg-red-50/50' : ''}`}>
                  <td className="px-5 py-4 text-slate-700 leading-relaxed font-medium">
                    {row.label}
                    {error && <p className="text-[11px] text-red-500 mt-1 font-normal">⚠ {error}</p>}
                  </td>
                  {scaleArray.map((num) => {
                    const isSelected = values[rowKey] === String(num);
                    return (
                    <td key={num} className="px-2 py-4 text-center">
                      <label className="cursor-pointer w-full h-full flex items-center justify-center relative group">
                        <input
                          type="radio"
                          name={rowKey}
                          value={String(num)}
                          checked={isSelected}
                          onChange={() => onChange(rowKey, String(num))}
                          className="w-5 h-5 accent-[#ff914d] cursor-pointer"
                        />
                        {/* Custom hover effect */}
                        <div className={`absolute inset-0 rounded-full opacity-0 pointer-events-none scale-150 transition-all duration-300 ${isSelected ? 'bg-[#ff914d]/20 opacity-100 scale-[1.7]' : 'bg-[#00369b]/10 group-hover:opacity-100'}`} />
                      </label>
                    </td>
                  )})}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

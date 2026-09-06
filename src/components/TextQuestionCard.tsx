import { TextQuestion } from "../types";
import { MediaRenderer } from "./MediaRenderer";

interface Props {
  question: TextQuestion;
  value: string;
  error?: string;
  onChange: (key: string, val: string) => void;
}

export const TextQuestionCard = ({ question, value, error, onChange }: Props) => {
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

      {/* Input Area */}
      <div className="p-5">
        <textarea
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder || "Nhập câu trả lời của bạn..."}
          className={`w-full min-h-[120px] p-4 text-sm border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ff914d]/20 focus:border-[#ff914d] resize-y transition-all duration-300 shadow-inner bg-slate-50 hover:bg-white hover:border-[#00369b]/30 ${error ? 'border-red-400 bg-red-50' : 'border-[#e8eef8]'}`}
        />
        {error && (
          <p className="text-xs mt-2 flex items-center gap-1 text-[#e53e3e]">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    </div>
  );
};

import { CheckboxQuestion } from "../types";
import { MediaRenderer } from "./MediaRenderer";

interface Props {
  question: CheckboxQuestion;
  value: string[];
  customValue?: string;
  error?: string;
  customError?: string;
  onChange: (key: string, val: string[]) => void;
  onCustomChange: (val: string) => void;
}

export const CheckboxQuestionCard = ({ question, value = [], customValue, error, customError, onChange, onCustomChange }: Props) => {
  const handleCheckboxChange = (optionValue: string, checked: boolean) => {
    let newValue = [...value];
    if (checked) {
      if (!newValue.includes(optionValue)) {
        newValue.push(optionValue);
      }
    } else {
      newValue = newValue.filter((v) => v !== optionValue);
    }
    onChange(question.id, newValue);
  };

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
            )}
            {question.maxSelect && (
              <span className="inline-block mt-2 px-2.5 py-1 bg-white/20 rounded text-xs font-semibold">
                Chọn tối đa {question.maxSelect} đáp án
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      <MediaRenderer images={question.images} />

      {/* Options */}
      <div className="p-5 space-y-3">
        {question.options.map((option) => {
          const isSelected = value.includes(option.value);
          const isDisabled = !isSelected && question.maxSelect && value.length >= question.maxSelect;

          return (
          <div key={option.value} className="flex flex-col gap-2">
            <label className={`radio-option flex items-start cursor-pointer group p-3 rounded-xl border-2 transition-all duration-300 ${isSelected ? 'border-[#00369b] bg-[#00369b]/5 shadow-sm' : isDisabled ? 'opacity-50 cursor-not-allowed border-transparent' : 'border-transparent hover:bg-slate-50 hover:border-[#e2e8f0]'}`}>
              <input
                type="checkbox"
                name={question.id}
                value={option.value}
                checked={isSelected}
                disabled={isDisabled as boolean}
                onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                className="mt-0.5 accent-[#00369b] w-5 h-5 rounded"
              />
              <span className={`radio-label text-sm leading-snug ml-3 transition-colors ${isSelected ? 'text-[#00369b] font-bold' : 'text-slate-700 group-hover:text-[#ff914d]'}`}>
                {option.label}
              </span>
            </label>
            
            {/* Custom Input Field for "Khác" */}
            {option.allowCustom && isSelected && (
              <div className="ml-8 mt-1 animate-fade-in">
                <input
                  type="text"
                  placeholder="Vui lòng nhập rõ..."
                  value={customValue || ""}
                  onChange={(e) => onCustomChange(e.target.value)}
                  className={`w-full px-4 py-2.5 text-sm border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ff914d]/20 focus:border-[#ff914d] transition-all duration-300 ${customError ? 'border-red-400 bg-red-50' : 'border-[#e8eef8] bg-slate-50 hover:border-[#00369b]/30 hover:bg-white'}`}
                />
                {customError && <p className="text-xs text-red-500 mt-1 font-medium">{customError}</p>}
              </div>
            )}
          </div>
        )})}

        {error && (
          <p className="text-xs mt-2 flex items-center gap-1 text-[#e53e3e]">
            <span>⚠</span> {error}
          </p>
        )}
      </div>
    </div>
  );
};

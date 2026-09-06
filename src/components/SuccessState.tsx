interface SuccessStateProps {
  onReset: () => void;
}

export const SuccessState = ({ onReset }: SuccessStateProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-10 text-center border-t-4 border-[#00369b]">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl bg-[#e8eef8]">
        ✓
      </div>
      <h2 className="text-xl font-bold mb-2 text-[#00369b]">
        Cảm ơn bạn đã tham gia!
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Phản hồi của bạn đã được ghi nhận thành công.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-[#e8eef8] text-[#00369b] hover:bg-[#d1deef]"
      >
        Điền lại khảo sát
      </button>
    </div>
  );
};

import { SubmitStatus } from "../types";

interface SubmitButtonProps {
  status: SubmitStatus;
}

export const SubmitButton = ({ status }: SubmitButtonProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-5">
      <p className="text-xs text-slate-400 mb-4 text-center">
        Dữ liệu được thu thập hoàn toàn ẩn danh và chỉ dùng cho mục đích nghiên cứu.
      </p>

      {status === "error" && (
        <div className="text-xs text-center mb-3 px-3 py-2 rounded-lg bg-[#fff0f0] text-[#c53030]">
          Có lỗi xảy ra khi gửi. Vui lòng thử lại.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 rounded-xl font-bold text-sm sm:text-base text-white transition-all duration-300 relative overflow-hidden group border border-white/20"
        style={{
          background: status === "sending"
            ? "#7a9fd4"
            : "linear-gradient(135deg, #00369b 0%, #0050d0 100%)",
          boxShadow: status === "sending"
            ? "none"
            : "0 8px 24px rgba(0,54,155,0.3)",
          cursor: status === "sending" ? "not-allowed" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (status !== "sending") {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, #ff914d 0%, #e87a38 100%)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 30px rgba(255,145,77,0.45)";
          }
        }}
        onMouseLeave={(e) => {
          if (status !== "sending") {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, #00369b 0%, #0050d0 100%)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 8px 24px rgba(0,54,155,0.3)";
          }
        }}
      >
        {status === "sending" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Đang gửi...
          </span>
        ) : (
          "Gửi khảo sát →"
        )}
      </button>
    </div>
  );
};

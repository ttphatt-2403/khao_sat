interface SuccessStateProps {
  onReset: () => void;
}

export const SuccessState = ({ onReset }: SuccessStateProps) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center justify-center px-4 py-10 mt-10">
      
      {/* Main Card */}
      <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,54,155,0.06)] p-10 md:p-14 text-center relative z-10 w-full">
        
        {/* Icon Cluster */}
        <div className="flex justify-center items-center gap-4 mb-8">
          {/* Left dashes */}
          <div className="flex flex-col gap-2.5 items-end">
            <div className="w-4 h-1 bg-[#059669] rounded-full rotate-[-30deg] translate-x-1"></div>
            <div className="w-5 h-1 bg-[#059669] rounded-full"></div>
            <div className="w-4 h-1 bg-[#059669] rounded-full rotate-[30deg] translate-x-1"></div>
          </div>
          
          {/* Check circle */}
          <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          
          {/* Right dashes */}
          <div className="flex flex-col gap-2.5 items-start">
            <div className="w-4 h-1 bg-[#059669] rounded-full rotate-[30deg] -translate-x-1"></div>
            <div className="w-5 h-1 bg-[#059669] rounded-full"></div>
            <div className="w-4 h-1 bg-[#059669] rounded-full rotate-[-30deg] -translate-x-1"></div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-[28px] font-bold mb-6 text-[#004de6] font-['Space_Grotesk'] tracking-tight">
          YAY! Bạn hoàn thành rồi! 🎉💙
        </h2>
        
        {/* Text body */}
        <div className="text-slate-500 mb-10 max-w-[500px] mx-auto space-y-5 leading-relaxed text-[15px]">
          <p>Cảm ơn bạn rất nhiều vì đã dành thời gian chia sẻ những suy nghĩ, trải nghiệm và thói quen của mình cùng Mơ Nì.</p>
          <p>Mỗi câu trả lời của bạn đều là một mảnh ghép nhỏ giúp tụi mình hiểu hơn về Gen Z và hoàn thiện đồ án tốt nghiệp này.</p>
          <p className="font-bold text-[#004de6] pt-2 text-base">Cảm ơn bạn đã giúp Mơ Nì đi thêm một bước trên hành trình này nhé! ♡</p>
        </div>
        
        {/* Button */}
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-full text-[15px] font-bold transition-all duration-300 bg-[#004de6] text-white hover:bg-[#00369b] hover:shadow-lg flex items-center gap-2 mx-auto group"
        >
          Đi đến lại khảo sát 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      {/* Footer Text directly below the card */}
      <p className="text-[#a0b3cc] text-xs mt-6 z-10 font-medium">
        © 2026 • Khảo sát được bảo mật bởi HTT79
      </p>

      {/* Floating Paper Airplane & Trail */}
      <div className="absolute -bottom-10 -right-4 md:-right-20 md:-bottom-10 w-64 h-64 pointer-events-none opacity-80 z-0 hidden sm:block">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Dashed Trail */}
          <path 
            d="M 20 180 C 40 180, 50 150, 70 150 C 90 150, 70 190, 50 170 C 30 150, 110 90, 150 70" 
            fill="none" 
            stroke="#60a5fa" 
            strokeWidth="1.5" 
            strokeDasharray="4 4" 
          />
          {/* Paper Airplane */}
          <path 
            d="M 140 85 L 180 50 L 145 95 L 185 105 L 140 85 Z" 
            fill="#60a5fa" 
          />
          <path 
            d="M 140 85 L 180 50 L 120 60 L 140 85 Z" 
            fill="#3b82f6" 
          />
        </svg>
      </div>

    </div>
  );
};

export const Header = () => {
  return (
    <div className="bg-gradient-to-br from-[#00369b] to-[#001e57] text-white rounded-3xl shadow-[0_8px_30px_rgba(0,54,155,0.2)] p-8 text-center relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#ff914d] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
          Khảo sát Người Dùng
          <span className="block mt-2 text-[#ff914d] text-xl sm:text-2xl font-bold">Nghiên cứu về Trào phúng Thị giác</span>
        </h1>
        <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
          Cảm ơn bạn đã dành thời gian tham gia. Ý kiến của bạn rất quan trọng để giúp chúng tôi hoàn thiện nghiên cứu này.
        </p>
      </div>
    </div>
  );
};

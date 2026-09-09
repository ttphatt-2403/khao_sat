import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

interface Props {
  onLoginSuccess: (email: string, name: string) => void;
}

const CONFIRM_PHRASE = "Tôi đồng ý tham gia khảo sát và cho phép sử dụng dữ liệu khảo sát cho mục đích nghiên cứu trong thời gian 04 tháng.";

export const LoginScreen = ({ onLoginSuccess }: Props) => {
  const [consentInput, setConsentInput] = useState("");
  const [copied, setCopied] = useState(false);
  const isConfirmed = consentInput.trim() === CONFIRM_PHRASE;

  const handleCopy = () => {
    navigator.clipboard.writeText(CONFIRM_PHRASE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <div className="min-h-screen font-['Be_Vietnam_Pro'] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden" style={{background: 'linear-gradient(160deg, #fff8f4 0%, #f4f0fb 40%, #eef4ff 100%)'}}>
      
      {/* Background Sparkles (Decorative) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Orange sparkles - top left area */}
        <svg className="absolute top-[8%] left-[8%] w-7 h-7 opacity-25" viewBox="0 0 24 24" fill="#ff914d">
          <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
        </svg>
        <svg className="absolute top-[35%] left-[4%] w-4 h-4 opacity-20" viewBox="0 0 24 24" fill="#ff914d">
          <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
        </svg>
        {/* Blue sparkles - right area */}
        <svg className="absolute top-[15%] right-[10%] w-5 h-5 opacity-20" viewBox="0 0 24 24" fill="#00369b">
          <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
        </svg>
        <svg className="absolute top-[55%] right-[6%] w-7 h-7 opacity-15" viewBox="0 0 24 24" fill="#00369b">
          <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
        </svg>
        {/* Soft blobs for warmth */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30" style={{background: 'radial-gradient(circle, #ff914d22 0%, transparent 70%)'}}></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full opacity-40" style={{background: 'radial-gradient(circle, #00369b18 0%, transparent 70%)'}}></div>
      </div>

      {/* Main Container - Seamless on mobile, Card on desktop */}
      <div className="max-w-[420px] w-full md:bg-white/90 md:backdrop-blur-sm md:rounded-[28px] md:shadow-[0_12px_40px_rgba(0,54,155,0.08)] px-2 py-6 md:p-10 text-center relative z-10 animate-[fadeInUp_0.8s_ease-out]">
        
        {/* Decorative Faint Icon (Moved to bottom right, visible on mobile background) */}
        <div className="absolute -bottom-10 -right-10 md:-right-6 md:-top-6 md:bottom-auto text-[150px] md:text-[100px] opacity-5 pointer-events-none select-none grayscale rotate-12 z-0">
          🎯
        </div>

        <div className="relative z-10">
          
          {/* Top Emojis */}
          <div className="flex items-center justify-center gap-2 mb-4 text-4xl">
            <span className="drop-shadow-sm hover:scale-110 transition-transform cursor-default">🌷</span>
            <span className="drop-shadow-sm hover:scale-110 transition-transform cursor-default">🎯</span>
          </div>
          
          {/* Title */}
          <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-[#00369b] mb-6 tracking-tight">
            Mơ Nì xin chào bạn!
          </h1>
          
          {/* Text Content */}
          <div className="text-slate-700 text-[14px] leading-[1.65] space-y-5 text-left mb-8">
            <p>
              Tụi mình đang thực hiện một khảo sát nhỏ trong khuôn khổ đồ án tốt nghiệp, để tìm hiểu thêm về cách Gen Z sử dụng và trải nghiệm dịch vụ <strong>Mua trước - Trả sau (BNPL)</strong>, cũng như thói quen tiếp nhận các nội dung truyền thông và cảm nhận của bạn về những hình thức truyền thông mang màu sắc trào phúng, hài hước.
            </p>
            <p>
              Trong khảo sát sẽ có một vài câu hỏi về thói quen mua sắm, trải nghiệm với BNPL, cách bạn tiếp nhận media và cảm nhận của bạn đối với một số cách thể hiện nội dung truyền thông.
            </p>
            
            {/* Time Pill */}
            <div className="font-medium py-2.5 px-4 rounded-xl flex items-center gap-2 w-max text-[13.5px] border" style={{background: 'linear-gradient(135deg, #fff4ee, #ffeee4)', color: '#d4520a', borderColor: '#ffd4b8'}}>
              <span className="text-base">⏱️</span> Thời gian thực hiện: khoảng 5 - 7 phút
            </div>
            
            <p>
              Không có câu trả lời đúng hay sai, nên bạn cứ thoải mái chia sẻ dựa trên suy nghĩ, trải nghiệm và thói quen thật của mình nhé.
            </p>
            <p>
              Mọi thông tin bạn chia sẻ chỉ được sử dụng cho mục đích nghiên cứu và thực hiện đồ án, đồng thời sẽ được bảo mật và không sử dụng cho mục đích thương mại.
            </p>
            
            {/* Outro text */}
            <div className="text-center pt-4 pb-2">
              <p className="font-semibold text-[#00369b]">Cảm ơn bạn đã ghé qua và dành một chút thời gian giúp đỡ Mơ Nì 🌷</p>
              <p className="text-[12px] text-slate-500 mt-1.5">Mỗi câu trả lời của bạn đều là một mảnh ghép nhỏ giúp tụi mình hoàn thiện đồ án này tốt hơn đó! 💙✨</p>
            </div>
          </div>

          {/* Consent Section */}
          <div className="mt-6 text-left">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-gradient-to-r from-[#ff914d]/30 to-transparent"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff914d]">XÁC NHẬN THAM GIA</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#00369b]/20 to-transparent"></div>
            </div>

            {/* Consent Text Box */}
            <div className="bg-[#f8faff] border border-[#dce7f8] rounded-xl p-4 text-[13px] text-slate-600 leading-relaxed mb-4 space-y-3">
              <p className="font-semibold text-slate-700">XÁC NHẬN THAM GIA KHẢO SÁT</p>
              <p>Trước khi bắt đầu khảo sát, vui lòng đọc kỹ thông tin dưới đây:</p>
              <p>Tôi xác nhận rằng tôi đã đọc và hiểu thông tin giới thiệu về khảo sát. Tôi tự nguyện tham gia khảo sát và đồng ý cung cấp các câu trả lời của mình cho nhóm thực hiện để phục vụ mục đích nghiên cứu và thực hiện đồ án tốt nghiệp.</p>
              <p>Tôi đồng ý cho nhóm thực hiện thu thập, sử dụng và xử lý các dữ liệu được cung cấp trong khảo sát trong phạm vi mục đích nghiên cứu đã nêu. Các dữ liệu khảo sát sẽ được bảo mật, không sử dụng cho mục đích thương mại và chỉ phục vụ cho quá trình nghiên cứu, thực hiện và hoàn thiện đồ án trong thời gian <strong>04 tháng</strong>.</p>
              <p>Sau thời hạn 04 tháng, dữ liệu khảo sát sẽ được xóa bỏ và không tiếp tục được sử dụng cho mục đích của khảo sát hoặc đồ án.</p>
            </div>

            {/* Copyable Phrase */}
            <p className="text-[12px] text-slate-500 mb-2">Vui lòng nhập chính xác câu sau để tiếp tục khảo sát:</p>
            <div
              className="bg-[#eef4ff] border border-[#c8daff] rounded-xl p-3 flex items-start gap-2 mb-3 cursor-pointer group hover:bg-[#e4edff] transition-colors"
              onClick={handleCopy}
              title="Nhấn để sao chép"
            >
              <p className="text-[13px] text-[#00369b] font-medium leading-relaxed flex-1 select-all italic">
                “{CONFIRM_PHRASE}”
              </p>
              <button className="shrink-0 mt-0.5 text-[#00369b] opacity-60 group-hover:opacity-100 transition-opacity">
                {copied ? (
                  <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                )}
              </button>
            </div>
            {copied && <p className="text-[11px] text-emerald-600 font-medium mb-2 text-center">✓ Đã sao chép!</p>}

            {/* Input box */}
            <textarea
              rows={3}
              className={`w-full text-[13px] p-3 rounded-xl border resize-none outline-none transition-all leading-relaxed ${
                consentInput.length === 0
                  ? 'border-slate-200 bg-white focus:border-[#00369b]/40'
                  : isConfirmed
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                  : 'border-red-300 bg-red-50 text-red-700'
              }`}
              placeholder="Dán hoặc gõ câu xác nhận vào đây..."
              value={consentInput}
              onChange={(e) => setConsentInput(e.target.value)}
            />
            {consentInput.length > 0 && !isConfirmed && (
              <p className="text-[11px] text-red-500 mt-1.5">⚠️ Nội dung chưa chính xác, vui lòng kiểm tra lại.</p>
            )}
            {isConfirmed && (
              <p className="text-[11px] text-emerald-600 mt-1.5 font-medium">✅ Xác nhận thành công! Bây giờ bạn có thể đăng nhập bê dưới nhé.</p>
            )}
          </div>

          {/* Login Section */}
          <div className="pt-6 mt-2 relative z-10">
            <div className={`flex flex-col items-center justify-center bg-white/80 rounded-2xl p-5 border transition-all ${
              isConfirmed
                ? 'shadow-[0_4px_24px_rgba(0,54,155,0.10)] border-[#c8daff]'
                : 'shadow-none border-slate-200 opacity-50 pointer-events-none'
            }`}>
              <p className="text-[11px] text-slate-500 mb-4 font-semibold uppercase tracking-widest">Bắt đầu khảo sát bằng cách</p>
              <div className="w-full flex justify-center hover:scale-[1.02] transition-transform">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                      const decoded: any = jwtDecode(credentialResponse.credential);
                      onLoginSuccess(decoded.email, decoded.name);
                    }
                  }}
                  onError={() => {
                    console.log('Login Failed');
                    alert("Đăng nhập thất bại. Vui lòng thử lại!");
                  }}
                  useOneTap
                  theme="filled_blue"
                  text="continue_with"
                  shape="rectangular"
                  width="280"
                />
              </div>
            </div>
            <p className="text-[11px] mt-5 font-medium text-center" style={{color: '#b0bdd4'}}>
              🔒 Thông tin của bạn sẽ được bảo mật tuyệt đối.
            </p>
          </div>
          
        </div>
      </div>
      
      {/* Inline styles for custom animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

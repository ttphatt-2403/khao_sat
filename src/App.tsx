import { getVisibleQuestions, useSurveyForm } from "./hooks/useSurveyForm";
import { Header } from "./components/Header";
import { QuestionRenderer } from "./components/QuestionRenderer";
import { SuccessState } from "./components/SuccessState";
import { SubmitButton } from "./components/SubmitButton";
import { Footer } from "./components/Footer";
import { questions, sections } from "./data/questions";

export default function App() {
  const {
    formData,
    status,
    errors,
    currentStep,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
    handleReset,
  } = useSurveyForm();

  const currentSection = sections[currentStep];
  const activeQuestions = getVisibleQuestions(currentSection, formData);
  const progressPercentage = ((currentStep + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen lg:h-screen relative bg-[#eef2f6] flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Vibrant Animated Background Elements (Only in Right Panel area conceptually, but we can keep them global or move them) */}
      <div className="fixed top-[-20%] left-[20%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#ff914d]/40 to-[#ff5e00]/20 blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-tl from-[#00369b]/40 to-[#001e57]/20 blur-[120px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

      {/* LEFT PANEL - Sticky Poster (WOW Edition) */}
      <div className="lg:w-[35%] xl:w-[30%] bg-[#001438] text-white lg:h-screen lg:flex-shrink-0 flex flex-col justify-center relative overflow-hidden lg:shadow-[10px_0_50px_rgba(0,20,56,0.5)] z-0 lg:z-20 border-r border-white/10 group pt-8 pb-12 lg:pb-0 lg:pt-0">

        {/* Dynamic Animated Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#001438] via-[#002b7f] to-[#0050d0] opacity-90 z-0"></div>
        <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00c6ff]/40 via-[#00369b]/10 to-transparent blur-3xl pointer-events-none animate-[spin_15s_linear_infinite] origin-center z-0"></div>
        <div className="absolute bottom-[-20%] right-[-30%] w-[150%] h-[80%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ff914d]/40 via-[#e87a38]/10 to-transparent blur-3xl pointer-events-none animate-[spin_20s_linear_infinite_reverse] origin-center z-0"></div>

        {/* Giant Watermark Typography */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[20%] -rotate-90 text-[100px] lg:text-[180px] font-black tracking-tighter text-white/[0.03] select-none pointer-events-none z-0 mix-blend-overlay whitespace-nowrap">
          SATIRE
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00c6ff]/40 text-[#00c6ff] text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,198,255,0.15)]">
              <span>✧</span> DESIGN SURVEY
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold mb-4 tracking-tight leading-tight">
              Chiến dịch truyền thông nâng cao nhận thức về{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] via-[#ff5e00] to-[#ff914d] animate-pulse">
                quyết định chi tiêu có cân nhắc khi sử dụng dịch vụ Mua trước - Trả sau (BNPL) trong Gen Z tại Thành phố Hồ Chí Minh
              </span>
            </h1>
            <div className="flex items-start gap-4 mt-6 mb-10">
              <div className="w-8 h-[2px] bg-blue-300 mt-2.5 flex-shrink-0"></div>
              <p className="text-sm lg:text-base text-blue-100/90 leading-relaxed font-light">
                Kết hợp nghệ thuật trào phúng thị giác, giúp Gen Z dễ tiếp cận và ghi nhớ thông điệp hơn.
              </p>
            </div>
          </div>

          {/* Floating Glassmorphism Art Gallery (Horizontal Layout) */}
          <div className="relative h-28 sm:h-40 lg:h-48 w-full mt-4 flex justify-center items-end gap-1 sm:gap-4 lg:gap-6 z-10 pb-4 lg:pb-0">
            {/* Decorative doodles */}
            <div className="absolute -left-4 top-0 text-[#00c6ff]/60 text-2xl animate-pulse">//</div>
            <div className="absolute right-0 top-10 text-[#00c6ff]/60 text-xl animate-bounce">✧</div>
            <div className="absolute -right-4 bottom-10 text-[#00c6ff]/60 text-2xl transform rotate-45">♡</div>

            <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 p-1.5 bg-[#0047AB]/40 backdrop-blur-md rounded-2xl border-2 border-[#00c6ff]/30 shadow-xl transform -rotate-6 hover:-rotate-12 transition-all duration-500 z-10">
              <img src="/images/a1_img1.png" className="w-full h-full object-cover rounded-xl" alt="Art 1" />
            </div>

            <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 shadow-xl transform rotate-2 hover:-rotate-2 transition-all duration-500 z-20 -mt-4 sm:-mt-6">
              <img src="/images/a1_img2.png" className="w-full h-full object-cover rounded-xl" alt="Art 2" />
            </div>

            <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/30 shadow-xl transform rotate-6 hover:rotate-12 transition-all duration-500 z-10">
              <img src="/images/a1_img3.png" className="w-full h-full object-cover rounded-xl" alt="Art 3" />
            </div>
          </div>
        </div>

        {/* Mobile Curved Bottom Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 lg:hidden pointer-events-none translate-y-[1px]">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[60px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C79.4,115.65,158.4,112.56,231.5,91.4,262.13,82.52,291.82,70.92,321.39,56.44Z" className="fill-[#eef2f6]"></path>
          </svg>
        </div>
      </div>

      {/* RIGHT PANEL - Scrolling Form */}
      <div className="lg:w-[65%] xl:w-[70%] p-4 py-8 lg:p-12 w-full relative z-10 lg:h-screen lg:overflow-y-auto custom-scrollbar -mt-8 sm:-mt-12 lg:mt-0">
        <div className="max-w-3xl mx-auto space-y-6">

          {status === "success" ? (
            <SuccessState onReset={handleReset} />
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (currentStep === sections.length - 1) handleSubmit(e); }} noValidate className="space-y-6">

              {/* Progress Bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-5">
                <div className="flex justify-between text-sm font-bold text-[#00369b] mb-3">
                  <span>{currentSection.title}</span>
                  <span className="bg-[#ff914d]/10 text-[#ff914d] px-3 py-1 rounded-full text-xs">Bước {currentStep + 1} / {sections.length}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00369b] to-[#ff914d] h-3 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,145,77,0.5)]"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Render Questions for Current Step */}
              <div className="space-y-6 animate-fade-in">
                {activeQuestions.map((question) => (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              {currentStep < sections.length - 1 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-5 flex gap-4 items-center justify-between">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={status === "sending"}
                      className="flex-1 py-3.5 rounded-full font-bold text-sm sm:text-base transition-all duration-300 bg-white border-2 border-[#e8eef8] text-[#00369b] hover:border-[#ff914d] hover:text-[#ff914d] hover:bg-[#ff914d]/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Quay lại
                    </button>
                  ) : (
                    <div className="hidden sm:flex flex-1 items-center gap-2 text-[#00369b] font-medium animate-pulse">
                      <svg className="w-6 h-6 text-[#ff914d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm italic">Cùng tìm hiểu nhé!</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 py-3.5 rounded-full font-bold text-sm sm:text-base text-white transition-all duration-300 shadow-[0_4px_16px_rgba(0,54,155,0.35)] hover:shadow-[0_4px_20px_rgba(255,145,77,0.45)] bg-gradient-to-r from-[#00369b] to-[#0050d0] hover:from-[#ff914d] hover:to-[#e87a38]"
                  >
                    Tiếp tục →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={status === "sending"}
                      className="flex-1 py-3.5 bg-white rounded-full shadow-sm border-2 border-[#e8eef8] font-bold text-sm sm:text-base transition-all duration-300 text-[#00369b] hover:border-[#ff914d] hover:text-[#ff914d] hover:bg-[#ff914d]/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Quay lại
                    </button>
                  </div>
                  <SubmitButton status={status} />
                </div>
              )}

            </form>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}

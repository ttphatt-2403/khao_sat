import { useSurveyForm } from "./hooks/useSurveyForm";
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
  const activeQuestions = questions.filter(q => currentSection.questionIds.includes(q.id));
  const progressPercentage = ((currentStep + 1) / sections.length) * 100;

  return (
    <div className="min-h-screen lg:h-screen relative bg-[#eef2f6] flex flex-col lg:flex-row lg:overflow-hidden">
      {/* Vibrant Animated Background Elements (Only in Right Panel area conceptually, but we can keep them global or move them) */}
      <div className="fixed top-[-20%] left-[20%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-[#ff914d]/40 to-[#ff5e00]/20 blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full bg-gradient-to-tl from-[#00369b]/40 to-[#001e57]/20 blur-[120px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

      {/* LEFT PANEL - Sticky Poster (WOW Edition) */}
      <div className="lg:w-[35%] xl:w-[30%] bg-[#001438] text-white lg:h-screen lg:flex-shrink-0 flex flex-col justify-center relative overflow-hidden shadow-[10px_0_50px_rgba(0,20,56,0.5)] z-20 border-r border-white/10 group">
        
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
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00c6ff] text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,198,255,0.3)]">
              Design Survey
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
              Nghiên cứu
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff914d] via-[#ff5e00] to-[#ff914d] animate-pulse">
                Trào phúng <br/>Thị giác
              </span>
            </h1>
            <p className="text-base lg:text-lg text-blue-100/80 mb-10 leading-relaxed font-light">
              Khám phá ranh giới giữa nghệ thuật và sự châm biếm qua lăng kính của người dùng.
            </p>
          </div>

          {/* Floating Glassmorphism Art Gallery */}
          <div className="relative h-48 sm:h-56 lg:h-72 w-full mt-8 lg:mt-10 perspective-1000">
            <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 p-1.5 lg:p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-12 group-hover:-rotate-6 transition-transform duration-700 ease-out z-10 animate-[bounce_4s_infinite_alternate]">
              <img src="/images/a1_img1.png" className="w-full h-full object-cover rounded-xl" alt="Art 1" />
            </div>
            
            <div className="absolute top-6 left-[25%] sm:top-8 sm:left-[30%] w-28 h-28 sm:w-40 sm:h-40 lg:w-48 lg:h-48 p-1.5 lg:p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform rotate-6 group-hover:rotate-12 transition-transform duration-700 ease-out z-30 delay-100 animate-[bounce_5s_infinite_alternate]">
              <img src="/images/a1_img2.png" className="w-full h-full object-cover rounded-xl border border-white/10" alt="Art 2" />
            </div>
            
            <div className="absolute top-16 right-0 sm:top-20 w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 p-1.5 lg:p-2 bg-[#ff914d]/10 backdrop-blur-xl rounded-2xl border border-[#ff914d]/40 shadow-[0_20px_50px_rgba(255,145,77,0.3)] transform rotate-12 group-hover:rotate-6 transition-transform duration-700 ease-out z-20 delay-200 animate-[bounce_6s_infinite_alternate]">
              <img src="/images/a1_img3.png" className="w-full h-full object-cover rounded-xl" alt="Art 3" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Scrolling Form */}
      <div className="lg:w-[65%] xl:w-[70%] p-4 py-8 lg:p-12 w-full relative z-10 lg:h-screen lg:overflow-y-auto custom-scrollbar">
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
              <div className="bg-white rounded-2xl shadow-sm border border-[#e2e8f0] p-5 flex gap-4">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={status === "sending"}
                    className="flex-1 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 bg-white border-2 border-[#e8eef8] text-[#00369b] hover:border-[#ff914d] hover:text-[#ff914d] hover:bg-[#ff914d]/5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Quay lại
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white transition-all duration-300 shadow-[0_4px_16px_rgba(0,54,155,0.35)] hover:shadow-[0_4px_20px_rgba(255,145,77,0.45)] bg-gradient-to-r from-[#00369b] to-[#0050d0] hover:from-[#ff914d] hover:to-[#e87a38]"
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
                    className="flex-1 py-3.5 bg-white rounded-2xl shadow-sm border-2 border-[#e8eef8] font-bold text-sm sm:text-base transition-all duration-300 text-[#00369b] hover:border-[#ff914d] hover:text-[#ff914d] hover:bg-[#ff914d]/5 disabled:opacity-50 disabled:cursor-not-allowed"
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

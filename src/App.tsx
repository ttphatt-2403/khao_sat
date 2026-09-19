import { useState, useEffect } from "react";
import SurveyPage from "./pages/SurveyPage";
import { Dashboard } from "./pages/Dashboard";

// Đổi thành `false` nếu muốn mở lại form nha anh!
const IS_CLOSED = true;

const ClosedState = () => (
  <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
      <span className="text-4xl">🔒</span>
    </div>
    <h1 className="text-[#00369b] font-bold text-3xl font-['Space_Grotesk'] mb-3">Khảo sát đã đóng</h1>
    <p className="text-slate-600 max-w-md text-lg">
      Cảm ơn bạn đã quan tâm! Hiện tại form khảo sát này đã ngừng nhận câu trả lời mới.
    </p>
  </div>
);

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Dashboard vẫn truy cập được bình thường dù form đóng hay mở
  if (hash === "#/mo-ni-dashboard-123") {
    return <Dashboard />;
  }

  if (IS_CLOSED) {
    return <ClosedState />;
  }

  return <SurveyPage />;
}

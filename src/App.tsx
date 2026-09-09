import { BrowserRouter, Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/mo-ni-dashboard-123" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

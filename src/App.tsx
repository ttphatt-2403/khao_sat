import { HashRouter, Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path="/mo-ni-dashboard-123" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

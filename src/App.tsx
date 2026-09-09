import { useState, useEffect } from "react";
import SurveyPage from "./pages/SurveyPage";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#/mo-ni-dashboard-123") {
    return <Dashboard />;
  }

  return <SurveyPage />;
}

import { useState, useEffect, useCallback } from "react";
import { FormData, SubmitStatus } from "../types";
import { questions, sections } from "../data/questions";

export const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwEh6sdjZDxPjmPu8Qg1zvo7Bodi6HNU7IGQjUxM2Ml2dG8LhxrsNJAqigyPMdIORFceQ/exec";

const getInitialState = (): FormData => {
  try {
    const saved = localStorage.getItem('survey_formData');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to parse saved form data", e);
  }

  const initial: FormData = {};
  questions.forEach((q) => {
    if (q.type === 'info') return;
    
    if (q.type === 'matrix') {
      q.rows.forEach(row => {
        initial[`${q.id}_${row.id}`] = "";
      });
    } else if (q.type === 'checkbox') {
      initial[q.id] = [];
      if (q.options.some(o => o.allowCustom)) {
        initial[`${q.id}_custom`] = "";
      }
    } else {
      initial[q.id] = "";
      if (q.type === 'radio' && q.options.some(o => o.allowCustom)) {
        initial[`${q.id}_custom`] = "";
      }
      if (q.type === 'text' && (q as any).requireConfirm) {
        initial[`${q.id}_confirmed`] = "false";
      }
    }
  });
  return initial;
};

export const getVisibleQuestions = (section: any, formData: FormData) => {
  const currentQuestions = questions.filter(q => section.questionIds.includes(q.id));
  const visible = [];
  
  for (const q of currentQuestions) {
    if ((q as any).dependencies) {
      const depsMet = ((q as any).dependencies as string[]).every(dep => !!formData[dep]);
      if (!depsMet) {
        break;
      }
    }

    visible.push(q);
    
    if ((q as any).requireConfirm) {
      if (formData[`${q.id}_confirmed`] !== 'true') {
        break;
      }
    }
  }
  return visible;
};

export const useSurveyForm = (userEmail: string | null) => {
  const [formData, setFormData] = useState<FormData>(getInitialState());
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const savedStep = localStorage.getItem('survey_currentStep');
  const [currentStep, setCurrentStep] = useState(savedStep ? parseInt(savedStep, 10) : 0);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('survey_formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('survey_currentStep', currentStep.toString());
  }, [currentStep]);

  const handleChange = useCallback((key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    const currentSection = sections[stepIndex];
    const currentQuestions = getVisibleQuestions(currentSection, formData);
    
    currentQuestions.forEach((q) => {
      if (q.type === 'info') return;

      if (q.type === 'matrix') {
        q.rows.forEach(row => {
          const key = `${q.id}_${row.id}`;
          if (!formData[key]) {
            newErrors[key] = "Vui lòng chọn một đánh giá.";
          }
        });
      } else if (q.type === 'checkbox') {
        const val = formData[q.id];
        if (!val || (Array.isArray(val) && val.length === 0)) {
          newErrors[q.id] = "Vui lòng chọn ít nhất một đáp án.";
        } else if (q.maxSelect && Array.isArray(val) && val.length > q.maxSelect) {
          newErrors[q.id] = `Vui lòng chọn tối đa ${q.maxSelect} đáp án.`;
        } else if (Array.isArray(val) && val.includes('other') && !formData[`${q.id}_custom`]) {
          newErrors[`${q.id}_custom`] = "Vui lòng nhập nội dung khác.";
        }
      } else {
        if (!formData[q.id]) {
          newErrors[q.id] = "Vui lòng hoàn thành câu hỏi này.";
        } else if (q.type === 'text' && (q as any).requireConfirm && formData[`${q.id}_confirmed`] !== 'true') {
          newErrors[q.id] = "Vui lòng bấm Xác nhận câu trả lời trước khi tiếp tục.";
        }
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const errorKey = Object.keys(newErrors)[0];
      const q = currentQuestions.find(q => errorKey === q.id || errorKey.startsWith(`${q.id}_`));
      
      if (q) {
        // Use setTimeout to ensure DOM has updated with error borders if needed
        setTimeout(() => {
          const element = document.getElementById(`question-${q.id}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 50);
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = async () => {
    if (validateStep(currentStep)) {
      if (currentStep === 0 && formData["scr_3"] === "never") {
        await submitForm();
        return;
      }
      setCurrentStep(prev => Math.min(prev + 1, sections.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitForm = async () => {
    setStatus("sending");

    const params = new URLSearchParams();
    
    if (userEmail) {
      params.append("email", userEmail);
    }
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key.endsWith('_custom')) return; 
      
      const q = questions.find(q => q.id === key);
      
      if (q && q.type === 'checkbox') {
        if (Array.isArray(value)) {
          const labels = value.map(v => {
            if (v === 'other') return formData[`${key}_custom`] || "Khác";
            const opt = q.options.find(o => o.value === v);
            return opt ? opt.label : v;
          });
          params.append(key, labels.join(', '));
        } else {
          params.append(key, String(value));
        }
      } else if (q && q.type === 'radio' && value === 'other') {
        params.append(key, String(formData[`${key}_custom`] || "Khác"));
      } else if (q && q.type === 'radio') {
         const selectedOption = q.options.find(o => o.value === value);
         params.append(key, selectedOption ? selectedOption.label : String(value));
      } else {
        params.append(key, String(value));
      }
    });

    try {
      // Google Apps Script redirects, so we follow with cors mode
      // URLSearchParams ensures Content-Type: application/x-www-form-urlencoded (simple request)
      await fetch(WEBHOOK_URL, {
        method: "POST",
        body: params,
        mode: "no-cors",
        redirect: "follow",
      });
      if (userEmail) {
        localStorage.setItem(`survey_completed_${userEmail}`, 'true');
      }
      setStatus("success");
    } catch (err) {
      console.error("Submit error:", err);
      // Fallback: try GET method with params in URL (always works across environments)
      try {
        const url = `${WEBHOOK_URL}?${params.toString()}&_method=POST`;
        await fetch(url, { mode: "no-cors" });
        if (userEmail) {
          localStorage.setItem(`survey_completed_${userEmail}`, 'true');
        }
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    await submitForm();
  };

  const handleReset = () => {
    localStorage.removeItem('survey_formData');
    localStorage.removeItem('survey_currentStep');
    const initial: Record<string, string | string[]> = {};
    questions.forEach((q) => {
      if (q.type === 'info') return;
      if (q.type === 'matrix') {
        q.rows.forEach(row => { initial[`${q.id}_${row.id}`] = ""; });
      } else if (q.type === 'checkbox') {
        initial[q.id] = [];
        if (q.options.some(o => o.allowCustom)) initial[`${q.id}_custom`] = "";
      } else {
        initial[q.id] = "";
        if (q.type === 'radio' && q.options.some(o => o.allowCustom)) initial[`${q.id}_custom`] = "";
        if (q.type === 'text' && (q as any).requireConfirm) initial[`${q.id}_confirmed`] = "false";
      }
    });
    setFormData(initial as FormData);
    setStatus("idle");
    setErrors({});
    setCurrentStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    formData,
    status,
    errors,
    currentStep,
    handleChange,
    nextStep,
    prevStep,
    handleSubmit,
    handleReset,
  };
};

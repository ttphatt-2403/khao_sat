import { useState } from "react";
import { FormData, SubmitStatus } from "../types";
import { questions, sections } from "../data/questions";

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxOoHJXeLeeprlppr9CzD1-bkz5E1WuyEi4ydZGJcETcfH1ttlyRbAD36blJVTYpiGn/exec";

const getInitialState = (): FormData => {
  const initial: FormData = {};
  questions.forEach((q) => {
    if (q.type === 'info') return;
    
    if (q.type === 'matrix') {
      q.rows.forEach(row => {
        initial[`${q.id}_${row.id}`] = "";
      });
    } else {
      initial[q.id] = "";
      if (q.type === 'radio' && q.options.some(o => o.allowCustom)) {
        initial[`${q.id}_custom`] = "";
      }
    }
  });
  return initial;
};

export const useSurveyForm = () => {
  const [formData, setFormData] = useState<FormData>(getInitialState());
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    const currentSection = sections[stepIndex];
    const currentQuestions = questions.filter(q => currentSection.questionIds.includes(q.id));
    
    currentQuestions.forEach((q) => {
      if (q.type === 'info') return;

      if (q.type === 'matrix') {
        q.rows.forEach(row => {
          const key = `${q.id}_${row.id}`;
          if (!formData[key]) {
            newErrors[key] = "Vui lòng chọn một đánh giá.";
          }
        });
      } else {
        if (!formData[q.id]) {
          newErrors[q.id] = "Vui lòng hoàn thành câu hỏi này.";
        } else if (q.type === 'radio' && formData[q.id] === 'other' && !formData[`${q.id}_custom`]) {
          newErrors[`${q.id}_custom`] = "Vui lòng nhập nội dung khác.";
        }
      }
    });

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`question-${firstErrorKey.split('_')[0]}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, sections.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setStatus("sending");

    const params = new URLSearchParams();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (key.endsWith('_custom')) return; 
      
      const q = questions.find(q => q.id === key);
      if (q && q.type === 'radio' && value === 'other') {
        params.append(key, formData[`${key}_custom`] || "Khác");
      } else if (q && q.type === 'radio') {
         const selectedOption = q.options.find(o => o.value === value);
         params.append(key, selectedOption ? selectedOption.label : value);
      } else {
        params.append(key, value);
      }
    });

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        body: params,
        mode: "no-cors",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData(getInitialState());
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

import React from "react";
import { Question, FormData } from "../types";
import { RadioQuestionCard } from "./RadioQuestionCard";
import { CheckboxQuestionCard } from "./CheckboxQuestionCard";
import { MatrixQuestionCard } from "./MatrixQuestionCard";
import { TextQuestionCard } from "./TextQuestionCard";
import { InfoCard } from "./InfoCard";

interface Props {
  question: Question;
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const QuestionRenderer = React.memo(({ question, formData, errors, onChange }: Props) => {
  switch (question.type) {
    case "radio":
      return (
        <RadioQuestionCard
          question={question}
          value={formData[question.id] as string}
          customValue={formData[`${question.id}_custom`] as string}
          error={errors[question.id]}
          customError={errors[`${question.id}_custom`]}
          onChange={onChange}
        />
      );
    case "checkbox":
      return (
        <CheckboxQuestionCard
          question={question}
          value={(formData[question.id] as unknown as string[]) || []}
          customValue={formData[`${question.id}_custom`] as string}
          error={errors[question.id]}
          customError={errors[`${question.id}_custom`]}
          onChange={onChange}
          onCustomChange={(val) => onChange(`${question.id}_custom`, val)}
        />
      );
    case "matrix":
      return (
        <MatrixQuestionCard
          question={question}
          values={formData}
          errors={errors}
          onChange={onChange}
        />
      );
    case "text":
      return (
        <TextQuestionCard
          question={question}
          value={formData[question.id] as string}
          error={errors[question.id]}
          isConfirmed={formData[`${question.id}_confirmed`] === 'true'}
          onChange={onChange}
        />
      );
    case "info":
      return <InfoCard block={question} />;
    default:
      return null;
  }
}, (prevProps, nextProps) => {
  if (prevProps.question.id !== nextProps.question.id) return false;
  const qId = nextProps.question.id;
  
  if (nextProps.question.type === 'matrix') {
    for (const row of nextProps.question.rows) {
      const key = `${qId}_${row.id}`;
      if (prevProps.formData[key] !== nextProps.formData[key]) return false;
      if (prevProps.errors[key] !== nextProps.errors[key]) return false;
    }
    return true;
  }
  
  if (prevProps.formData[qId] !== nextProps.formData[qId]) return false;
  if (prevProps.errors[qId] !== nextProps.errors[qId]) return false;
  
  const customKey = `${qId}_custom`;
  if (prevProps.formData[customKey] !== nextProps.formData[customKey]) return false;
  if (prevProps.errors[customKey] !== nextProps.errors[customKey]) return false;
  
  const confirmedKey = `${qId}_confirmed`;
  if (prevProps.formData[confirmedKey] !== nextProps.formData[confirmedKey]) return false;
  
  return true;
});

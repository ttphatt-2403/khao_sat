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

export const QuestionRenderer = ({ question, formData, errors, onChange }: Props) => {
  switch (question.type) {
    case "radio":
      return (
        <RadioQuestionCard
          question={question}
          value={formData[question.id]}
          customValue={formData[`${question.id}_custom`]}
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
          value={formData[question.id]}
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
};

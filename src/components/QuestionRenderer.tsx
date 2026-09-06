import { Question } from "../types";
import { RadioQuestionCard } from "./RadioQuestionCard";
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
          onChange={onChange}
        />
      );
    case "info":
      return <InfoCard block={question} />;
    default:
      return null;
  }
};

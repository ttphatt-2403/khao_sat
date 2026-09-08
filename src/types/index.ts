export type QuestionType = 'radio' | 'checkbox' | 'matrix' | 'text' | 'info';

export interface MediaAsset {
  url: string;
  caption?: string;
  layout?: 'grid' | 'full';
}

export interface BaseQuestion {
  id: string; 
  type: QuestionType;
  number?: string | number; 
  text: string;
  description?: string;
  images?: MediaAsset[]; // Nâng cấp mảng string thành mảng MediaAsset
}

export interface RadioOption {
  value: string;
  label: string;
  allowCustom?: boolean; 
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: RadioOption[];
}

export interface CheckboxOption {
  value: string;
  label: string;
  allowCustom?: boolean;
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: CheckboxOption[];
  maxSelect?: number;
}

export interface MatrixRow {
  id: string; 
  label: string; 
}

export interface MatrixQuestion extends BaseQuestion {
  type: 'matrix';
  scaleStart: number;
  scaleEnd: number;
  scaleStartLabel?: string;
  scaleEndLabel?: string;
  rows: MatrixRow[];
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  placeholder?: string;
}

export interface InfoBlock extends BaseQuestion {
  type: 'info';
}

export type Question = RadioQuestion | CheckboxQuestion | MatrixQuestion | TextQuestion | InfoBlock;

export interface SurveySection {
  id: string;
  title: string;
  description?: string;
  questionIds: string[];
}

export type FormData = Record<string, string | string[]>;
export type SubmitStatus = "idle" | "sending" | "success" | "error";

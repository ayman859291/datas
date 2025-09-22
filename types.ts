// FIX: Import `ComponentType` to resolve the "Cannot find namespace 'React'" error.
import type { ComponentType } from 'react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface TopicComponentProps {
  onStartQuiz: () => void;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  // FIX: Use the imported `ComponentType` directly instead of `React.ComponentType`.
  component: ComponentType<TopicComponentProps>;
  quizData?: QuizQuestion[];
}

export type TopicId = 'arrays' | 'linkedlist' | 'doubly' | 'circular' | 'stack' | 'queue' | 'trees' | 'bst';

export interface UserAnswer {
  selected: number;
  isCorrect: boolean;
}

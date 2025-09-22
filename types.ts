
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
  component: React.ComponentType<TopicComponentProps>;
  quizData?: QuizQuestion[];
}

export type TopicId = 'arrays' | 'linkedlist' | 'doubly' | 'circular' | 'stack' | 'queue' | 'trees' | 'bst';

export interface UserAnswer {
  selected: number;
  isCorrect: boolean;
}

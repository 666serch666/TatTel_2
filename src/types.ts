export interface WordItem {
  id: string;
  tatar: string;
  russian: string;
  transcription?: string;
  exampleTatar?: string;
  exampleRussian?: string;
}

export interface Question {
  id: string;
  tatarWord: string;
  transcription: string;
  correctAnswer: string;
  options: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  status: 'available' | 'locked';
  wordCount: number;
  words: WordItem[];
  questions: Question[];
}

export interface UserProgress {
  level: string;
  completedLessonsCount: number;
  totalWordsLearned: number;
  overallPercentage: number;
  lastScore?: {
    correct: number;
    wrong: number;
    total: number;
    timestamp: number;
  };
}

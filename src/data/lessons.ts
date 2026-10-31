import { Lesson, WordItem, Question } from '../types';

export const GREETINGS_WORDS: WordItem[] = [
  {
    id: 'w1',
    tatar: 'Исәнме',
    russian: 'Привет',
    transcription: '[исэнме́]',
    exampleTatar: 'Исәнме, дустым!',
    exampleRussian: 'Привет, друг!'
  },
  {
    id: 'w2',
    tatar: 'Рәхмәт',
    russian: 'Спасибо',
    transcription: '[рэхмә́т]',
    exampleTatar: 'Олы рәхмәт!',
    exampleRussian: 'Большое спасибо!'
  },
  {
    id: 'w3',
    tatar: 'Әйе',
    russian: 'Да',
    transcription: '[әйе́]',
    exampleTatar: 'Әйе, мин риза.',
    exampleRussian: 'Да, я согласен.'
  },
  {
    id: 'w4',
    tatar: 'Юк',
    russian: 'Нет',
    transcription: '[юк]',
    exampleTatar: 'Юк, рәхмәт.',
    exampleRussian: 'Нет, спасибо.'
  },
  {
    id: 'w5',
    tatar: 'Сау бул',
    russian: 'До свидания',
    transcription: '[сау бу́л]',
    exampleTatar: 'Сау бул, иртәгәгә кадәр!',
    exampleRussian: 'До свидания, до завтра!'
  }
];

export const GREETINGS_QUESTIONS: Question[] = [
  {
    id: 'q1',
    tatarWord: 'Исәнме',
    transcription: '[исэнме́]',
    correctAnswer: 'Привет',
    options: ['Привет', 'Спасибо', 'Да', 'Нет']
  },
  {
    id: 'q2',
    tatarWord: 'Рәхмәт',
    transcription: '[рэхмә́т]',
    correctAnswer: 'Спасибо',
    options: ['До свидания', 'Спасибо', 'Привет', 'Нет']
  },
  {
    id: 'q3',
    tatarWord: 'Әйе',
    transcription: '[әйе́]',
    correctAnswer: 'Да',
    options: ['Нет', 'Спасибо', 'Да', 'Привет']
  },
  {
    id: 'q4',
    tatarWord: 'Юк',
    transcription: '[юк]',
    correctAnswer: 'Нет',
    options: ['Да', 'До свидания', 'Нет', 'Спасибо']
  },
  {
    id: 'q5',
    tatarWord: 'Сау бул',
    transcription: '[сау бу́л]',
    correctAnswer: 'До свидания',
    options: ['Привет', 'До свидания', 'Спасибо', 'Да']
  }
];

export const LESSONS: Lesson[] = [
  {
    id: 'greetings',
    title: 'Приветствия',
    subtitle: 'Базовые слова для первого контакта',
    iconName: 'handshake',
    status: 'available',
    wordCount: 5,
    words: GREETINGS_WORDS,
    questions: GREETINGS_QUESTIONS
  },
  {
    id: 'acquaintance',
    title: 'Знакомство',
    subtitle: 'Как представиться и спросить имя',
    iconName: 'user-plus',
    status: 'locked',
    wordCount: 5,
    words: [],
    questions: []
  },
  {
    id: 'family',
    title: 'Семья',
    subtitle: 'Близкие люди и родственники',
    iconName: 'users',
    status: 'locked',
    wordCount: 5,
    words: [],
    questions: []
  },
  {
    id: 'food',
    title: 'Еда',
    subtitle: 'Блюда татарской кухни и напитки',
    iconName: 'utensils',
    status: 'locked',
    wordCount: 5,
    words: [],
    questions: []
  },
  {
    id: 'daily_life',
    title: 'Повседневная жизнь',
    subtitle: 'Полезные фразы на каждый день',
    iconName: 'calendar',
    status: 'locked',
    wordCount: 5,
    words: [],
    questions: []
  }
];

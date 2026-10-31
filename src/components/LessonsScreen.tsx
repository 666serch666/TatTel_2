import React, { useState } from 'react';
import { Play, Lock, CheckCircle2, Volume2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { LESSONS, GREETINGS_WORDS } from '../data/lessons';
import { sounds } from '../utils/audio';

interface LessonsScreenProps {
  isFirstLessonCompleted: boolean;
  onStartLesson: () => void;
}

export const LessonsScreen: React.FC<LessonsScreenProps> = ({
  isFirstLessonCompleted,
  onStartLesson
}) => {
  const [showVocabulary, setShowVocabulary] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#20251F]">
          Уроки
        </h1>
        <p className="text-sm text-[#647062] mt-1">
          5 тематических разделов татарского языка
        </p>
      </div>

      <div className="space-y-3.5">
        {LESSONS.map((lesson, index) => {
          const isAvailable = lesson.status === 'available';
          const isCompleted = isAvailable && isFirstLessonCompleted;

          return (
            <div
              key={lesson.id}
              className={`rounded-2xl transition-all border ${
                isAvailable
                  ? 'bg-white border-[#D8DFD2] shadow-sm'
                  : 'bg-[#F0EFEB] border-dashed border-[#D8DFD2] opacity-75'
              }`}
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
                      isCompleted
                        ? 'bg-[#E3EBDD] text-[#245B3A]'
                        : isAvailable
                        ? 'bg-[#E3EBDD] text-[#245B3A]'
                        : 'bg-[#E2E0D8] text-[#8C9489]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-[#245B3A]" />
                    ) : isAvailable ? (
                      index + 1
                    ) : (
                      <Lock className="w-5 h-5 text-[#8C9489]" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-semibold ${
                          isAvailable ? 'text-[#20251F]' : 'text-[#647062]'
                        }`}
                      >
                        {lesson.title}
                      </h3>
                      {!isAvailable && (
                        <span className="text-[10px] text-[#647062] bg-[#E2E0D8] px-2 py-0.5 rounded-full font-medium">
                          Скоро
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#647062] mt-0.5">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                {isAvailable && (
                  <button
                    onClick={onStartLesson}
                    className="w-10 h-10 rounded-xl bg-[#245B3A] hover:bg-[#1A442B] text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
                    title="Начать урок"
                  >
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                )}
              </div>

              {/* Словарь для доступного урока */}
              {isAvailable && (
                <div className="px-4 pb-4 pt-1 border-t border-[#F0EFEB]">
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => setShowVocabulary(!showVocabulary)}
                      className="text-xs font-semibold text-[#245B3A] flex items-center gap-1 hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{showVocabulary ? 'Скрыть словарь урока' : 'Словарь урока (5 слов)'}</span>
                      {showVocabulary ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={onStartLesson}
                      className="text-xs font-medium text-[#245B3A] hover:underline"
                    >
                      {isCompleted ? 'Пройти повторно' : 'Перейти к тесту'}
                    </button>
                  </div>

                  {showVocabulary && (
                    <div className="mt-3 space-y-2 bg-[#F7F6F0] p-3 rounded-xl">
                      {GREETINGS_WORDS.map((word) => (
                        <div
                          key={word.id}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-white border border-[#E3EBDD]"
                        >
                          <div>
                            <span className="font-bold text-[#245B3A]">{word.tatar}</span>
                            <span className="text-[#647062] ml-2 text-[11px] font-mono">
                              {word.transcription}
                            </span>
                            <span className="text-[#20251F] ml-2">— {word.russian}</span>
                          </div>
                          <button
                            onClick={() => sounds.speakWord(word.tatar)}
                            className="p-1 text-[#245B3A] hover:bg-[#E3EBDD] rounded-md transition-colors"
                            title="Произношение"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

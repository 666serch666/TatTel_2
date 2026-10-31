import React from 'react';
import { Play, CheckCircle2, ChevronRight, Lock, BookOpen, Sparkles, Award } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { UserProgress } from '../types';

interface HomeScreenProps {
  progress: UserProgress;
  onStartLesson: () => void;
  onNavigateToLessons: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  progress,
  onStartLesson,
  onNavigateToLessons
}) => {
  const greetingsLesson = LESSONS[0];
  const isCompleted = progress.completedLessonsCount > 0;
  const progressPercent = isCompleted ? 100 : 20;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-5 animate-fade-in">
      {/* Шапка с приветствием */}
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-[#245B3A]">
            TatTel
          </h1>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E3EBDD] text-[#245B3A]">
            Татарский язык
          </span>
        </div>
        <p className="text-sm text-[#647062] mt-1">
          Хәерле көн! Добро пожаловать
        </p>
      </div>

      {/* Карточка текущего уровня и прогресса */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8DFD2] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#245B3A]"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#245B3A]">
              {progress.level}
            </span>
          </div>
          <span className="text-sm font-bold text-[#20251F] tabular-nums">
            {progressPercent}%
          </span>
        </div>

        {/* Прогресс-бар */}
        <div className="w-full bg-[#E3EBDD] h-2.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-[#245B3A] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-[#647062] mt-3 leading-relaxed">
          {isCompleted
            ? 'Поздравляем! Вы освоили первый урок «Приветствия». Повторяйте слова для закрепления.'
            : 'Начните с простых приветствий и освойте первые 5 практических слов татарского языка.'}
        </p>

        {/* Кнопка продолжения */}
        <button
          onClick={onStartLesson}
          className="w-full mt-4 h-12 bg-[#245B3A] hover:bg-[#1A442B] active:scale-[0.98] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#245B3A]/20"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isCompleted ? 'Повторить урок «Приветствия»' : 'Продолжить обучение'}</span>
        </button>
      </div>

      {/* Список доступных уроков */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#20251F]">
            Доступные уроки
          </h2>
          <button
            onClick={onNavigateToLessons}
            className="text-xs font-semibold text-[#245B3A] hover:underline"
          >
            Все уроки ({LESSONS.length})
          </button>
        </div>

        <div className="space-y-3">
          {/* Активный урок «Приветствия» */}
          <div
            onClick={onStartLesson}
            className="bg-white rounded-2xl p-4 border border-[#D8DFD2] hover:border-[#245B3A]/50 transition-all cursor-pointer shadow-sm flex items-center justify-between group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#E3EBDD] text-[#245B3A] flex items-center justify-center font-bold text-base shrink-0 group-hover:bg-[#245B3A] group-hover:text-white transition-colors">
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-[#245B3A] group-hover:text-white" />
                ) : (
                  '1'
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#20251F]">
                    {greetingsLesson.title}
                  </h3>
                  <span className="text-[10px] font-medium text-[#245B3A] bg-[#E3EBDD] px-2 py-0.5 rounded-full">
                    {isCompleted ? 'Освоен' : 'Доступен'}
                  </span>
                </div>
                <p className="text-xs text-[#647062] mt-0.5">
                  {greetingsLesson.wordCount} базовых слов · 5 упражнений
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F7F6F0] flex items-center justify-center text-[#245B3A] group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Будущий урок: «Знакомство» */}
          <div className="bg-[#F0EFEB] rounded-2xl p-4 border border-dashed border-[#D8DFD2] flex items-center justify-between opacity-80">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#E2E0D8] text-[#8C9489] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-[#647062]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-[#647062]">
                    Знакомство
                  </h3>
                  <span className="text-[10px] text-[#647062] bg-[#E2E0D8] px-2 py-0.5 rounded-full">
                    Скоро
                  </span>
                </div>
                <p className="text-xs text-[#8C9489] mt-0.5">
                  Как спросить имя и представиться
                </p>
              </div>
            </div>
          </div>

          {/* Будущий урок: «Семья» */}
          <div className="bg-[#F0EFEB] rounded-2xl p-4 border border-dashed border-[#D8DFD2] flex items-center justify-between opacity-70">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#E2E0D8] text-[#8C9489] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-[#647062]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-[#647062]">
                    Семья
                  </h3>
                  <span className="text-[10px] text-[#647062] bg-[#E2E0D8] px-2 py-0.5 rounded-full">
                    Скоро
                  </span>
                </div>
                <p className="text-xs text-[#8C9489] mt-0.5">
                  Близкие люди и родные
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

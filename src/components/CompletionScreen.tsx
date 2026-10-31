import React from 'react';
import { Award, RotateCcw, Home, CheckCircle2, XCircle } from 'lucide-react';
import { GREETINGS_WORDS } from '../data/lessons';

interface CompletionScreenProps {
  result: {
    correct: number;
    wrong: number;
    total: number;
  };
  onRetry: () => void;
  onGoHome: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  result,
  onRetry,
  onGoHome
}) => {
  const percentage = Math.round((result.correct / result.total) * 100);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F7F6F0] overflow-y-auto animate-fade-in">
      {/* Верхний отступ */}
      <div />

      {/* Центральный блок результатов */}
      <div className="max-w-md mx-auto w-full text-center py-4">
        {/* Иконка награды */}
        <div className="w-20 h-20 rounded-full bg-[#E3EBDD] text-[#245B3A] flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Award className="w-10 h-10 stroke-[2.2]" />
        </div>

        <h1 className="text-2xl font-bold text-[#20251F]">
          Урок завершён!
        </h1>
        <p className="text-xs font-semibold text-[#245B3A] mt-1">
          Булдырдың! Отличный результат
        </p>
        <p className="text-xs text-[#647062] mt-1">
          Вы завершили практический модуль «Приветствия»
        </p>

        {/* Карточки правильных ответов и ошибок */}
        <div className="grid grid-cols-2 gap-3.5 mt-6">
          <div className="bg-white rounded-2xl p-4 border border-[#D8DFD2] shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-[#245B3A] mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-xs font-medium">Верно</span>
            </div>
            <div className="text-3xl font-bold text-[#245B3A] tabular-nums">
              {result.correct}
            </div>
            <div className="text-[11px] text-[#647062] mt-0.5">
              из {result.total} вопросов
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-[#D8DFD2] shadow-sm text-center">
            <div className="flex items-center justify-center gap-1.5 text-[#BA1A1A] mb-1">
              <XCircle className="w-4 h-4" />
              <span className="text-xs font-medium">Ошибки</span>
            </div>
            <div className="text-3xl font-bold text-[#BA1A1A] tabular-nums">
              {result.wrong}
            </div>
            <div className="text-[11px] text-[#647062] mt-0.5">
              для повторения
            </div>
          </div>
        </div>

        {/* Полоса точности */}
        <div className="mt-4 bg-[#E3EBDD] rounded-xl p-3 flex items-center justify-between text-xs font-medium text-[#245B3A]">
          <span>Точность прохождения</span>
          <span className="font-bold tabular-nums text-sm">{percentage}%</span>
        </div>

        {/* Закрепление выученных слов */}
        <div className="mt-5 text-left bg-white rounded-2xl p-4 border border-[#D8DFD2]">
          <span className="text-xs font-bold text-[#20251F] block mb-2">
            Изученные слова урока:
          </span>
          <div className="space-y-1.5 text-xs">
            {GREETINGS_WORDS.map((w) => (
              <div key={w.id} className="flex justify-between items-center py-0.5 border-b border-[#F7F6F0] last:border-0">
                <span className="font-semibold text-[#245B3A]">{w.tatar}</span>
                <span className="text-[#647062] font-mono text-[11px]">{w.transcription}</span>
                <span className="text-[#20251F]">{w.russian}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Кнопки действий: Повторить и На главную */}
      <div className="max-w-md mx-auto w-full space-y-2.5 pt-4">
        <button
          onClick={onRetry}
          className="w-full h-12 rounded-xl bg-[#245B3A] hover:bg-[#1A442B] active:scale-[0.99] text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm shadow-[#245B3A]/20"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Пройти ещё раз</span>
        </button>

        <button
          onClick={onGoHome}
          className="w-full h-12 rounded-xl bg-white border border-[#D8DFD2] hover:bg-[#F0EFEB] active:scale-[0.99] text-[#20251F] font-medium text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Home className="w-4 h-4 text-[#647062]" />
          <span>На главный экран</span>
        </button>
      </div>
    </div>
  );
};

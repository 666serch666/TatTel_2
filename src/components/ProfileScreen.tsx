import React from 'react';
import { User, BookOpen, Volume2, RotateCcw, CheckCircle, ShieldCheck } from 'lucide-react';
import { UserProgress } from '../types';
import { GREETINGS_WORDS } from '../data/lessons';
import { sounds } from '../utils/audio';

interface ProfileScreenProps {
  progress: UserProgress;
  onResetProgress: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  progress,
  onResetProgress
}) => {
  const isLessonCompleted = progress.completedLessonsCount > 0;
  const progressPercent = isLessonCompleted ? 20 : 0; // 1 out of 5 planned modules

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 animate-fade-in">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#20251F]">
          Профиль
        </h1>
        <p className="text-sm text-[#647062] mt-0.5">
          TatTel — изучение татарского языка
        </p>
      </div>

      {/* Карточка пользователя */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8DFD2] shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#E3EBDD] text-[#245B3A] flex items-center justify-center font-bold text-xl shrink-0">
          <User className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#20251F]">
            Ученик TatTel
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#647062] mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#245B3A]" />
            <span>Локальный профиль (без регистрации)</span>
          </div>
        </div>
      </div>

      {/* Общий прогресс курса */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8DFD2] shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#20251F]">
            Общий прогресс курса
          </span>
          <span className="text-sm font-bold text-[#245B3A] tabular-nums">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full bg-[#E3EBDD] h-2.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-[#245B3A] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-[#647062] mt-2.5">
          {isLessonCompleted
            ? '1 из 5 тематических уроков успешно пройден'
            : '0 из 5 тематических уроков пройдено. Пройдите первый урок для старта.'}
        </p>
      </div>

      {/* Статистика в карточках */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-[#D8DFD2] shadow-sm">
          <div className="text-2xl font-bold text-[#245B3A] tabular-nums">
            {progress.completedLessonsCount}
          </div>
          <div className="text-xs text-[#647062] mt-1">
            Пройдено уроков
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-[#D8DFD2] shadow-sm">
          <div className="text-2xl font-bold text-[#20251F] tabular-nums">
            {isLessonCompleted ? 5 : 0}
          </div>
          <div className="text-xs text-[#647062] mt-1">
            Изучено слов
          </div>
        </div>
      </div>

      {/* Словарь для повторения */}
      <div className="bg-white rounded-2xl p-5 border border-[#D8DFD2] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#20251F] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#245B3A]" />
            <span>Словарь: Приветствия</span>
          </h3>
          <span className="text-[11px] text-[#647062]">
            5 практических слов
          </span>
        </div>

        <div className="space-y-2">
          {GREETINGS_WORDS.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between p-2 rounded-xl bg-[#F7F6F0] border border-[#E3EBDD]"
            >
              <div>
                <span className="font-bold text-xs text-[#245B3A]">{w.tatar}</span>
                <span className="text-[11px] text-[#647062] font-mono ml-2">
                  {w.transcription}
                </span>
                <span className="text-xs text-[#20251F] ml-2">— {w.russian}</span>
              </div>
              <button
                onClick={() => sounds.speakWord(w.tatar)}
                className="w-7 h-7 rounded-lg bg-white hover:bg-[#E3EBDD] text-[#245B3A] flex items-center justify-center transition-colors shadow-2xs"
                title="Озвучить"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка сброса прогресса */}
      <div className="pt-2">
        <button
          onClick={onResetProgress}
          className="w-full py-3 px-4 rounded-xl border border-[#D8DFD2] bg-white hover:bg-[#F0EFEB] text-[#647062] hover:text-[#20251F] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Сбросить прогресс для повторного тестирования</span>
        </button>
      </div>
    </div>
  );
};

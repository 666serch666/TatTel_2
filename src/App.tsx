import React, { useState, useEffect } from 'react';
import { Home, BookOpen, User, Smartphone, Maximize2, Minimize2, Code2, Wifi, Battery, Signal } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { LessonsScreen } from './components/LessonsScreen';
import { ExerciseScreen } from './components/ExerciseScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AndroidCodeModal } from './components/AndroidCodeModal';
import { UserProgress } from './types';

type Screen = 'home' | 'lessons' | 'profile' | 'exercise' | 'completion';

const STORAGE_KEY = 'tattel_user_progress_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [lastResult, setLastResult] = useState<{ correct: number; wrong: number; total: number }>({
    correct: 5,
    wrong: 0,
    total: 5
  });

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      level: 'Уровень 1 · Начинающий',
      completedLessonsCount: 0,
      totalWordsLearned: 0,
      overallPercentage: 0
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore
    }
  }, [progress]);

  const handleFinishLesson = (result: { correct: number; wrong: number; total: number }) => {
    setLastResult(result);
    setProgress({
      level: 'Уровень 1 · Начинающий',
      completedLessonsCount: 1,
      totalWordsLearned: 5,
      overallPercentage: 20,
      lastScore: {
        correct: result.correct,
        wrong: result.wrong,
        total: result.total,
        timestamp: Date.now()
      }
    });
    setCurrentScreen('completion');
  };

  const handleResetProgress = () => {
    const fresh: UserProgress = {
      level: 'Уровень 1 · Начинающий',
      completedLessonsCount: 0,
      totalWordsLearned: 0,
      overallPercentage: 0
    };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY);
  };

  const showBottomNav = ['home', 'lessons', 'profile'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-[#EBECE7] flex flex-col items-center justify-center p-0 sm:p-4 text-[#20251F] font-sans antialiased selection:bg-[#E3EBDD] selection:text-[#245B3A]">
      {/* Верхняя сервисная панель управления прототипом */}
      <header className="w-full max-w-4xl px-4 py-2.5 flex items-center justify-between text-xs text-[#647062] border-b sm:border-b-0 border-[#D8DFD2] mb-0 sm:mb-2 bg-[#F7F6F0] sm:bg-transparent">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#245B3A] text-sm">TatTel</span>
          <span className="text-[#647062]">· Мобильный Android-прототип (Material 3)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Кнопка просмотра нативного Android Kotlin кода */}
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D8DFD2] text-[#245B3A] font-medium hover:bg-[#E3EBDD] transition-colors shadow-2xs"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Android Kotlin код</span>
            <span className="sm:hidden">Код</span>
          </button>

          {/* Переключатель вида устройства */}
          <button
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D8DFD2] text-[#20251F] font-medium hover:bg-[#F0EFEB] transition-colors shadow-2xs"
            title="Переключить рамку смартфона"
          >
            {isPhoneFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Широкий экран</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Рамка Android</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Контейнер мобильного устройства */}
      <main
        className={`w-full transition-all duration-300 flex flex-col ${
          isPhoneFrame
            ? 'max-w-[400px] h-[840px] max-h-[96vh] sm:rounded-[44px] shadow-2xl border-0 sm:border-[10px] sm:border-[#1E2320] ring-1 ring-black/10'
            : 'max-w-2xl min-h-[85vh] sm:rounded-3xl shadow-lg border border-[#D8DFD2]'
        } bg-[#F7F6F0] overflow-hidden relative`}
      >
        {/* Android Status Bar (при включённой рамке) */}
        {isPhoneFrame && (
          <div className="h-10 px-6 flex items-center justify-between text-xs text-[#20251F] select-none shrink-0 border-b border-[#F0EFEB] bg-[#F7F6F0]/90 backdrop-blur-sm z-30">
            <span className="font-semibold text-[13px]">12:30</span>
            {/* Динамик/Камера смартфона */}
            <div className="w-4 h-4 rounded-full bg-[#1E2320]/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#1E2320]" />
            </div>
            <div className="flex items-center gap-1.5 text-[#20251F]">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Экранное содержимое */}
        <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden bg-[#F7F6F0]">
          {currentScreen === 'home' && (
            <HomeScreen
              progress={progress}
              onStartLesson={() => setCurrentScreen('exercise')}
              onNavigateToLessons={() => setCurrentScreen('lessons')}
            />
          )}

          {currentScreen === 'lessons' && (
            <LessonsScreen
              isFirstLessonCompleted={progress.completedLessonsCount > 0}
              onStartLesson={() => setCurrentScreen('exercise')}
            />
          )}

          {currentScreen === 'exercise' && (
            <ExerciseScreen
              onClose={() => setCurrentScreen('home')}
              onFinish={handleFinishLesson}
            />
          )}

          {currentScreen === 'completion' && (
            <CompletionScreen
              result={lastResult}
              onRetry={() => setCurrentScreen('exercise')}
              onGoHome={() => setCurrentScreen('home')}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              progress={progress}
              onResetProgress={handleResetProgress}
            />
          )}
        </div>

        {/* Навигационная панель Material 3 (Bottom Navigation Bar) */}
        {showBottomNav && (
          <nav className="h-16 bg-white border-t border-[#D8DFD2] flex items-center justify-around px-2 shrink-0 z-30">
            <button
              onClick={() => setCurrentScreen('home')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
                currentScreen === 'home'
                  ? 'text-[#245B3A] font-bold'
                  : 'text-[#647062] hover:text-[#20251F]'
              }`}
            >
              <div
                className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                  currentScreen === 'home' ? 'bg-[#E3EBDD]' : ''
                }`}
              >
                <Home className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5">Главная</span>
            </button>

            <button
              onClick={() => setCurrentScreen('lessons')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
                currentScreen === 'lessons'
                  ? 'text-[#245B3A] font-bold'
                  : 'text-[#647062] hover:text-[#20251F]'
              }`}
            >
              <div
                className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                  currentScreen === 'lessons' ? 'bg-[#E3EBDD]' : ''
                }`}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5">Уроки</span>
            </button>

            <button
              onClick={() => setCurrentScreen('profile')}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-colors ${
                currentScreen === 'profile'
                  ? 'text-[#245B3A] font-bold'
                  : 'text-[#647062] hover:text-[#20251F]'
              }`}
            >
              <div
                className={`w-12 h-7 rounded-full flex items-center justify-center transition-all ${
                  currentScreen === 'profile' ? 'bg-[#E3EBDD]' : ''
                }`}
              >
                <User className="w-5 h-5" />
              </div>
              <span className="text-[11px] mt-0.5">Профиль</span>
            </button>
          </nav>
        )}

        {/* Android Gesture Bar (полоска жестов внизу экрана) */}
        {isPhoneFrame && (
          <div className="h-4 bg-white flex items-center justify-center pb-1 select-none shrink-0">
            <div className="w-32 h-1 rounded-full bg-[#20251F]/30" />
          </div>
        )}
      </main>

      {/* Модальное окно с Android-кодом */}
      <AndroidCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}

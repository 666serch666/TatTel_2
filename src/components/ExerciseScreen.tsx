import React, { useState } from 'react';
import { X, Volume2, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { GREETINGS_QUESTIONS, GREETINGS_WORDS } from '../data/lessons';
import { sounds } from '../utils/audio';

interface ExerciseScreenProps {
  onClose: () => void;
  onFinish: (result: { correct: number; wrong: number; total: number }) => void;
}

export const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ onClose, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const question = GREETINGS_QUESTIONS[currentIndex];
  const wordInfo = GREETINGS_WORDS.find((w) => w.tatar === question.tatarWord);
  const totalQuestions = GREETINGS_QUESTIONS.length;
  const isCorrect = selectedOption === question.correctAnswer;

  const handleSelectOption = (option: string) => {
    if (isChecked) return; // Prevent changing after check
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isChecked) return;
    setIsChecked(true);

    if (selectedOption === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      sounds.playSuccess();
    } else {
      setWrongCount((prev) => prev + 1);
      sounds.playError();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      // Completed all questions
      const finalCorrect = isCorrect ? correctCount : correctCount;
      const finalWrong = !isCorrect ? wrongCount : wrongCount;
      onFinish({
        correct: finalCorrect,
        wrong: finalWrong,
        total: totalQuestions
      });
    }
  };

  const handlePronounce = () => {
    sounds.speakWord(question.tatarWord);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F7F6F0] relative overflow-hidden animate-fade-in">
      {/* Верхний бар с прогрессом и выходом */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#20251F] hover:bg-black/5 active:scale-95 transition-all"
            title="Выйти"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Индикатор прогресса упражнения */}
          <div className="flex-1 bg-[#E3EBDD] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#245B3A] h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <span className="text-xs font-semibold text-[#647062] tabular-nums shrink-0">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Центральная часть: Слово и 4 варианта ответа */}
      <div className="flex-1 px-5 py-4 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-5">
          <span className="text-xs font-medium text-[#647062] uppercase tracking-wider">
            Выберите верный перевод
          </span>
        </div>

        {/* Карточка татарского слова */}
        <div className="bg-white rounded-2xl p-6 text-center border border-[#D8DFD2] shadow-sm mb-6 relative">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-3xl font-bold text-[#245B3A] tracking-tight">
              {question.tatarWord}
            </h2>
            <button
              onClick={handlePronounce}
              className="w-9 h-9 rounded-full bg-[#E3EBDD] hover:bg-[#D8DFD2] active:scale-95 text-[#245B3A] flex items-center justify-center transition-all"
              title="Прослушать произношение"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono text-[#647062] mt-1.5">
            {question.transcription}
          </div>

          {wordInfo?.exampleTatar && (
            <div className="mt-3 pt-3 border-t border-[#F0EFEB] text-xs text-[#647062]">
              <span className="italic font-medium text-[#20251F]">
                Пример:{' '}
              </span>
              <span>«{wordInfo.exampleTatar}»</span>
            </div>
          )}
        </div>

        {/* 4 варианта ответа */}
        <div className="grid grid-cols-1 gap-2.5 w-full">
          {question.options.map((option) => {
            const isSelected = selectedOption === option;
            const isCorrectAnswer = option === question.correctAnswer;

            let buttonStyle = 'bg-white border-[#D8DFD2] text-[#20251F] hover:border-[#245B3A]/40';

            if (!isChecked) {
              if (isSelected) {
                buttonStyle = 'bg-[#E3EBDD] border-[#245B3A] text-[#245B3A] font-semibold ring-2 ring-[#245B3A]/20';
              }
            } else {
              // Answer has been checked
              if (isCorrectAnswer) {
                buttonStyle = 'bg-[#E3EBDD] border-[#245B3A] text-[#245B3A] font-semibold';
              } else if (isSelected && !isCorrectAnswer) {
                buttonStyle = 'bg-[#FFDAD6] border-[#BA1A1A] text-[#BA1A1A] font-semibold';
              } else {
                buttonStyle = 'bg-white border-[#D8DFD2]/60 text-[#20251F]/40';
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                disabled={isChecked}
                className={`w-full py-3.5 px-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between ${buttonStyle}`}
              >
                <span>{option}</span>
                {isChecked && isCorrectAnswer && (
                  <Check className="w-4 h-4 text-[#245B3A]" />
                )}
                {isChecked && isSelected && !isCorrectAnswer && (
                  <AlertCircle className="w-4 h-4 text-[#BA1A1A]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Нижняя панель действий */}
      <div
        className={`p-5 transition-colors border-t duration-200 ${
          isChecked
            ? isCorrect
              ? 'bg-[#E3EBDD] border-[#D8DFD2]'
              : 'bg-[#FFDAD6]/60 border-[#BA1A1A]/20'
            : 'bg-white border-[#D8DFD2]'
        }`}
      >
        <div className="max-w-md mx-auto w-full">
          {isChecked && (
            <div className="mb-3 flex items-center gap-2 animate-fade-in">
              {isCorrect ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-[#245B3A] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#245B3A] block">
                      Отлично! Дөрес!
                    </span>
                    <span className="text-xs text-[#245B3A]/80">
                      Верный перевод: {question.correctAnswer}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-6 h-6 rounded-full bg-[#BA1A1A] text-white flex items-center justify-center shrink-0">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#BA1A1A] block">
                      Не совсем так
                    </span>
                    <span className="text-xs text-[#BA1A1A]">
                      Правильный ответ:{' '}
                      <strong className="underline">{question.correctAnswer}</strong>
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {!isChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className={`w-full h-12 rounded-xl font-medium text-sm transition-all flex items-center justify-center ${
                selectedOption
                  ? 'bg-[#245B3A] text-white hover:bg-[#1A442B] active:scale-[0.99] shadow-sm'
                  : 'bg-[#D8DFD2] text-[#647062] cursor-not-allowed'
              }`}
            >
              Проверить ответ
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full h-12 rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm ${
                isCorrect
                  ? 'bg-[#245B3A] hover:bg-[#1A442B]'
                  : 'bg-[#BA1A1A] hover:bg-[#8F1313]'
              }`}
            >
              <span>
                {currentIndex + 1 < totalQuestions ? 'Следующее слово' : 'Завершить урок'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

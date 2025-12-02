import { useState, useEffect } from 'react';
import { LuTimer } from 'react-icons/lu';
import { getThemeClasses } from '@/styles/themes';
import { Theme } from '@/contexts/ThemeContext';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAns: number;
  technology: string;
}

interface QuizProps {
  theme: Theme;
  quizQuestions: QuizQuestion[];
  onComplete: () => void;
  onAnswerCorrect: (technology: string, isCorrect: boolean) => void;
  onRetryQuiz: () => void;
  onAcceptQuiz: () => void;
  onRejectQuiz: () => void;
  showPrompt: boolean;
  isActive: boolean;
  hasFinished: boolean;
  hasSkipped: boolean;
  quizScore: number;
}

export default function Quiz({
  theme,
  quizQuestions,
  onComplete,
  onAnswerCorrect,
  onRetryQuiz,
  onAcceptQuiz,
  onRejectQuiz,
  showPrompt,
  isActive,
  hasFinished,
  hasSkipped,
  quizScore,
}: QuizProps) {
  const styles = getThemeClasses(theme);
  const timeLimit = 10;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);

    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentQuestion, isActive, onAnswerCorrect, onComplete, quizQuestions]);

  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      onAnswerCorrect(quizQuestions[currentQuestion].technology, false);

      const timeout = setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          onComplete();
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft, isActive, currentQuestion, quizQuestions, onAnswerCorrect, onComplete]);

  useEffect(() => {
    // Empty since cleanup happens in main effect
  }, [selectedAnswer]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const isCorrect = index === quizQuestions[currentQuestion].correctAns;

      onAnswerCorrect(quizQuestions[currentQuestion].technology, isCorrect);

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setTimeLeft(timeLimit);
        } else {
          onComplete();
        }
      }, 1000);
    }
  };

  if (showPrompt) {
    return (
      <section
        className={`p-2 rounded-lg border mb-[14px] ${styles.window.content.border} min-h-[165px] flex items-center`}
        role="region"
        aria-label="Quiz prompt"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4">
          <div className={`flex-1 text-center ${styles.window.content.text}`}>
            <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl">Quiz?</h3>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={onAcceptQuiz}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded ${styles.technologies.quiz.button.primary}`}
              aria-label="Start quiz"
            >
              Start
            </button>
            <button
              onClick={onRejectQuiz}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded border ${styles.technologies.quiz.button.secondary} ${styles.window.content.text}`}
              aria-label="Skip quiz"
            >
              Skip
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (hasFinished && !isActive) {
    const message =
      quizScore === quizQuestions.length ? 'Wow 100%? You stalking me 👀?' : 'Nice try!';

    return (
      <section
        className={`p-2 rounded-lg border ${styles.window.content.border} min-h-[165px] mb-[14px] flex items-center justify-center`}
        role="status"
        aria-live="polite"
        aria-label="Quiz results"
      >
        <div className={`text-center ${styles.window.content.text}`}>
          <h3
            className={`text-center font-bold text-[19px] sm:text-[20px] ${styles.window.content.text}`}
          >
            Quiz Complete! (Score: {quizScore}/{quizQuestions.length})
          </h3>
          <p className={`text-[14px] sm:text-[15px] font-semibold ${styles.window.content.text}`}>
            {message}
          </p>
          <button
            onClick={onRetryQuiz}
            className={`text-[12px] sm:text-[12px] ${styles.window.content.accent} hover:underline`}
            aria-label="Retry quiz"
          >
            {quizScore === quizQuestions.length ? 'Ego satisfied or again?' : 'Retry quiz?'}
          </button>
        </div>
      </section>
    );
  }

  if (hasSkipped) {
    return (
      <section
        className={`p-2 rounded-lg border ${styles.window.content.border}  mb-[14px] min-h-[165px] flex items-center justify-center`}
        role="status"
        aria-live="polite"
        aria-label="Quiz skipped message"
      >
        <div className={`text-center ${styles.window.content.text}`}>
          <h3 className={`text-center text-[18px] sm:text-[19px] ${styles.window.content.text}`}>
            Quiz Skipped!
          </h3>
          <p className={`text-[13px] sm:text-[14px] ${styles.window.content.text}`}>
            I spent so much time on it 😭
          </p>
          <button
            onClick={onRetryQuiz}
            className={`text-[12px] sm:text-[13px] ${styles.window.content.accent} hover:underline`}
            aria-label="Start quiz"
          >
            Just in case you change your mind
          </button>
        </div>
      </section>
    );
  }

  if (isActive) {
    const question = quizQuestions[currentQuestion];
    return (
      <section
        className={`p-2 rounded-lg border ${styles.window.content.border} min-h-[165px]`}
        role="region"
        aria-label="Quiz question"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
          <h3
            className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${styles.window.content.text}`}
          >
            <span className="sr-only">Question </span>
            {currentQuestion + 1}/{quizQuestions.length}. {question.question}
          </h3>
          <div
            className={`flex items-center gap-1 text-base sm:text-lg font-bold ${timeLeft <= 3 ? 'text-red-500' : styles.window.content.text}`}
            aria-label={`Time remaining: ${timeLeft} seconds`}
            style={{ minWidth: '3.5rem' }}
          >
            <LuTimer className="w-4 h-4 sm:w-5 sm:h-5" />
            {timeLeft}
          </div>
        </div>
        <div
          className="grid text-sm sm:text-base grid-cols-3 gap-2 sm:gap-2"
          role="group"
          aria-label="Answer options"
        >
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAns;
            const isSelected = selectedAnswer === index;
            const showCorrect = selectedAnswer !== null && isCorrect;
            const showIncorrect = selectedAnswer !== null && isSelected && !isCorrect;

            let buttonClasses = `w-full p-1 text-sm font-semibold rounded text-center transition-all border ${styles.window.content.text}`;

            if (selectedAnswer === null) {
              buttonClasses = `${buttonClasses} ${styles.technologies.quiz.answer.default}`;
            } else if (showCorrect) {
              buttonClasses = `${buttonClasses} ${styles.technologies.quiz.answer.correct}`;
            } else if (showIncorrect) {
              buttonClasses = `${buttonClasses} ${styles.technologies.quiz.answer.incorrect}`;
            } else {
              buttonClasses = `${buttonClasses} ${styles.window.content.border} ${styles.window.content.textSecondary}`;
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={buttonClasses}
                aria-label={`Answer option: ${option}`}
                aria-pressed={isSelected}
              >
                {option}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return null;
}

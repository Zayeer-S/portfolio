import { useState } from 'react';
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
  isActive,
  hasFinished,
  hasSkipped,
  quizScore,
}: QuizProps) {
  const styles = getThemeClasses(theme);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const isCorrect = index === quizQuestions[currentQuestion].correctAns;

      onAnswerCorrect(quizQuestions[currentQuestion].technology, isCorrect);

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          onComplete();
        }
      }, 1000);
    }
  };

  if (hasFinished && !isActive) {
    return (
      <div className={`p-2 rounded-lg border ${styles.window.content.border}`}>
        <div className={`text-center ${styles.window.content.text}`}>
          <h3 className={`text-center text-[19px] ${styles.window.content.text}`}>
            Quiz Complete! (Score: {quizScore}/{quizQuestions.length})
          </h3>
          <button
            onClick={onRetryQuiz}
            className={`text-[13px] ${styles.window.content.accent} hover:underline`}
          >
            {hasSkipped
              ? 'Just in case you change your mind'
              : quizScore === quizQuestions.length
                ? 'Ego satisfied or again?'
                : 'Retry quiz?'}
          </button>
        </div>
      </div>
    );
  }

  if (hasSkipped) {
    return (
      <div className={`p-2 rounded-lg border ${styles.window.content.border}`}>
        <div className={`text-center ${styles.window.content.text}`}>
          <h3 className={`text-center text-[19px] ${styles.window.content.text}`}>
            Quiz Skipped! 😭
          </h3>
          <button
            onClick={onRetryQuiz}
            className={`text-[13px] ${styles.window.content.accent} hover:underline`}
          >
            Just in case you change your mind
          </button>
        </div>
      </div>
    );
  }

  if (isActive) {
    const question = quizQuestions[currentQuestion];
    return (
      <div className={`p-2 rounded-lg border ${styles.window.content.border}`}>
        <h3 className={`text-base font-semibold mb-2 ${styles.window.content.text}`}>
          {currentQuestion + 1}/{quizQuestions.length} {question.question}
        </h3>
        <div className="grid text-sm grid-cols-3 gap-2">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAns;
            const isSelected = selectedAnswer === index;
            const showCorrect = selectedAnswer !== null && isCorrect;
            const showIncorrect = selectedAnswer !== null && isSelected && !isCorrect;

            let buttonClasses = `w-full p-2 rounded text-center transition-all border ${styles.window.content.text}`;

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
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

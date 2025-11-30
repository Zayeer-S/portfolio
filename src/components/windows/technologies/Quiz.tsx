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
  onComplete: (score: number) => void;
  onCancel: () => void;
}

export default function Quiz({ theme, quizQuestions, onComplete, onCancel }: QuizProps) {
  const styles = getThemeClasses(theme);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      if (index === quizQuestions[currentQuestion].correctAns) {
        setScore(score + 1);
      }
      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowResult(true);
        }
      }, 1500);
    }
  };

  const handleComplete = () => {
    onComplete(score);
  };

  if (showResult) {
    return (
      <div className="flex items-center justify-center h-full">
        <div
          className={`text-center space-y-4 p-6 rounded-lg border ${styles.technologies.quiz.prompt.border}`}
        >
          <h3 className={`text-2xl font-bold ${styles.window.content.text}`}>Quiz complete</h3>
          <p className={`text-4xl font-bold ${styles.window.content.accent}`}>
            {score} / {quizQuestions.length}
          </p>
          <p className={`text-sm ${styles.window.content.textSecondary}`}>
            {score === quizQuestions.length
              ? '100%'
              : score >= quizQuestions.length / 2
                ? 'Neat'
                : 'LMAO 💀💀💀'}
          </p>
          <button
            onClick={handleComplete}
            className={`px-4 py-2 rounded ${styles.technologies.quiz.button.primary}`}
          >
            View technologies
          </button>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  return (
    <div className="space-y-6">
      <div className={`p-3 rounded-lg border ${styles.window.content.border}`}>
        <h3 className={`text-lg font-semibold mb-4 ${styles.window.content.text}`}>
          {currentQuestion + 1}/{quizQuestions.length}. {question.question}
        </h3>
        <div className="grid grid-cols-3 gap-2">
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
    </div>
  );
}

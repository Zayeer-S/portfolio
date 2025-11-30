import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { useEffect, useState } from 'react';
import { fa } from 'zod/locales';

interface Technology {
  name: string;
  category: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAns: number;
  technology: string;
}

export default function TechnologiesWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const [showQuizPrompt, setShowQuizPrompt] = useState(true);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [hasAttemptedQuiz, setHasAttemptedQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const [visibleTechs, setVisibleTechs] = useState<Set<string>>(new Set());
  const [flickeringTechs, setFlickeringTechs] = useState<Set<string>>(new Set());

  const technologies: Technology[] = [
    { name: 'Python', category: 'Languages' },
    { name: 'TypeScript', category: 'Languages' },
    { name: 'React', category: 'Frameworks' },
    { name: 'C#', category: 'Languages' },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      question: 'What framework powers this portfolio website?',
      options: ['Vue.js', 'Angular', 'Laravel', 'Svelte', 'React'],
      correctAns: 4,
      technology: 'React',
    },
  ];

  const flickerInTechnologies = (techName: string, delay: number = 0) => {
    setTimeout(() => {
      setFlickeringTechs(prev => new Set(prev).add(techName));

      const flickerPattern = [
        { time: 0, visible: false },
        { time: 25, visible: true },
        { time: 50, visible: false },
        { time: 75, visible: true },
        { time: 100, visible: false },
        { time: 150, visible: true },
      ];

      flickerPattern.forEach(({ time, visible }) => {
        setTimeout(() => {
          if (visible) {
            setVisibleTechs(prev => new Set(prev).add(techName));
          } else {
            setVisibleTechs(prev => {
              const newSet = new Set(prev);
              newSet.delete(techName);
              return newSet;
            });
          }
        }, time);
      });

      setTimeout(() => {
        setFlickeringTechs(prev => {
          const newSet = new Set(prev);
          newSet.delete(techName);
          return newSet;
        });
      }, 500);
    }, delay);
  };

  useEffect(() => {
    if (isFlickering) {
      technologies.forEach((tech, index) => {
        flickerInTechnologies(tech.name, index * 100);
      });
    }
  }, [isFlickering]);

  const handleAcceptQuiz = () => {
    setShowQuizPrompt(false);
    setIsQuizActive(true);
    setHasAttemptedQuiz(true);
    setVisibleTechs(new Set());
  };

  const handleRetryQuiz = () => {
    setIsQuizActive(true);
    setHasAttemptedQuiz(true);
    setVisibleTechs(new Set());
  };

  const handleRejectQuiz = () => {
    setShowQuizPrompt(false);
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 1000);
  };

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

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizActive(false);
    setShowQuizPrompt(false);

    const correctTechs = quizQuestions.filter((_, idx) => idx < score).map(q => q.technology);

    correctTechs.forEach((tech, index) => {
      flickerInTechnologies(tech, index * 100);
    });

    const incorrectTechs = technologies
      .filter(tech => !correctTechs.includes(tech.name))
      .map(tech => tech.name);

    incorrectTechs.forEach((tech, index) => {
      flickerInTechnologies(tech, 3000 + index * 100);
    });
  };

  // I see push and all I can think of is dj jikstra's shunting yard 😭
  const groupedTechnologies = technologies.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<string, Technology[]>
  );

  if (showQuizPrompt) {
    return (
      <div className="flex items-center justify-center h-full">
        <div
          className={`text-center space-y-4 p-6 rounded-lg border ${styles.window.content.border}`}
        >
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleAcceptQuiz}
              className={`px-4 py-2 rounded ${styles.technologies.quiz.button.primary}`}
            >
              Start :))
            </button>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRejectQuiz}
              className={`px-4 py-2 rounded border ${styles.technologies.quiz.button.secondary} ${styles.window.content.text}`}
            >
              Bruh 😭😭
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isQuizActive) {
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
            </p>{' '}
            <button
              onClick={resetQuiz}
              className={`px-4 py-2 rounded ${styles.technologies.quiz.button.primary}`}
            >
              View technologies
            </button>{' '}
          </div>
        </div>
      );
    }

    const question = quizQuestions[currentQuestion];
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${styles.window.content.textSecondary}`}>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className={`text-sm font-semibold ${styles.window.content.text}`}>
            Score: {score}
          </span>
        </div>

        <div className={`p-4 rounded-lg border ${styles.window.content.border}`}>
          <h3 className={`text-lg font-semibold mb-4 ${styles.window.content.text}`}>
            {question.question}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correctAns;
              const isSelected = selectedAnswer === index;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showIncorrect = selectedAnswer !== null && isSelected && !isCorrect;

              let buttonClasses = `w-full p-3 rounded text-left transition-all border ${styles.window.content.text}`;

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

  return (
    <div className="" role="main" aria-label="Technologies List">
      <div className={`border-b pb-3 ${styles.window.content.border}`}>
        <h2 className={`text-xl font-semibold ${styles.window.content.text}`}>
          Technologies Ive Used
        </h2>
      </div>

      {Object.entries(groupedTechnologies).map(([category, techs]) => (
        <div key={category} className="space-y-2">
          <h3 className={`font-semibold ${styles.window.content.text} text-sm`}>{category}</h3>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, index) => {
              const isVisible = !hasAttemptedQuiz || visibleTechs.has(tech.name);
              const isCurrentlyFlickering = flickeringTechs.has(tech.name);

              return (
                <div
                  key={index}
                  className={`px-3 py-1.5 rounded ${styles.technologies.tag.background} ${styles.technologies.tag.text} transition-opacity duration-100 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transition: isCurrentlyFlickering
                      ? 'opacity 50ms ease-in-out'
                      : 'opacity 100ms ease-in-out',
                  }}
                >
                  {tech.name}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className={`mt-4 pt-4 border-t ${styles.window.content.border}`}>
        <button
          onClick={() => handleRetryQuiz()}
          className={`text-sm ${styles.window.content.accent} hover:underline`}
        >
          {hasAttemptedQuiz ? 'Quiz again?' : 'Want to try the quiz?'}
        </button>
      </div>
    </div>
  );
}

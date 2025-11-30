import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import QuizPrompt from './QuizPrompt';
import Quiz from './Quiz';
import TechnologiesList from './TechnologiesList';

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

  const [showQuizPrompt, setShowQuizPrompt] = useState(true);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [hasAttemptedQuiz, setHasAttemptedQuiz] = useState(false);
  const [hasFinishedQuiz, setHasFinishedQuiz] = useState(false);
  const [hasSkippedQuiz, setHasSkippedQuiz] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const [visibleTechs, setVisibleTechs] = useState<Set<string>>(new Set());
  const [flickeringTechs, setFlickeringTechs] = useState<Set<string>>(new Set());
  const [correctlyAnsweredTechs, setCorrectlyAnsweredTechs] = useState<Set<string>>(new Set());
  const [incorrectlyAnsweredTechs, setIncorrectlyAnsweredTechs] = useState<Set<string>>(new Set());

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
    setCorrectlyAnsweredTechs(new Set());
  };

  const handleRetryQuiz = () => {
    setShowQuizPrompt(true);
    setIsQuizActive(false);
    setHasAttemptedQuiz(false);
    setHasFinishedQuiz(true);
    setHasSkippedQuiz(false);
    setVisibleTechs(new Set());
    setCorrectlyAnsweredTechs(new Set());
    setIncorrectlyAnsweredTechs(new Set());
  };

  const handleRejectQuiz = () => {
    setShowQuizPrompt(false);
    setHasAttemptedQuiz(true);
    setHasSkippedQuiz(true);
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 1000);
  };

  const handleAnswerCorrect = (technology: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectlyAnsweredTechs(prev => new Set(prev).add(technology));
    } else {
      setIncorrectlyAnsweredTechs(prev => new Set(prev).add(technology));
    }
    flickerInTechnologies(technology, 0);
  };

  const handleQuizComplete = (score: number) => {
    setIsQuizActive(false);
    setShowQuizPrompt(false);
    setHasSkippedQuiz(false);
    setHasFinishedQuiz(true);

    const incorrectTechs = technologies
      .filter(tech => !correctlyAnsweredTechs.has(tech.name))
      .map(tech => tech.name);

    incorrectTechs.forEach((tech, index) => {
      flickerInTechnologies(tech, 1000 + index * 100);
    });
  };

  return (
    <div className="space-y-4">
      {showQuizPrompt && (
        <QuizPrompt theme={theme} onAccept={handleAcceptQuiz} onReject={handleRejectQuiz} />
      )}

      {isQuizActive && (
        <Quiz
          theme={theme}
          quizQuestions={quizQuestions}
          onComplete={handleQuizComplete}
          onAnswerCorrect={handleAnswerCorrect}
        />
      )}

      <TechnologiesList
        theme={theme}
        technologies={technologies}
        hasAttemptedQuiz={hasAttemptedQuiz}
        hasFinishedQuiz={hasFinishedQuiz}
        hasSkippedQuiz={hasSkippedQuiz}
        visibleTechs={visibleTechs}
        flickeringTechs={flickeringTechs}
        correctlyAnsweredTechs={correctlyAnsweredTechs}
        incorrectlyAnsweredTechs={incorrectlyAnsweredTechs}
        onRetryQuiz={handleRetryQuiz}
      />
    </div>
  );
}

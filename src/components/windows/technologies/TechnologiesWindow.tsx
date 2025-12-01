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

interface QuizState {
  hasFinishedQuiz: boolean;
  hasSkippedQuiz: boolean;
  score: number;
  correctlyAnsweredTechs: string[];
  incorrectlyAnsweredTechs: string[];
  visibleTechs: string[];
}

export default function TechnologiesWindow() {
  const { theme } = useTheme();

  const [showQuizPrompt, setShowQuizPrompt] = useState(true);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [hasAttemptedQuiz, setHasAttemptedQuiz] = useState(false);
  const [hasFinishedQuiz, setHasFinishedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [hasSkippedQuiz, setHasSkippedQuiz] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const [visibleTechs, setVisibleTechs] = useState<Set<string>>(new Set());
  const [flickeringTechs, setFlickeringTechs] = useState<Set<string>>(new Set());
  const [correctlyAnsweredTechs, setCorrectlyAnsweredTechs] = useState<Set<string>>(new Set());
  const [incorrectlyAnsweredTechs, setIncorrectlyAnsweredTechs] = useState<Set<string>>(new Set());
  const [alreadyFlickeredTechs, setAlreadyFlickeredTechs] = useState<Set<string>>(new Set());

  const QUIZ_STATE_KEY = 'technologies-quiz-state';

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

  useEffect(() => {
    const savedState = localStorage.getItem(QUIZ_STATE_KEY);
    if (savedState) {
      try {
        const parsed: QuizState = JSON.parse(savedState);
        setHasFinishedQuiz(parsed.hasFinishedQuiz);
        setHasSkippedQuiz(parsed.hasSkippedQuiz);
        setQuizScore(parsed.score);
        setCorrectlyAnsweredTechs(new Set(parsed.correctlyAnsweredTechs));
        setIncorrectlyAnsweredTechs(new Set(parsed.incorrectlyAnsweredTechs));
        setVisibleTechs(new Set(parsed.visibleTechs));
        setHasAttemptedQuiz(parsed.hasFinishedQuiz || parsed.hasSkippedQuiz);

        if (parsed.hasFinishedQuiz || parsed.hasSkippedQuiz) {
          setShowQuizPrompt(false);

          parsed.visibleTechs.forEach((techName, index) => {
            flickerInTechnologies(techName, index * 100);
          });
        }
      } catch (error) {
        console.error('Failed to load quiz state:', error);
      }
    }
  }, []);

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
    setHasFinishedQuiz(false);
    setHasSkippedQuiz(false);
    setVisibleTechs(new Set());
    setCorrectlyAnsweredTechs(new Set());
    setIncorrectlyAnsweredTechs(new Set());

    localStorage.removeItem(QUIZ_STATE_KEY);
  };

  const handleRejectQuiz = () => {
    setShowQuizPrompt(false);
    setHasAttemptedQuiz(true);
    setHasSkippedQuiz(true);
    setIsFlickering(true);

    setTimeout(() => {
      setIsFlickering(false);

      const stateToSave: QuizState = {
        hasFinishedQuiz: false,
        hasSkippedQuiz: true,
        score: 0,
        correctlyAnsweredTechs: [],
        incorrectlyAnsweredTechs: [],
        visibleTechs: technologies.map(t => t.name),
      };
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateToSave));
    }, 1000);
  };

  const handleAnswerCorrect = (technology: string, isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectlyAnsweredTechs(prev => new Set(prev).add(technology));
      setQuizScore(prev => prev + 1);
    } else {
      setIncorrectlyAnsweredTechs(prev => new Set(prev).add(technology));
    }
    flickerInTechnologies(technology, 0);
  };

  const handleQuizComplete = () => {
    setIsQuizActive(false);
    setShowQuizPrompt(false);
    setHasSkippedQuiz(false);
    setHasFinishedQuiz(true);

    const askedTechs = new Set(quizQuestions.map(q => q.technology));

    const unansweredTechs = technologies
      .filter(tech => !askedTechs.has(tech.name))
      .map(tech => tech.name);

    unansweredTechs.forEach((tech, index) => {
      flickerInTechnologies(tech, 1000 + index * 100);
    });

    setTimeout(() => {
      const stateToSave: QuizState = {
        hasFinishedQuiz: true,
        hasSkippedQuiz: false,
        score: quizScore,
        correctlyAnsweredTechs: Array.from(correctlyAnsweredTechs),
        incorrectlyAnsweredTechs: Array.from(incorrectlyAnsweredTechs),
        visibleTechs: Array.from(
          new Set([
            ...Array.from(correctlyAnsweredTechs),
            ...Array.from(incorrectlyAnsweredTechs),
            ...unansweredTechs,
          ])
        ),
      };
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(stateToSave));
    }, 3000);
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
        quizScore={quizScore}
        totalQuestions={quizQuestions.length}
        onRetryQuiz={handleRetryQuiz}
      />
    </div>
  );
}

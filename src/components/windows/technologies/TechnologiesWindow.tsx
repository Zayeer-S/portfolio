import { useTheme } from '@/contexts/ThemeContext';
import { useCallback, useEffect, useState } from 'react';
import Quiz from './Quiz';
import TechnologiesList from './TechnologiesList';
import { technologies, quizQuestions } from './TechnologyData';
import { QuizState, clearQuizState, loadQuizState, saveQuizState } from './quizStorage';
import { UseFlickerAnimation } from './UseFlickerAnimation';

export default function TechnologiesWindow() {
  const { theme } = useTheme();

  const [showQuizPrompt, setShowQuizPrompt] = useState(true);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [hasAttemptedQuiz, setHasAttemptedQuiz] = useState(false);
  const [hasFinishedQuiz, setHasFinishedQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [hasSkippedQuiz, setHasSkippedQuiz] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const [correctlyAnsweredTechs, setCorrectlyAnsweredTechs] = useState<Set<string>>(new Set());
  const [incorrectlyAnsweredTechs, setIncorrectlyAnsweredTechs] = useState<Set<string>>(new Set());
  const [isResetting, setIsResetting] = useState(false);

  const {
    visibleTechs,
    flickeringTechs,
    flickerInTechnology,
    flickerInMultipleTechnologies,
    resetFlicker,
  } = UseFlickerAnimation();

  useEffect(() => {
    if (isFlickering) {
      flickerInMultipleTechnologies(
        technologies.map(t => t.name),
        100
      );
    }
  }, [isFlickering, flickerInMultipleTechnologies]);

  useEffect(() => {
    const parsed = loadQuizState();
    if (parsed) {
      try {
        setHasFinishedQuiz(parsed.hasFinishedQuiz);
        setHasSkippedQuiz(parsed.hasSkippedQuiz);
        setQuizScore(parsed.score);
        setCorrectlyAnsweredTechs(new Set(parsed.correctlyAnsweredTechs));
        setIncorrectlyAnsweredTechs(new Set(parsed.incorrectlyAnsweredTechs));
        setHasAttemptedQuiz(parsed.hasFinishedQuiz || parsed.hasSkippedQuiz);

        if (parsed.hasFinishedQuiz || parsed.hasSkippedQuiz) {
          setShowQuizPrompt(false);

          setTimeout(() => {
            parsed.visibleTechs.forEach((techName, index) => {
              flickerInTechnology(techName, index * 100);
            });
          }, 50);
        }
      } catch (error) {
        console.error('Failed to load quiz state:', error);
      }
    }
  }, [flickerInTechnology]);

  useEffect(() => {
    if (hasFinishedQuiz && !isQuizActive) {
      const askedTechs = new Set(quizQuestions.map(q => q.technology));
      const unansweredTechs = technologies
        .filter(tech => !askedTechs.has(tech.name))
        .map(tech => tech.name);

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
      saveQuizState(stateToSave);
    }
  }, [hasFinishedQuiz, isQuizActive, quizScore, correctlyAnsweredTechs, incorrectlyAnsweredTechs]);

  const handleAcceptQuiz = () => {
    setShowQuizPrompt(false);
    setIsQuizActive(true);
    setHasAttemptedQuiz(true);
    resetFlicker();
    setCorrectlyAnsweredTechs(new Set());
    setIncorrectlyAnsweredTechs(new Set());
  };

  const handleRetryQuiz = () => {
    setIsResetting(true);
    setShowQuizPrompt(true);
    setIsQuizActive(false);
    setHasAttemptedQuiz(false);
    setHasFinishedQuiz(false);
    setHasSkippedQuiz(false);
    setQuizScore(0);
    resetFlicker();
    setCorrectlyAnsweredTechs(new Set());
    setIncorrectlyAnsweredTechs(new Set());

    clearQuizState();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsResetting(false);
      });
    });
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
      saveQuizState(stateToSave);
    }, 1000);
  };

  const handleAnswerCorrect = useCallback(
    (technology: string, isCorrect: boolean) => {
      if (isCorrect) {
        setCorrectlyAnsweredTechs(prev => new Set(prev).add(technology));
        setQuizScore(prev => prev + 1);
      } else {
        setIncorrectlyAnsweredTechs(prev => new Set(prev).add(technology));
      }
      flickerInTechnology(technology, 0);
    },
    [flickerInTechnology]
  );

  const handleQuizComplete = useCallback(() => {
    setIsQuizActive(false);
    setShowQuizPrompt(false);
    setHasSkippedQuiz(false);
    setHasFinishedQuiz(true);

    const askedTechs = new Set(quizQuestions.map(q => q.technology));

    const unansweredTechs = technologies
      .filter(tech => !askedTechs.has(tech.name))
      .map(tech => tech.name);

    unansweredTechs.forEach((tech, index) => {
      flickerInTechnology(tech, 1000 + index * 100);
    });
  }, [flickerInTechnology]);

  return (
    <main
      className="space-y-4 sm:space-y-5"
      role="application"
      aria-label="Technologies quiz application"
    >
      <Quiz
        theme={theme}
        quizQuestions={quizQuestions}
        onComplete={handleQuizComplete}
        onAnswerCorrect={handleAnswerCorrect}
        onRetryQuiz={handleRetryQuiz}
        onAcceptQuiz={handleAcceptQuiz}
        onRejectQuiz={handleRejectQuiz}
        showPrompt={showQuizPrompt}
        isActive={isQuizActive}
        hasFinished={hasFinishedQuiz}
        hasSkipped={hasSkippedQuiz}
        quizScore={quizScore}
      />

      <TechnologiesList
        theme={theme}
        technologies={technologies}
        hasAttemptedQuiz={hasAttemptedQuiz}
        visibleTechs={visibleTechs}
        flickeringTechs={flickeringTechs}
        correctlyAnsweredTechs={correctlyAnsweredTechs}
        incorrectlyAnsweredTechs={incorrectlyAnsweredTechs}
        isResetting={isResetting}
      />
    </main>
  );
}

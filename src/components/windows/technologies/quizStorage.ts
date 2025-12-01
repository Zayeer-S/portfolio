export interface QuizState {
  hasFinishedQuiz: boolean;
  hasSkippedQuiz: boolean;
  score: number;
  correctlyAnsweredTechs: string[];
  incorrectlyAnsweredTechs: string[];
  visibleTechs: string[];
}

const QUIZ_STATE_KEY = 'technologies-quiz-state';

export const saveQuizState = (state: QuizState): void => {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save quiz state:', error);
  }
};

export const loadQuizState = (): QuizState | null => {
  try {
    const savedState = localStorage.getItem(QUIZ_STATE_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return null;
  } catch (error) {
    console.error('Failed to load quiz state:', error);
    return null;
  }
};

export const clearQuizState = (): void => {
  try {
    localStorage.removeItem(QUIZ_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear quiz state:', error);
  }
};

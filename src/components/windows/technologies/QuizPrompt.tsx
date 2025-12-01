import { getThemeClasses } from '@/styles/themes';
import { Theme } from '@/contexts/ThemeContext';

interface QuizPromptProps {
  theme: Theme;
  onAccept: () => void;
  onReject: () => void;
}

export default function QuizPrompt({ theme, onAccept, onReject }: QuizPromptProps) {
  const styles = getThemeClasses(theme);

  return (
    <section
      className={`p-4 sm:p-5 md:p-6 rounded-lg border ${styles.window.content.border}`}
      role="region"
      aria-label="Quiz prompt"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`flex-1 text-center ${styles.window.content.text}`}>
          <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl">Quiz?</h3>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={onAccept}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded ${styles.technologies.quiz.button.primary}`}
            aria-label="Start quiz"
          >
            Start
          </button>
          <button
            onClick={onReject}
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

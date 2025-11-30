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
    <div className={`p-4 rounded-lg border ${styles.window.content.border}`}>
      <div className="flex items-center justify-between gap-4">
        <div className={`flex-1 text-center ${styles.window.content.text}`}>
          <h3 className="font-semibold text-xl">Quiz?</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onAccept}
            className={`px-4 py-2 rounded ${styles.technologies.quiz.button.primary}`}
          >
            Start
          </button>
          <button
            onClick={onReject}
            className={`px-4 py-2 rounded border ${styles.technologies.quiz.button.secondary} ${styles.window.content.text}`}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

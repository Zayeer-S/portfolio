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
    <div className="flex items-center justify-center h-full">
      <div
        className={`text-center space-y-4 p-6 rounded-lg border ${styles.window.content.border}`}
      >
        <div className="flex gap-3 justify-center">
          <button
            onClick={onAccept}
            className={`px-4 py-2 rounded ${styles.technologies.quiz.button.primary}`}
          >
            Start :))
          </button>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onReject}
            className={`px-4 py-2 rounded border ${styles.technologies.quiz.button.secondary} ${styles.window.content.text}`}
          >
            Bruh 😭😭
          </button>
        </div>
      </div>
    </div>
  );
}

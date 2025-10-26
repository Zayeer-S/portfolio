import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function ProjectsWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  return (
    <div className="space-y-4">
      <div className={`flex items-center space-x-2 border-b pb-2 ${styles.window.content.border}`}>
        <span className={`text-sm ${styles.window.content.text}`}>📂 Projects</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`border rounded p-3 ${styles.window.content.border} ${styles.window.content.hover} cursor-pointer transition-colors`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🤖</span>
            <span className={`font-medium ${styles.window.content.text}`}>EpochAI</span>
          </div>
          <p className={`text-xs ${styles.window.content.textSecondary}`}>
            AI prediction system with ML models
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">Python</span>
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">Flask</span>
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">React</span>
          </div>
        </div>

        <div
          className={`border rounded p-3 ${styles.window.content.border} ${styles.window.content.hover} cursor-pointer transition-colors`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🏢</span>
            <span className={`font-medium ${styles.window.content.text}`}>LuckyNest</span>
          </div>
          <p className={`text-xs ${styles.window.content.textSecondary}`}>
            Guest management system
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">PHP</span>
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">MySQL</span>
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">Stripe</span>
            <span className="text-xs bg-blue-100 px-1 rounded text-blue-800">2FA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

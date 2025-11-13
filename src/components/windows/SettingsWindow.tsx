import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function SettingsWindow() {
  const { theme, setTheme } = useTheme();
  const styles = getThemeClasses(theme);

  const themes = [
    {
      value: 'modern-light',
      label: 'Light Mode',
    },
    { value: 'modern-dark', label: 'Dark Mode' },
    { value: 'classic', label: 'Windows 7' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className={`border-b pb-4 ${styles.window.content.border}`}>
        <h2 className={`text-xl font-semibold ${styles.window.content.text}`}>Theme Settings</h2>
      </div>

      <div>
        <div className="space-y-3">
          {themes.map(themeOption => (
            <div
              key={themeOption.value}
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                theme === themeOption.value
                  ? `border-blue-500 ${theme === 'modern-dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`
                  : `${styles.window.content.border} ${styles.window.content.hover}`
              }`}
              onClick={() => setTheme(themeOption.value)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${styles.window.content.text}`}>
                    {themeOption.label}
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    theme === themeOption.value
                      ? 'border-blue-500 bg-blue-500'
                      : styles.window.content.border
                  }`}
                >
                  {theme === themeOption.value && (
                    <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

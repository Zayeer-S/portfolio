import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsWindow() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'modern-light', label: 'Modern Light', description: 'Clean and bright Windows 11 style' },
    { value: 'modern-dark', label: 'Modern Dark', description: 'Sleek dark Windows 11 style' },
    { value: 'classic', label: 'Classic', description: 'Nostalgic Windows 7 style' }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Theme Settings</h2>
      </div>

      <div>
        <div className="space-y-3">
          {themes.map((themeOption) => (
            <div
              key={themeOption.value}
              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                theme === themeOption.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onClick={() => setTheme(themeOption.value)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{themeOption.label}</div>
                  <div className="text-sm text-gray-600">{themeOption.description}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  theme === themeOption.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
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
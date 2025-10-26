import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function CreditsWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const iconCredits = [
    {
      name: 'Email Icon',
      filename: 'mail-modern.png',
      author: 'justicon',
      link: 'https://www.flaticon.com/free-icons/email',
    },
    {
      name: 'Calculator Icon',
      filename: 'calculator-modern.png',
      author: 'Freepik',
      link: 'https://www.flaticon.com/free-icons/calculator',
    },
    {
      name: 'Folder Icon (Closed)',
      filename: 'closed-folder-modern.png',
      author: 'kmg design',
      link: 'https://www.flaticon.com/free-icons/folder',
    },
    {
      name: 'Open Folder Icon',
      filename: 'open-folder-modern.png',
      author: 'NajmunNahar',
      link: 'https://www.flaticon.com/free-icons/open-folder',
    },
    {
      name: 'Digital Transformation Icon',
      filename: 'technologies-modern.png',
      author: 'Dewi Sari',
      link: 'https://www.flaticon.com/free-icons/digital-transformation',
    },
    {
      name: 'Notepad Icon',
      filename: 'notepad-modern.png',
      author: 'Flat Icons',
      link: 'https://www.flaticon.com/free-icons/notepad',
    },
    {
      name: 'CV Icon',
      filename: 'cv-modern.png',
      author: 'Freepik',
      link: 'https://www.flaticon.com/free-icons/cv',
    },
    {
      name: 'Settings Icon',
      filename: 'settings-modern.png',
      author: 'Freepik',
      link: 'https://www.flaticon.com/free-icons/settings',
    },
    {
      name: 'Letter Z Icon',
      filename: 'start-menu-symbol-modern.png',
      author: 'popo2021',
      link: 'https://www.flaticon.com/free-icons/letter-z',
    },
  ];

  return (
    <div className="space-y-6">
      <div className={`border-b pb-4 ${styles.window.content.border}`}>
        <h2 className={`text-xl font-semibold ${styles.window.content.text}`}>
          Credits & Attributions
        </h2>
        <p className={`text-sm ${styles.window.content.textSecondary} mt-2`}>
          Icons used in this portfolio are from flaticon.com
        </p>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-lg border ${styles.window.content.border}`}>
          <h3 className={`font-semibold ${styles.window.content.text} mb-2`}>Flaticon License</h3>
          <p className={`text-sm ${styles.window.content.textSecondary} leading-relaxed`}>
            Icons made by various authors from{' '}
            <a
              href="https://www.flaticon.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.window.content.accent} hover:underline`}
            >
              www.flaticon.com
            </a>{' '}
            are licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.window.content.accent} hover:underline`}
            >
              CC 3.0 BY
            </a>
          </p>
        </div>

        <div>
          <h3 className={`font-semibold ${styles.window.content.text} mb-3`}>
            Individual Icon Credits
          </h3>
          <div className="space-y-3">
            {iconCredits.map((credit, index) => (
              <div
                key={index}
                className={`p-3 rounded border ${styles.window.content.border} ${styles.window.content.hover} transition-colors`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className={`font-medium ${styles.window.content.text} text-sm`}>
                      {credit.name}
                    </h4>
                    <p className={`text-xs ${styles.window.content.textMuted} mt-1`}>
                      {credit.filename}
                    </p>
                    <p className={`text-xs ${styles.window.content.textSecondary} mt-1`}>
                      Created by {credit.author}
                    </p>
                  </div>
                  <a
                    href={credit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs ${styles.window.content.accent} hover:underline ml-3 flex-shrink-0`}
                  >
                    View Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${styles.window.content.border} bg-opacity-50`}>
          <h3 className={`font-semibold ${styles.window.content.text} mb-2`}>React Icons</h3>
          <p className={`text-sm ${styles.window.content.textSecondary} leading-relaxed`}>
            Power and reload icons are from{' '}
            <a
              href="https://react-icons.github.io/react-icons/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.window.content.accent} hover:underline`}
            >
              React Icons
            </a>{' '}
            (Font Awesome) - MIT Licensed
          </p>
        </div>
      </div>
    </div>
  );
}

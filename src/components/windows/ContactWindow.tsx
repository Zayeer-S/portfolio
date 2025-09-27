import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function ContactWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  return (
    <div className="space-y-4">
      <h3 className={`font-bold ${styles.window.content.text}`}>Get In Touch</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <span className="text-lg">📧</span>
          <a href="mailto:zayeersultan@gmail.com" className={`${styles.window.content.accent} hover:underline`}>
            zayeersultan@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-lg">📞</span>
          <a href="tel:+447747125772" className={`${styles.window.content.accent} hover:underline`}>
            +44 7747 125772
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-lg">💼</span>
          <a href="https://linkedin.com/in/zayeer" target="_blank" className={`${styles.window.content.accent} hover:underline`}>
            LinkedIn Profile
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-lg">💻</span>
          <a href="https://github.com/Zayeer-S" target="_blank" className={`${styles.window.content.accent} hover:underline`}>
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
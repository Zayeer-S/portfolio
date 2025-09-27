import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function TechnologiesWindow() {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  return (
    <div className="space-y-6">
      <div className={`text-center border-b pb-3 ${styles.window.content.border}`}>
        <h2 className={`text-lg font-bold ${styles.window.content.text}`}>Technical Skills & Tools</h2>
        <p className={`text-sm ${styles.window.content.textSecondary}`}>Technologies I work with</p>
      </div>

      <div className="space-y-4">
        {/* Programming Languages */}
        <div>
          <h3 className={`font-semibold ${styles.window.content.text} mb-3 flex items-center`}>
            <span className="text-lg mr-2">💻</span>
            Programming Languages
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐍</div>
              <div className="text-xs font-medium text-blue-800">Python</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">📜</div>
              <div className="text-xs font-medium text-yellow-800">JavaScript</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">📷</div>
              <div className="text-xs font-medium text-blue-800">TypeScript</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-medium text-purple-800">C++</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">#️⃣</div>
              <div className="text-xs font-medium text-green-800">C#</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🔧</div>
              <div className="text-xs font-medium text-gray-800">C</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐘</div>
              <div className="text-xs font-medium text-purple-800">PHP</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🗃️</div>
              <div className="text-xs font-medium text-blue-800">SQL</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">📄</div>
              <div className="text-xs font-medium text-orange-800">HTML/CSS</div>
            </div>
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div>
          <h3 className={`font-semibold ${styles.window.content.text} mb-3 flex items-center`}>
            <span className="text-lg mr-2">🛠️</span>
            Frameworks & Libraries
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-cyan-50 border border-cyan-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">⚛️</div>
              <div className="text-xs font-medium text-cyan-800">React</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🟢</div>
              <div className="text-xs font-medium text-green-800">Node.js</div>
            </div>
            <div className="bg-black text-white border border-gray-300 rounded p-2 text-center">
              <div className="text-2xl mb-1">▲</div>
              <div className="text-xs font-medium">Next.js</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🌶️</div>
              <div className="text-xs font-medium text-gray-800">Flask</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">💨</div>
              <div className="text-xs font-medium text-blue-800">Tailwind</div>
            </div>
          </div>
        </div>

        {/* Tools & Cloud */}
        <div>
          <h3 className={`font-semibold ${styles.window.content.text} mb-3 flex items-center`}>
            <span className="text-lg mr-2">☁️</span>
            Tools & Cloud
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐙</div>
              <div className="text-xs font-medium text-orange-800">Git/GitHub</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐳</div>
              <div className="text-xs font-medium text-blue-800">Docker</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">☁️</div>
              <div className="text-xs font-medium text-yellow-800">AWS</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🔮</div>
              <div className="text-xs font-medium text-orange-800">Postman</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐘</div>
              <div className="text-xs font-medium text-blue-800">PostgreSQL</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🗄️</div>
              <div className="text-xs font-medium text-blue-800">MySQL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
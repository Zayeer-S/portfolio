export default function TechnologiesWindow() {
  return (
    <div className="space-y-6">
      <div className="text-center border-b pb-3">
        <h2 className="text-lg font-bold text-gray-800">Technical Skills & Tools</h2>
        <p className="text-sm text-gray-600">Technologies I work with</p>
      </div>

      <div className="space-y-4">
        {/* Programming Languages */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-lg mr-2">💻</span>
            Programming Languages
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐍</div>
              <div className="text-xs font-medium">Python</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">📜</div>
              <div className="text-xs font-medium">JavaScript</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🔷</div>
              <div className="text-xs font-medium">TypeScript</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-medium">C++</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">#️⃣</div>
              <div className="text-xs font-medium">C#</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🔧</div>
              <div className="text-xs font-medium">C</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐘</div>
              <div className="text-xs font-medium">PHP</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🗃️</div>
              <div className="text-xs font-medium">SQL</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">📄</div>
              <div className="text-xs font-medium">HTML/CSS</div>
            </div>
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-lg mr-2">🛠️</span>
            Frameworks & Libraries
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-cyan-50 border border-cyan-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">⚛️</div>
              <div className="text-xs font-medium">React</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🟢</div>
              <div className="text-xs font-medium">Node.js</div>
            </div>
            <div className="bg-black text-white border border-gray-300 rounded p-2 text-center">
              <div className="text-2xl mb-1">▲</div>
              <div className="text-xs font-medium">Next.js</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🌶️</div>
              <div className="text-xs font-medium">Flask</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">💨</div>
              <div className="text-xs font-medium">Tailwind</div>
            </div>
          </div>
        </div>

        {/* Tools & Cloud */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="text-lg mr-2">☁️</span>
            Tools & Cloud
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐙</div>
              <div className="text-xs font-medium">Git/GitHub</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐳</div>
              <div className="text-xs font-medium">Docker</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">☁️</div>
              <div className="text-xs font-medium">AWS</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">📮</div>
              <div className="text-xs font-medium">Postman</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🐘</div>
              <div className="text-xs font-medium">PostgreSQL</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
              <div className="text-2xl mb-1">🗄️</div>
              <div className="text-xs font-medium">MySQL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
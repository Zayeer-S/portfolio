export default function ProjectsWindow() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 border-b pb-2">
        <span className="text-sm">📁 Projects</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🤖</span>
            <span className="font-medium">EpochAI</span>
          </div>
          <p className="text-xs text-gray-600">AI prediction system with ML models</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs bg-blue-100 px-1 rounded">Python</span>
            <span className="text-xs bg-blue-100 px-1 rounded">Flask</span>
            <span className="text-xs bg-blue-100 px-1 rounded">React</span>
          </div>
        </div>
        
        <div className="border rounded p-3 hover:bg-gray-50 cursor-pointer">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-2xl">🏢</span>
            <span className="font-medium">LuckyNest</span>
          </div>
          <p className="text-xs text-gray-600">Guest management system</p>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-xs bg-blue-100 px-1 rounded">PHP</span>
            <span className="text-xs bg-blue-100 px-1 rounded">MySQL</span>
            <span className="text-xs bg-blue-100 px-1 rounded">Stripe</span>
            <span className="text-xs bg-blue-100 px-1 rounded">2FA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
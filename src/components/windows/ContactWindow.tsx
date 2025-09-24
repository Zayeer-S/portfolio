export default function ContactWindow() {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-800">Get In Touch</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <span className="text-lg">📧</span>
          <a href="mailto:zayeersultan@gmail.com" className="text-blue-600 hover:underline">
            zayeersultan@gmail.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-lg">📞</span>
          <a href="tel:+447747125772" className="text-blue-600 hover:underline">
            +44 7747 125772
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-lg">💼</span>
          <a href="https://linkedin.com/in/zayeer" target="_blank" className="text-blue-600 hover:underline">
            LinkedIn Profile
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-lg">💻</span>
          <a href="https://github.com/Zayeer-S" target="_blank" className="text-blue-600 hover:underline">
            GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
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
      
      <div className="mt-6 pt-4 border-t">
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded text-sm"
          />
          <textarea
            placeholder="Your Message"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
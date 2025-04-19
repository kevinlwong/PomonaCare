import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="font-heading w-full bg-gray-700 text-white py-4 px-6 fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Area - Left side */}
        <Link to="/" className="text-xl font-bold">
          <span className="text-white">POMONA CARE AI</span>
        </Link>

        {/* Navigation Links - Right side */}
        <div className="flex items-center space-x-8">
          <Link
            to="/ChatBot"
            className="text-indigo-400 hover:text-purple-300 transition-colors duration-200"
          >
            Chatbot
          </Link>
          <Link
            to="/TranslateDocuments"
            className="text-indigo-400 hover:text-purple-300 transition-colors duration-200"
          >
            Document Translator
          </Link>
          <Link
            to="/SymptomToCare"
            className="text-indigo-400 hover:text-purple-300 transition-colors duration-200"
          >
            Symptom Checker
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

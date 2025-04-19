import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';


function NavBar() {
  return (
    <nav className="font-heading w-full bg-gray-100 dark:bg-gray-700 text-white dark:text-indigo-400 py-4 px-6 fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Area - Left side */}
        <Link to="/" className="text-xl font-bold">
          <span className="dark:text-indigo-400 ">POMONA CARE AI</span>
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

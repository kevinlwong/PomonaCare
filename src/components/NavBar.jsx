import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="w-full bg-white-900 text-white py-4 px-6 fixed top-0 right-0 flex justify-end shadow-md z-50">
      <ul className="flex gap-6">
        <li>
          <Link to="/ChatBot" className="hover:text-blue-400 transition-colors">
            Chatbot
          </Link>
        </li>
        <li>
          <Link to="/TranslateDocuments" className="hover:text-blue-400 transition-colors">
            Document Translator
          </Link>
        </li>
        <li>
          <Link to="/SymptomToCare" className="hover:text-blue-400 transition-colors">
            Symptom Checker
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

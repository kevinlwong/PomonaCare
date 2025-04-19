import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import TranslateDocuments from './Pages/TranslateDocuments';
import SymptomToCare from './Pages/SymptomToCare';
import Chatbot from './components/Chatbot';
import NavBar from './components/NavBar';

function AppContent() {

  return (
    <div className="App">
      {<NavBar />}

      <div className="pt-18">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ChatBot" element={<Chatbot />} />
          <Route path="/TranslateDocuments" element={<TranslateDocuments />} />
          <Route path="/SymptomToCare" element={<SymptomToCare />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


import "./App.css";
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TranslateDocuments from './Pages/TranslateDocuments';
import SymptomToCare from './Pages/SymptomToCare';
import Chatbot from './components/Chatbot';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <Home/> 
        <NavBar />
        <div className="pt-16 px-4">
          <Routes>
            <Route path="/Chatbot" element={<Chatbot />} />
            <Route path="/TranslateDocuments" element={<TranslateDocuments />} />
            <Route path="/SymptomToCare" element={<SymptomToCare />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

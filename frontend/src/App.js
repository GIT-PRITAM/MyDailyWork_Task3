import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizCreation from './components/QuizCreation';
import QuizListing from './components/QuizListing';
import QuizTaking from './components/QuizTaking';
import QuizResults from './components/QuizResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<QuizCreation />} />
        <Route path="/quizzes" element={<QuizListing />} />
        <Route path="/take-quiz/:id" element={<QuizTaking />} />
        <Route path="/results" element={<QuizResults />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import TeamProfile from './pages/teamprofile'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/:id" element={<TeamProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
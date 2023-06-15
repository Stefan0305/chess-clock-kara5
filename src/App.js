import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components

// pages
import Home from './pages/Home/Home';
import Clock from './pages/Clock/Clock';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="new-game" element={<Clock />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path='register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

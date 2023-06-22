import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from 'react';

// components
import { TimeContext } from './context/TimeContext';

// pages
import Home from './pages/Home/Home';
import Clock from './pages/Clock/Clock';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Register from './pages/Register/Register';

function App() {

  const [mode, setMode] = useState()

  return (
    <div>
      <BrowserRouter>
        <TimeContext.Provider value={{ mode, setMode }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new-game" element={<Clock />}>
              <Route path="update-results/:winner&loser" />
            </Route>
            <Route path="leaderboard" element={<Leaderboard />}>
              <Route path="player/:id" />
            </Route>
            <Route path='register' element={<Register />} />
          </Routes>
        </TimeContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

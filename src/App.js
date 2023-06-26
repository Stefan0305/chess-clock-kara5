import logo from './logo.svg'; 
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';

// components
import { TimeContext } from './context/TimeContext';

// pages
import Home from './pages/Home/Home';
import Clock from './pages/Clock/Clock';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Register from './pages/Register/Register';

function App() {

  const [mode, setMode] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://chess-clock-kara5-backend.onrender.com/leaderboard`)
            .then(response => response.json())
            .then(data => {
                console.log("Ping server every 14 minutes")
            })
    }, 840000);
    return () => clearInterval(interval);
  }, []);

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

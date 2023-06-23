import { useContext, useEffect } from 'react';
import { TimeContext } from '../../context/TimeContext'
import { Link } from 'react-router-dom';

export default function Home() {

    const { mode, setMode } = useContext(TimeContext)

    return <div className='container py-4'>
        <div>
            <Link to="https://kara5.com"><img src="/favicon.png" alt="[kara5 Logo here]" /></Link>
        </div>
        <div className="w-100">
            <Link to="new-game" className="home-btn" onClick={() => setMode(600)}>Start game <br /> (default: 10 min)</Link>
        </div>
        <div className="d-flex justify-content-between gap-3">
            <div className="w-100"><Link to="new-game" className="home-btn secondary-btn" onClick={() => setMode(120)}>2 min</Link></div>
            <div className="w-100"><Link to="new-game" className="home-btn secondary-btn" onClick={() => setMode(300)}>5 min</Link></div>
            <div className="w-100"><Link to="new-game" className="home-btn secondary-btn" onClick={() => setMode(900)}>15 min</Link></div>
            <div className="w-100"><Link to="new-game" className="home-btn secondary-btn" onClick={() => setMode(5)}>test mode</Link></div>
        </div>
        <div className="d-flex justify-content-between gap-3">
            <div className="w-100"><Link to="leaderboard" className='home-btn'>Leaderboard</Link></div>
            <div className="w-100"><Link to="register" className='home-btn'>Register new player</Link></div>
        </div>
    </div>
}
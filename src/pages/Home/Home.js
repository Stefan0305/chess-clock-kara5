import { useContext, useEffect } from 'react';
import { TimeContext } from '../../context/TimeContext'
import { Link } from 'react-router-dom';

export default function Home() {

    const {mode, setMode} = useContext(TimeContext)

    return <div>
        <div>
        <Link to="https://kara5.com"><img src="" alt="[kara5 Logo here]" /></Link>
        </div>
        <div className="button-cont"><Link to="new-game" className="home-btn" onClick={() => setMode(600)}>Start game <br /> (default: 10 min)</Link></div>
        <div className="button-cont"><Link to="new-game" className="home-btn"  onClick={() => setMode(120)}>2 min</Link></div>
        <div className="button-cont"><Link to="new-game" className="home-btn" onClick={() => setMode(300)}>5 min</Link></div>
        <div className="button-cont"><Link to="new-game" className="home-btn" onClick={() => setMode(900)}>15 min</Link></div>
        <div className="button-cont"><Link to="new-game" className="home-btn" onClick={() => setMode(5)}>test mode</Link></div>
        <div className="button-cont"><Link to="leaderboard">Leaderboard</Link></div>
        <div className="button-cont"><Link to="register">Register new player</Link></div>
    </div>
}
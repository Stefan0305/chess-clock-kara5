import { useEffect, useRef, useState, useContext } from "react"
import { TimeContext } from "../../context/TimeContext";
import { Link, useNavigate } from 'react-router-dom';

// components
import PlayerPicker from "../../components/PlayerPicker/PlayerPicker";

export default function Clock() {

    const { mode, setMode } = useContext(TimeContext)
    const [clock1, setClock1] = useState(mode)
    const [clock2, setClock2] = useState(mode)
    const [changeTurn, setChangeTurn] = useState(0)
    const [lastTurn, setLastTurn] = useState(0)
    const [gameReady, setGameReady] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [player1name, setPlayer1name] = useState()
    const [player2name, setPlayer2name] = useState()
    const [player1ID, setPlayer1ID] = useState()
    const [player2ID, setPlayer2ID] = useState()
    const [winner, setWinner] = useState()
    const [loser, setLoser] = useState()
    const [winnerName, setWinnerName] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        let interval;
        if (changeTurn === 1) {
            interval = setInterval(() => {
                setClock1(prevClock1 => prevClock1 - 1)
            }, 1000);
        }
        else if (changeTurn === 2) {
            interval = setInterval(() => {
                setClock2(prevClock2 => prevClock2 - 1)
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [changeTurn])

    useEffect(() => {
        if (clock1 <= 0) {
            setChangeTurn(0)
            setWinner(player2ID)
            setLoser(player1ID)
            setWinnerName(player2name)
            setGameOver(true)
        }
        if (clock2 <= 0) {
            setChangeTurn(0)
            setWinner(player1ID)
            setLoser(player2ID)
            setWinnerName(player1name)
            setGameOver(true)
        }
    }, [clock1, clock2])

    useEffect(() => {
        if (gameOver === true) {
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            };
            fetch(`https://chess-clock-kara5-backend.onrender.com/new-game/update-results/?winner=${winner}&loser=${loser}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
        }
    }, [gameOver])

    function togglePause() {
        if (changeTurn === 0) {
            setChangeTurn(lastTurn)
        } else {
            setChangeTurn(0)
        }
    }

    function quitGame() {
        if (window.confirm("Are you sure you want to quit? Points will not be scored")) {
            navigate('/')
        }
    }

    function convertTime(sec) {
        let minutes = Math.floor(sec / 60)
        let seconds = sec % 60

        return `${minutes}:${seconds}`
    }



    return <div>
        {
            gameReady ?
                <div className="clock bg-dark vh-100 vw-100 p-3 d-flex flex-column gap-3 justify-content-between">
                    <button className={'clock-btn clock-btn-reversed flex-fill btn ' + (changeTurn === 1 ? 'btn-primary' : 'btn-light')} onClick={() => { setChangeTurn(2); setLastTurn(2) }}>
                        <h5>{player1name}</h5>
                        <p className="p-0 m-0">{convertTime(clock1)}</p>
                    </button>
                    <div className="d-flex gap-3 justify-content-between">
                        <button className="p-3 btn btn-warning flex-grow-1" onClick={() => { togglePause() }}>Pause game!</button>
                        <button className="p-3 btn btn-danger" onClick={() => { quitGame() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                            </svg>
                        </button>
                    </div>
                    <button className={'clock-btn flex-fill btn ' + (changeTurn === 2 ? 'btn-primary' : 'btn-light')} onClick={() => { setChangeTurn(1); setLastTurn(1) }}>
                        <h5>{player2name}</h5>
                        <p className="p-0 m-0">{convertTime(clock2)}</p>
                    </button>
                </div>
                :
                <PlayerPicker setGameReady={setGameReady} player1name={player1name} player2name={player2name} setPlayer1name={setPlayer1name} setPlayer2name={setPlayer2name} setPlayer1ID={setPlayer1ID} setPlayer2ID={setPlayer2ID} />
        }
        {
            gameOver ?
                <div className="winner-overlay position-fixed vw-100 vh-100">
                    <p>Winner is {winnerName} !!!</p>
                    <Link to="/" className="btn btn-warning d-inline-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                        <p className="p-0 m-0">Home</p>
                    </Link>
                </div>
                :
                null
        }
    </div>
}
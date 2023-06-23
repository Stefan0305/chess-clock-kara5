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
            setGameOver(true)
        }
        if (clock2 <= 0) {
            setChangeTurn(0)
            setWinner(player1ID)
            setLoser(player2ID)
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

    useEffect(() => {
        console.log(changeTurn)
    }, [changeTurn])


    return <div>
        {gameReady ?
            <div className="clock bg-dark vh-100 vw-100 p-3 d-flex flex-column gap-3 justify-content-between">
                <button className={'flex-fill btn ' + (changeTurn === 1 ? 'btn-primary' : 'btn-light')} onClick={() => { setChangeTurn(2); setLastTurn(2) }}>{convertTime(clock1)}</button>
                <div className="d-flex gap-3 justify-content-between">
                    <button className="p-3 btn btn-warning flex-grow-1" onClick={() => { togglePause() }}>Pause game!</button>
                    <button className="p-3 btn btn-danger" onClick={() => { quitGame() }}>Quit game ( DRAW )</button>
                </div>
                <button className={'flex-fill btn ' + (changeTurn === 2 ? 'btn-primary' : 'btn-light')} onClick={() => { setChangeTurn(1); setLastTurn(1) }}>{convertTime(clock2)}</button>
            </div>
            :
            <PlayerPicker setGameReady={setGameReady} player1name={player1name} player2name={player2name} setPlayer1name={setPlayer1name} setPlayer2name={setPlayer2name} setPlayer1ID={setPlayer1ID} setPlayer2ID={setPlayer2ID} />
        }
    </div>
}
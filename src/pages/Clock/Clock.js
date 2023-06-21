import { useEffect, useRef, useState, useContext } from "react"
import { TimeContext } from "../../context/TimeContext";
import { Link } from 'react-router-dom';

// components
import PlayerPicker from "../../components/PlayerPicker/PlayerPicker";

export default function Clock() {

    const { mode, setMode } = useContext(TimeContext)
    const [clock1, setClock1] = useState(mode);
    const [clock2, setClock2] = useState(mode);
    const [changeTurn, setChangeTurn] = useState(0);
    const [gameReady, setGameReady] = useState(false)
    const [player1name, setPlayer1name] = useState()
    const [player2name, setPlayer2name] = useState()
    const [player1ID, setPlayer1ID] = useState()
    const [player2ID, setPlayer2ID] = useState()

    useEffect(() => {
        let interval;
        window.clearInterval(interval);
        if (changeTurn === 1) {
            interval = setInterval(() => {
                console.log("Player 1 turn")
                setClock1(prevClock1 => prevClock1 - 1)
            }, 1000);
        }
        else if (changeTurn === 2) {
            interval = setInterval(() => {
                console.log("Player 2 turn")
                setClock2(prevClock2 => prevClock2 - 1)
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [changeTurn])

    useEffect(() => {
        if (clock1 <= 0) {
            setChangeTurn(0)
            document.querySelector("#winner").innerHTML = "Winner is player 2";
            return;
        }

        if (clock2 <= 0) {
            setChangeTurn(0)
            document.querySelector("#winner").innerHTML = "Winner is player 1";
            return;
        }
    }, [clock1, clock2])


    return <div>
        <Link to="/">Home</Link>
        { gameReady ?
            <div className="clock">
                <div>{clock1} <button onClick={() => setChangeTurn(2)}>End move</button> </div>
                <div>{clock1} <button onClick={() => setChangeTurn(2)}>End move</button> </div>
                <div>{clock2} <button onClick={() => setChangeTurn(1)}>End move</button> </div>
                <button onClick={() => { setChangeTurn(0) }}>Pause game!</button>
                <div id="winner"></div>
            </div> 
            :
            <PlayerPicker setGameReady={setGameReady} player1name={player1name} player2name={player2name} setPlayer1name={setPlayer1name} setPlayer2name={setPlayer2name} setPlayer1ID={setPlayer1ID} setPlayer2ID={setPlayer2ID}/>
        }
    </div>
}
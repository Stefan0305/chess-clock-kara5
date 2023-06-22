import { useEffect, useState } from "react"

export default function PlayerPicker(props) {

    const [players, setPlayers] = useState()
    const [select1, setSelect1] = useState('None')
    const [select2, setSelect2] = useState('None')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_SERVER}/leaderboard`)
            .then(response => response.json())
            .then(data => {
                setPlayers(data)
            })

    }, [])

    function handleConfirm(){
        if (select1 !== 'None' && select2 !== 'None') {
            props.setGameReady(true)
        } else {
            alert("Pick players")
        }
    }


    return <div>

        {/* select player 1 */}
        <label htmlFor="player1">Player 1:</label>
        <select name="player1" id="player1" onChange={(e) => {
            const arr = e.target.value
            const split = arr.split(',')
            props.setPlayer1name(split[0])
            props.setPlayer1ID(split[1])
            setSelect1(split[0])
        }}>
            <option value="None">Pick a player</option>
            {players?.map((player, index) => {
                return <option key={index} value={[player.name, player._id]}>{player.name}</option>
            })}
        </select>

        {/* select player 2 */}
        <label htmlFor="player2">Player 2:</label>
        <select name="player2" id="player2" onChange={(e) => {
            const arr = e.target.value
            const split = arr.split(',')
            props.setPlayer2name(split[0])
            props.setPlayer2ID(split[1])
            setSelect2(split[1])
        }}>
            <option value="None">Pick a player</option>
            {players?.map((player, index) => {
                return <option key={index} value={[player.name, player._id]} data-id={player._id}>{player.name}</option>
            })}
        </select>

        {/* confirm picks */}
        <button onClick={() => handleConfirm()}>Confirm</button>
        
    </div>
}
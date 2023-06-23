import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function PlayerPicker(props) {

    const [players, setPlayers] = useState()
    const [select1, setSelect1] = useState('None')
    const [select2, setSelect2] = useState('None')

    useEffect(() => {
        fetch(`https://chess-clock-kara5-backend.onrender.com/leaderboard`)
            .then(response => response.json())
            .then(data => {
                setPlayers(data)
            })

    }, [])

    function handleConfirm() {
        if (select1 !== 'None' && select2 !== 'None') {
            props.setGameReady(true)
        } else {
            alert("Pick players")
        }
    }


    return <div className='container py-4'>
        <Link to="/" className="btn btn-warning d-inline-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <p className="p-0 m-0">Home</p>
        </Link>

        <div className="row py-5">

            <div className="col-6">

                {/* select player 1 */}
                <label htmlFor="player1" className="pb-2">Player 1:</label><br />
                <select className="w-100 h-75" name="player1" id="player1" onChange={(e) => {
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

            </div>

            <div className="col-6">

                {/* select player 2 */}
                <label htmlFor="player2" className="pb-2">Player 2:</label><br />
                <select className="w-100 h-75" name="player2" id="player2" onChange={(e) => {
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

            </div>

        </div>
        {/* confirm picks */}
        <button className="btn btn-success float-end" onClick={() => handleConfirm()}>Confirm</button>
    </div>
}
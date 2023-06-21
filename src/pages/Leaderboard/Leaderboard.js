import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// components
import PlayerProfile from '../../components/PlayerProfile/PlayerProfile';

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState()
    const [playerData, setPlayerData] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_SERVER}/leaderboard`)
            .then(response => response.json())
            .then(data => {
                setLeaderboard(data)
            })
    }, [])

    async function getPlayerStats(id) {
        await fetch(`${process.env.REACT_APP_DEV_SERVER}/leaderboard/player/${id}`)
            .then(response => response.json())
            .then(data => {
                setPlayerData(data)
            })
    }



    return <div>
        <Link to="/">Home</Link>

        {/* so bootstrap columns da se podeli screenot na pola, levo za tabela desno za player profile */}

        {/* leva polovina */}
        <table>
            <thead><tr><th>Player</th><th>Rank</th></tr></thead>
            <tbody>
                {leaderboard?.map((item, index) => {
                    return <tr key={index}><td><Link to={`player/${item._id}`} onClick={() => getPlayerStats(item._id)} >{item.name}</Link></td><td>{item.rank}</td></tr>
                })}
            </tbody>
        </table>

        {/* desna polovina */}
        {playerData ? <PlayerProfile data={playerData} /> : null}
    </div>
}
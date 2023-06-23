import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// components
import PlayerProfile from '../../components/PlayerProfile/PlayerProfile';

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState()
    const [playerData, setPlayerData] = useState('')

    useEffect(() => {
        fetch(`https://chess-clock-kara5-backend.onrender.com/leaderboard`)
            .then(response => response.json())
            .then(data => {
                setLeaderboard(data)
            })
    }, [])

    async function getPlayerStats(id) {
        await fetch(`https://chess-clock-kara5-backend.onrender.com/leaderboard/player/${id}`)
            .then(response => response.json())
            .then(data => {
                setPlayerData(data)
            })
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
                <table className='border border-dark w-75 text-center'>
                    <thead className='border border-dark'><tr><th className='border border-dark py-2 bg-secondary text-white'>Player</th><th className='border border-dark py-2 bg-secondary text-white'>Rank</th></tr></thead>
                    <tbody>
                        {leaderboard?.map((item, index) => {
                            return <tr key={index}><td className='border border-dark-subtle border-start-0 border-bottom-0 bg-secondary-subtle py-2'><Link to={`player/${item._id}`} className='text-black text-decoration-none' onClick={() => getPlayerStats(item._id)} >{item.name}</Link></td><td className='border border-dark-subtle border-end-0 border-bottom-0 bg-secondary-subtle'>{item.rank}</td></tr>
                        })}
                    </tbody>
                </table>
            </div>

            <div className="col-6">
                {playerData ? <PlayerProfile data={playerData} /> : null}
            </div>

        </div>
    </div>
}
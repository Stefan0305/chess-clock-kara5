import { useState, useEffect } from 'react'

export default function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState()

    useEffect(() => {
        fetch("http://localhost:5000/leaderboard")
            .then(response => response.json())
            .then(data => {
                setLeaderboard(data)
            })
    }, [])

    return <div>
        <a href="/">Home</a>
        {leaderboard?.map((item, index) => {
            return <div key={index}>{item.name} {item.rank}</div>
        })}
    </div>
}
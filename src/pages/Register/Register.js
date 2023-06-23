import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {

    const [playerName, setPlayerName] = useState('')

    async function registerPlayer(event) {
        event.preventDefault()
        if (playerName === '') {
            alert("Enter player name!")
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playerName })
        };

        const response = await fetch(`https://chess-clock-kara5-backend.onrender.com/player/add`, requestOptions)
        const json = await response.json()

        if (!response.ok) {
            alert(json.error)
        }
        else {
            setPlayerName('')
            alert(json.message)
        }

    }

    return <div className='container py-4'>
        <Link to="/" className="btn btn-warning d-inline-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg>
            <p className="p-0 m-0">Home</p>
        </Link>
        <div className='pt-5'>
            <form action="" method="post" onSubmit={registerPlayer}>
                <label htmlFor="name" className='me-2'>Name:</label>
                <input type="text" name="name" id="name" className='me-4' onChange={(e) => setPlayerName(e.target.value)} value={playerName} />
                <input type="submit" value="Submit" className='btn btn-success' />
            </form>
        </div>
    </div>
}
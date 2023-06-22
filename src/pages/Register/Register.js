import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {

    const [playerName, setPlayerName] = useState('')

    async function registerPlayer(event) {
        event.preventDefault()
        if(playerName === '') {
            alert("Enter player name!")
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({playerName})
        };

        const response= await fetch(`https://chess-clock-kara5-backend.onrender.com/player/add`, requestOptions)
        const json= await response.json()

        if(!response.ok){
            alert(json.error)
        }
        else {
            setPlayerName('')
            alert(json.message)
        }
        
    }

    return <div>
        <div><Link to="/">Home</Link></div>
        <div>
            <form action="" method="post" onSubmit= {registerPlayer}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={(e) => setPlayerName(e.target.value)} value={playerName} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
}
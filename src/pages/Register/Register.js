import { useState } from 'react';

export default function Register() {

    const [playerName, setPlayerName] = useState()

    function registerPlayer(event) {
        event.preventDefault()
        if(playerName === '') {
            alert("Enter player name!")
            return
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"name": playerName})
        };

        fetch("http://localhost:5000/player/add", requestOptions)
        .then((response) => {
            if (response.status !== 200) {
                console.log(response)
                throw new Error(response);
              }
        })
        .catch((err) => {
            console.log()
        })
    }

    return <div>
        <div><a href="/">Home</a></div>
        <div>
            <form action="" method="post" onSubmit= {registerPlayer}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={(e) => setPlayerName(e.target.value)} value={playerName} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
}
import { useEffect, useRef, useState } from "react"

export default function Clock() {

    const [clock1, setClock1] = useState(5);
    const [clock2, setClock2] = useState(5);
    const [changeTurn, setChangeTurn] = useState(0);
    

    useEffect(() => {
        let interval;
        window.clearInterval(interval);
        if(changeTurn === 1) {
            interval= setInterval(() => {
                console.log("Player 1 turn")
                setClock1(prevClock1 => prevClock1 - 1)
            }, 1000);
        }
        else if(changeTurn === 2) {
            interval= setInterval(() => {
                console.log("Player 2 turn")
                setClock2(prevClock2 => prevClock2 - 1)
            }, 1000);
        }
        return () => clearInterval(interval)
    }, [changeTurn])

    useEffect(() => {
      if(clock1 <= 0) {
        setChangeTurn(0)
        document.querySelector("#winner").innerHTML= "Winner is player 2";
        return;
      }

      if(clock2 <= 0) {
        setChangeTurn(0)
        document.querySelector("#winner").innerHTML= "Winner is player 1";
        return;
      }
    }, [clock1, clock2])
    


    return <div>
        <a href="/">Home</a>
        <div>{clock1} <button onClick={() => setChangeTurn(2)}>End move</button> </div>
        <div>{clock2} <button onClick={() => setChangeTurn(1)}>End move</button> </div>
        <button onClick={() => {setChangeTurn(0)}}>Pause game!</button>
        <div id="winner"></div>
    </div>
}
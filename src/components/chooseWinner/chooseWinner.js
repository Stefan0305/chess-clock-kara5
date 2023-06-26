import { useNavigate } from "react-router-dom"

export default function ChooseWinner(props) {

    const navigate = useNavigate()

    return <div className="winner-overlay">
        <button className="btn btn-warning py-3 px-5 mb-5" onClick={() => {
            props.setClock2(0)
            props.setChooseWinner(false)
        }}>Player 1: <br /> {props.player1name}</button>
        <button className="btn btn-light py-3 px-5 mb-5" onClick={() => {
            navigate('/')
        }}>Draw</button>
        <button className="btn btn-warning py-3 px-5" onClick={() => {
            props.setClock1(0)
            props.setChooseWinner(false)
        }}>Player 2: <br /> {props.player2name}</button>
    </div>
}
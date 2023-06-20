export default function PlayerProfile({data}){

    return <div>
        <h5>Name: {data.name}</h5>
        {/* <p>Matches played: {data.played}</p> */}
        <p>Wins: {data.score.wins}</p>
        <p>Draws: {data.score.draws}</p>
        <p>Losses: {data.score.losses}</p>
        <p>Winrate: {(data.score.wins / data.score.played) * 100}%</p>
    </div>
}
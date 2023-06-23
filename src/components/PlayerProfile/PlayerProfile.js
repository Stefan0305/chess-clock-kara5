export default function PlayerProfile({data}){

    console.log(data)

    return <div className="w-75">
        <h5>Name: {data.name}</h5>
        <p>Rank: {data.rank}</p>
        <p>Matches played: {data.score.played}</p>
        <p>Wins: {data.score.won}</p>
        <p>Draws: {data.score.draw}</p>
        <p>Losses: {data.score.lost}</p>
        <p>Winrate: {(data.score.won / data.score.played) * 100}%</p>
    </div>
}
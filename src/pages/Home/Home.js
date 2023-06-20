export default function Home() {

    // const [GameModes, setGameModes] = useState(600);

    return <div className="wrapper">
        <div className="blur"></div>
        <div className="container">
            <div className="header">
                <a className="logo-link" href="https://kara5.com">
                    <div className="logo"></div>
                    <div className="logo-text"><p>CHESS</p></div>
                </a>
            </div>
            <div className="button-cont">
                <a className="home-btn" href="new-game">Start game <br /> Default: 10 min</a>
            </div>
            <div className="button-cont">
                <a className="home-btn" href="leaderboard">Leaderboard</a>
            </div>
            <div className="button-cont">
                <a className="home-btn" href="register">Register new player</a>
            </div>
        </div>
    </div>
}
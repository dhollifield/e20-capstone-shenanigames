import { useEffect, useState } from "react";
import ReactCardFlip from "react-card-flip"

export const GamesDetails = () => {
  const [games, setGames] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(
            `http://localhost:8088/games`
        );
        const gamesArray = await response.json();
        setGames(gamesArray)
    };
    fetchData();
  }, []);

  return (
    <div className="gamesContainer">
        <article className="games">
            {games.map((game) => {
                return (    
                    <ReactCardFlip
                        className="gameCard"
                        isFlipped={isFlipped}
                        flipDirection="horizontal"
                    >
                        <div 
                            onClick={() => setIsFlipped((prev) => !prev)}
                            className="cardFront"
                        >
                            <div className="gameImage">
                                <img src={game.imageURL} alt="game"></img>
                            </div>
                        </div>
                        <div
                            onClick={() => setIsFlipped((prev) => !prev)}
                            className="cardBack"
                        >
                            <div className="gameDetails">
                                <div className="gameTitle">{game.name}</div>
                                <div className="gameSpecs">
                                    <section>Number of Players: {game.minPlayers}-{game.maxPlayers}</section>
                                    <section>Suggested Minimum Age: {game.suggestedAge}</section>
                                    <section>Playing Time: {game.minPlayingTimeInMinutes}-{game.maxPlayingTimeInMinutes}</section>
                                </div>
                            </div>
                        </div>
                </ReactCardFlip>
            )})}

        </article>
    </div>
  );
}
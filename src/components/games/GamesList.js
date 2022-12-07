import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./Games.css"

export const GamesList = () => {
    const [games, setGames] = useState([])
    const [userCollection, setUserCollection] = useState([])

    const capstoneUser = localStorage.getItem("capstone_user")
    const gamesUserObject = JSON.parse(capstoneUser)

    const { userId } = useParams()

    const navigate = useNavigate()

    const fetchGames = async () => {
        const response = await fetch(
            `http://localhost:8088/games?_sort=name`
        );
        const gamesArray = await response.json();
        setGames(gamesArray)
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchUserCollection = async () => {
        const response = await fetch(
            `http://localhost:8088/userCollection?`
        );
        const collectionArray = await response.json();
        setUserCollection(collectionArray.filter((obj) => obj.userId === gamesUserObject.id))
    };

    useEffect(() => {
        fetchUserCollection();
    }, [userId]);

    console.log(userCollection)

    

    const handleAddToCollectionClick = (gameId) => {

        const dataToSendToAPI = {
            userId: gamesUserObject.id,
            gamesId: gameId
          };

        const addGameToCollection = async () => {
                const options = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(dataToSendToAPI),
                };
                const response = await fetch(`http://localhost:8088/userCollection`, options);
                await response.json()
              };
              addGameToCollection();
    }

    const editButton = (gamesId) => {
        return (
          <Link to={`/editGame/${gamesId}`}>
            <button className="gameButton editGameButton">Edit Game</button>                                       
          </Link>
        );
    };

    const deleteButton = (gamesId) => {
        return (
        <Link
            onClick={() => {
            const deleteGame = async () => {
                const options = {
                method: "DELETE",
                };
                await fetch(`http://localhost:8088/games/${gamesId}`, options);
                fetchGames();
            };
            deleteGame();
            navigate(`/`)
            }}
        >
            <button 
            className="gameButton deleteGameButton"
            >
            Delete Game
            </button>
        </Link>
        );
    };

    return (
        <>
        <div className="pageTitle">DISCOVER GAMES</div>

        <div className="pageButtons">
            <button className="sortButton sortByAZ">Sort by A-Z</button>
            <button className="sortButton sortByAge">Sort by Suggested Age</button>

            {
                gamesUserObject.isAdmin
                    ? <>   
                        <Link to={`/addNew`} className="addNewGameLink">
                            <button className="addGameButton">ADD A GAME</button>
                        </Link>
                    </>
                    : <>
                    </>
            }

            <button className="sortButton sortByTime">Sort by Playing Time</button>
            <button className="sortButton sortByPlayers">Sort by Number of Players</button>
        </div> 

        <article className="gamesContainer">
            {
                games.map(
                    (game) => {
                        return <section className="game" key={`game--${game.id}`}>
                                <img className="gameImage" src={game.imageURL} alt="game"></img>
                                <div className="gameName">{game.name}</div>
                                <p>Number of Players: {game.minPlayers}-{game.maxPlayers}</p>
                                <p>Playing Time: {game.minPlayingTimeInMinutes}-{game.maxPlayingTimeInMinutes} minutes</p>
                                <p>Suggested Age: {game.suggestedAge}+</p>
                                <div className="gameButtons">
                                        <button
                                            className="gameButton addToCollection"
                                            onClick={() => handleAddToCollectionClick(game.id)}
                                        >
                                        Add to Collection
                                        </button>
                                    <button className="gameButton addToWishList">Add to Wish List</button>
                                    <div className="gameButtons">
                                        {gamesUserObject.isAdmin ? (
                                            <>{editButton(game.id)}</>
                                        ) : (
                                        <></>
                                        )}
                                        {gamesUserObject.isAdmin ? (
                                            <>{deleteButton(game.id)}</>
                                        ) : (
                                        <></>
                                        )}
                                    </div>
                                </div>
                        </section>
                    }
                )
            }
        </article>
    </>
    )
}
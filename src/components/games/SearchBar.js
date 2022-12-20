import { useState } from 'react'

export const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [games, setGames] = useState([]);

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

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        games.filter((game) => {
            return game.name.match(searchInput)
        }) 
    };

    return (
        <>
        <div className="pageTitle">DISCOVER GAMES</div>
        
        <div>
            <input 
                type="search"
                placeholder="Search for game here"
                onChange={handleChange}
                value={searchInput} />
        </div>
        
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
                                        <button
                                            className="gameButton addToWishList"
                                            onClick={() => handleAddToWishListClick(game.id)}
                                        >
                                        Add to Wish List
                                        </button>
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
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Games.css"

export const GamesList = () => {
    const [games, setGames] = useState([])

    const capstoneUser = localStorage.getItem("capstone_user")
    const gamesUserObject = JSON.parse(capstoneUser)

    useEffect(
        () => {
            const fetchGames = async() => {
                const response = await fetch(`http://localhost:8088/games?_sort=name`)
                const gamesArray = await response.json()
                setGames(gamesArray)
                // setSuggestedAge(gamesArray)
            }
            fetchGames()
        },
        []
    )

    return (
        <>
        <div className="pageTitle">DISCOVER GAMES</div>

        <div className="pageButtons">
            <button className="sortButton sortByAZ">Sort by A-Z</button>
            <button className="sortButton sortByAge">Sort by Suggested Age</button>

            {
                gamesUserObject.isAdmin
                    ? <>   
                        <Link to={`/games/addNew`} className="addNewGameLink">
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
                                    <button className="gameButton addToCollection">Add to Collection</button>
                                    <button className="gameButton addToWishList">Add to Wish List</button>
                                    <button className="gameButton deleteGame">Delete Game</button>
                                </div>
                        </section>
                    }
                )
            }
        </article>
    </>
    )
}

// POTENTIAL CODE FOR BUTTONS //
/* {
    gamesUserObject.admin
        ? <>
            <button onClick={ () => { setSuggestedAge() } }>Sort By Suggested Minimum Age</button>
            <button onClick={ () => { navigate("/game/create") } }>Add A Game</button>
        </>
        : <>
            <button onClick={ () => { setSuggestedAge() } }>Sort By Suggested Minimum Age</button>
        </>
    } */ 

// POTENTIAL CODE FOR FLIP CARD //

/* const handleGameClick =(gamesId) => {
     setFilteredGames(
         filteredGames.map((game) =>
         game.id === `${gamesId}`
     )
     );
   } */

/*{ <div className="gamesContainer">
<article className="games">
    {games.map((game) => {
       return (
           <section className="game">
               <GamesDetails 
                   key={`game--${game.id}`}  
                   onChangeImage={handleGameClick}
                   
               />
           </section>
       )
   })}
</article>
</div> }*/
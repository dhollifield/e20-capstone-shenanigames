import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AdminCollection = () => {
    const [userCollection, setUserCollection] = useState([]);

    const { gamesId, userId } = useParams();

    const capstoneUser = localStorage.getItem("capstone_user")
    const gamesUserObject = JSON.parse(capstoneUser)

    const fetchCollection = () => {
        fetch(`http://localhost:8088/userCollection?&_expand=games`)
        .then((response) => response.json())
        .then((userGamesArray) => {
            setUserCollection(userGamesArray.filter((obj) => obj.userId == gamesUserObject.id));
        });
    };

    useEffect(() => {
        fetchCollection();
    }, [userId, gamesId]);

    const removeButtonClick = (id) => {
        return fetch(`http://localhost:8088/userCollection/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then((response) => {
            fetchCollection();
        });
    };
 
    return (
        <>
        <div className="pageTitle">MY COLLECTION</div>

        <div className="pageButtons">
            <button className="sortButton sortByAZ">Sort by A-Z</button>
            <button className="sortButton sortByAge">Sort by Suggested Age</button>
            <button className="sortButton sortByTime">Sort by Playing Time</button>
            <button className="sortButton sortByPlayers">Sort by Number of Players</button>
        </div> 

        <article className="gamesContainer">
            {
                userCollection.map(
                    (collection) => {
                        return <section className="game" key={`game--${collection.games.id}`}>
                                <img className="gameImage" src={collection.games.imageURL} alt="game"></img>
                                <div className="gameName">{collection.games.name}</div>
                                <p>Number of Players: {collection.games.minPlayers}-{collection.games.maxPlayers}</p>
                                <p>Playing Time: {collection.games.minPlayingTimeInMinutes}-{collection.games.maxPlayingTimeInMinutes} minutes</p>
                                <p>Suggested Age: {collection.games.suggestedAge}+</p>
                                <div className="gameButtons">
                                    <button 
                                        className="deleteButton"
                                        onClick= {() => 
                                        removeButtonClick(collection.games.id)}>
                                            Remove from Collection
                                    </button>
                                </div>
                        </section>
                    }
                )
            }
        </article>
    </>
    )
    };
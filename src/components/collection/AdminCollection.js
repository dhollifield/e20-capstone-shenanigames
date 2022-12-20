import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Collection.css"

export const AdminCollection = () => {
    const [userCollection, setUserCollection] = useState([]);
    const [sortedByAlpha, setSortedByAlpha] = useState([])

    const { gamesId, userId, id } = useParams();

    const capstoneUser = localStorage.getItem("capstone_user")
    const gamesUserObject = JSON.parse(capstoneUser)

    const fetchCollection = () => {
        fetch(`http://localhost:8088/userCollection?_expand=games`)
        .then((response) => response.json())
        .then((userGamesArray) => {
            setUserCollection(userGamesArray.filter((obj) => obj.userId == gamesUserObject.id));
        });
    };

    useEffect(() => {
        fetchCollection();
    }, [userId, gamesId, id]);

    useEffect(
        () => {
            const sortedByAlpha = userCollection.sort((a, b) => {
                if (a.games.name < b.games.name) {
                    return -1;
                } if (a.games.name > b.games.name) {
                    return 1;
                }
                return 0;
            })
            setSortedByAlpha(sortedByAlpha)
        }, 
        [userCollection]
    )

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
                                <button 
                                        className="deleteButton"
                                        onClick= {() => 
                                        removeButtonClick(collection.id)}>
                                            Remove from Collection
                                    </button>
                        </section>
                    }
                )
            }
        </article>
    </>
    )
    };
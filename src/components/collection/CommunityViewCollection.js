import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Collection.css"

export const CommunityViewCollection = () => {
    const [userCollection, setUserCollection] = useState([]);
    const [sortedByAlpha, setSortedByAlpha] = useState([])

    const { id } = useParams();

    const otherUser = userCollection.userId
    const otherUserObject = JSON.parse(otherUser)

    const fetchCollection = (id) => {
        fetch(`http://localhost:8088/userCollection?id=${id}`)
        .then((response) => response.json())
        .then((userGamesArray) => {
            setUserCollection(userGamesArray.filter((obj) => obj.userId == otherUserObject.id));
        });
    };

    useEffect(() => {
        fetchCollection();
    }, [id]);

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
 
    return (
        <>
        <div className="pageTitle"> {otherUserObject.name}'S COLLECTION</div>

        <article className="gamesContainer">
            {
                otherUserObject.map(
                    (collection) => {
                        return <section className="game" key={`game--${collection.games.id}`}>
                                <img className="gameImage" src={collection.games.imageURL} alt="game"></img>
                                <div className="gameName">{collection.games.name}</div>
                                <p>Number of Players: {collection.games.minPlayers}-{collection.games.maxPlayers}</p>
                                <p>Playing Time: {collection.games.minPlayingTimeInMinutes}-{collection.games.maxPlayingTimeInMinutes} minutes</p>
                                <p>Suggested Age: {collection.games.suggestedAge}+</p>
                        </section>
                    }
                )
            }
        </article>
    </>
    )
};
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WishList.css"

export const AdminWishList = () => {
    const [userWishlist, setUserWishlist] = useState([]);
    const [sortedByAlpha, setSortedByAlpha] = useState([])

    const { gamesId, userId } = useParams();

    const capstoneUser = localStorage.getItem("capstone_user")
    const gamesUserObject = JSON.parse(capstoneUser)

    const fetchWishlist = () => {
        fetch(`http://localhost:8088/userWishlist?&_expand=games`)
        .then((response) => response.json())
        .then((userGamesArray) => {
            setUserWishlist(userGamesArray.filter((obj) => obj.userId == gamesUserObject.id));
        });
    };

    useEffect(() => {
        fetchWishlist();
    }, [userId, gamesId]);

    useEffect(
        () => {
            const sortedByAlpha = userWishlist.sort((a, b) => {
                if (a.games.name < b.games.name) {
                    return -1;
                } if (a.games.name > b.games.name) {
                    return 1;
                }
                return 0;
            })
            setSortedByAlpha(sortedByAlpha)
        }, 
        [userWishlist]
    )

    const removeButtonClick = (id) => {
        return fetch(`http://localhost:8088/userWishlist/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        }).then((response) => {
            fetchWishlist();
        });
    };
 
    return (
        <>
        <div className="pageTitle">MY WISH LIST</div>

        <div className="pageButtons">
            <button 
                className="sortButton sortByAZ" 
                onClick= {() =>
                sortedByAlpha()}>
                    Sort by A-Z
            </button>
            <button className="sortButton sortByAge">Sort by Suggested Age</button>
            <button className="sortButton sortByTime">Sort by Playing Time</button>
            <button className="sortButton sortByPlayers">Sort by Number of Players</button>
        </div> 

        <article className="gamesContainer">
            {
                userWishlist.map(
                    (list) => {
                        return <section className="game" key={`game--${list.games.id}`}>
                                <img className="gameImage" src={list.games.imageURL} alt="game"></img>
                                <div className="gameName">{list.games.name}</div>
                                <p>Number of Players: {list.games.minPlayers}-{list.games.maxPlayers}</p>
                                <p>Playing Time: {list.games.minPlayingTimeInMinutes}-{list.games.maxPlayingTimeInMinutes} minutes</p>
                                <p>Suggested Age: {list.games.suggestedAge}+</p>
                                <div className="gameButtons">
                                    <button 
                                        className="deleteButton"
                                        onClick= {() => 
                                        removeButtonClick(list.id)}>
                                            Remove from Wish List
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
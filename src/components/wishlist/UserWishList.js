import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WishList.css"

export const UserWishList = () => {
    const [userWishlist, setUserWishlist] = useState([]);
    const [sortedByAlpha, setSortedByAlpha] = useState([])

    const { gamesId, userId } = useParams();

    const navigate = useNavigate()

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
                if (gamesUserObject.isAdmin) {
                    navigate('/adminCollection')
                } else {
                    navigate('/userCollection')
                }
              };
              addGameToCollection();
    }

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
                                            className="gameButton addToCollection"
                                            onClick={() => 
                                            handleAddToCollectionClick(list.id)}>
                                                Add to Collection
                                    </button>
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
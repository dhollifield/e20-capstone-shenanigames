import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./CommunityList.css"

export const CommunityList = () => {
    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        const response = await fetch(
            `http://localhost:8088/users?_sort=lastName&sort=firstName`
        );
        const usersArray = await response.json();
        setUsers(usersArray)
    };

    useEffect(() => {
        fetchUsers();
    }, []);    

    const goToCollectionButton = (id) => {
        return (
          <Link to={`/userCollection/${id}`}>
            <button className="gameButton goToCollectionButton">See Collection</button>                                       
          </Link>
        );
    };

    // const deleteButton = (gamesId) => {
    //     return (
    //     <Link
    //         onClick={() => {
    //         const deleteGame = async () => {
    //             const options = {
    //             method: "DELETE",
    //             };
    //             await fetch(`http://localhost:8088/games/${gamesId}`, options);
    //             fetchGames();
    //         };
    //         deleteGame();
    //         navigate(`/`)
    //         }}
    //     >
    //         <button 
    //         className="gameButton deleteGameButton"
    //         >
    //         Delete Game
    //         </button>
    //     </Link>
    //     );
    // };

    return (
        <>


        <article className="gamesContainer">
            {
                users.map(
                    (user) => {
                        return <section className="user" key={`user--${user.id}`}>
                                <div className="userName">{user.firstName} {user.lastName}</div>
                                <p>Location: {user.cityName}, {user.stateName}</p>
                                <div className="userCollectionButton" >
                                    <>{goToCollectionButton(user.id)}</>
                                </div>
                                
                        </section>
                    }
                )
            }
        </article>
    </>
    )
}
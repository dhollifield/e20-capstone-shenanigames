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
          <Link to={`/commuityViewCollection/${id}`}>
            <button className="gameButton goToCollectionButton">See Collection</button>                                       
          </Link>
        );
    };

    const goToWishListButton = (userId) => {
        return (
          <Link to={`/userWishlist/${userId}`}>
            <button className="gameButton goToWishListButton">See Wish List</button>                                       
          </Link>
        );
    };

    return (
        <>
            <div className="pageTitle">OUR COMMUNITY</div>

            <article className="profilesContainer">
                {
                    users.map(
                        (user) => {
                            return <section className="user" key={`user--${user.id}`}>
                                    <div className="userDetails">
                                        <img className="profilePic" src={user.profilePic} alt=""></img>
                                        <div className="userInfo">
                                            <div className="userName">{user.firstName} {user.lastName}</div>
                                            <p>Location: {user.cityName}, {user.stateName}</p>
                                        </div>
                                        <div className="goToButtons">
                                            <>{goToCollectionButton(user.id)}</>
                                            <>{goToWishListButton(user.id)}</>
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
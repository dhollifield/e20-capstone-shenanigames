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

    return (
        <>
            <div className="pageTitle">OUR COMMUNITY</div>

            <article className="profilesContainer">
                {
                    users.map(
                        (user) => {
                            return <section className="user" key={`user--${user.id}`}>
                                    <img className="profilePic" src={user.profilePic} alt="Picture Not Available"></img>
                                    <div className="userInfo">
                                        <div className="userName">{user.firstName} {user.lastName}</div>
                                        <p>Location: {user.cityName}, {user.stateName}</p>
                                    </div>
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
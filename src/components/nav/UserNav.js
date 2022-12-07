import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        <div className="navImgContainer">
            <div className="navBarLinks">
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/">
                        Discover
                    </Link>
                </div>
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/userCollection">
                        My Collection
                    </Link>
                </div>
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/userWishlist">
                        Wish List
                    </Link>
                </div>
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/community">
                        Community
                    </Link>
                </div>
                {localStorage.getItem("capstone_user") ? (
                    <div className="navbar__item navbar__logout">
                        <Link
                        className="navbar__link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("capstone_user");
                            navigate("/", { replace: true });
                        }}
                    >
                        Logout
                        </Link>
                    </div>
                ) : (
                    ""
                )}
            </div>  
        </div>
    )
}
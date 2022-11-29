import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"

export const AdminNav = () => {
    const navigate = useNavigate()

    return (
        <div className="navImgContainer">
            <div className="navBarLinks">
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/adminCollection">
                        My Collection
                    </Link>
                </div>
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/adminWishlist">
                        Wish List
                    </Link>
                </div>
                <div className="navbar__item active">
                    <Link className="navbar__link" to="/adminCommunity">
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

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import "../Styles/NavBar.css";
import rectangle from "../assets/rectangle.svg";
import AuthPopup from "./auth/AuthPopup.jsx";


const NavBar = () => {
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const {user: currentUser} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (currentUser) {
            navigate("/profile"); // Navigate to profile if authenticated
        } else {
            setShowAuthPopup(!showAuthPopup); // Show login/register popup
        }
    };


    return (
        <>
            <div className={showAuthPopup ? "blurred-background" : ""}>
                <nav className="header-nav">
                    <div className="navbar-container">
                        <div className="navbar-content">
                            {/* Left section */}
                            <ul className="header-left">
                                <li className="nav-item">
                                    <img src="/src/assets/burger.svg" alt=""/>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/collections">Collections</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/new">New</Link>
                                </li>
                            </ul>

                            {/* Centered image */}
                            <div className="logo">
                                <img src={rectangle} alt="Centered Logo" className="logo-image"/>
                            </div>

                            {/* Right section */}
                            <form className="header-right" role="search">
                                <Link to="/wishlist" className="button button-heart" type="submit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        fill="currentColor"
                                        className="icon-heart"
                                        viewBox="0 0 16 16"
                                        style={{transform: "rotate(315deg)"}}>
                                        <path
                                            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                    </svg>
                                </Link>

                                <Link className="button button-cart" type="submit" to="/cart">
                                    Cart
                                </Link>

                                <button
                                    className="button button-profile"
                                    type="button"
                                    onClick={handleProfileClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="icon-profile"
                                        viewBox="0 0 17 17">
                                        <path
                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Auth Popup */}
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)}/>}
        </>
    );
};

export default NavBar;

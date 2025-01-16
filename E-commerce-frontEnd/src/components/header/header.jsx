import './header.css';
import rectangle from "/src/assets/rectangle.svg";

const Header = () => {
    return (
        <nav className="header-nav">
            <div className="navbar-container">
                <div className="navbar-content">
                    {/* Left section */}
                    <div className="headerLeft">
                        <ul className="header-left">
                            <li className="nav-item">
                                <img src="/src/assets/burger.svg" alt=""/>
                            </li>
                            <li className="nav-item">
                                <p>Home</p>
                            </li>
                            <li className="nav-item">
                                <p>Collections</p>
                            </li>
                            <li className="nav-item">
                                <p>New</p>
                            </li>
                        </ul>
                    </div>


                    {/* Centered image */}
                    <div className="logo">
                        <img src={rectangle} alt="Centered Logo" className="logo-image"/>
                    </div>

                    {/* Right section */}
                    <form className="header-right" role="search">
                        <button className="button button-heart" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                fill="currentColor"
                                className="icon-heart"
                                viewBox="0 0 16 16"
                                style={{ transform: "rotate(315deg)" }}>
                                <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                        </button>

                        <div>
                            <button className="button button-cart" type="submit">
                                <p>Cart</p>
                                <img src="/src/assets/cart__logo.svg" alt="" className="button__logo"/>
                            </button>
                            
                        </div>


                        <button className="button button-profile" type="submit">
                        <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="icon-profile"
                                viewBox="0 0 17 17">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;
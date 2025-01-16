import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Styles/Profile.css"; // Create this file for custom styles
import { logout } from "../redux/actions/auth"; // Import the logout action

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth) || {};
    const userFromStorage = JSON.parse(localStorage.getItem("user"));

    const user = currentUser || userFromStorage; // Fallback to localStorage
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/home" />;
    }

    const handleLogout = () => {
        dispatch(logout()); // Trigger logout action to clear Redux state
        localStorage.removeItem("user"); // Clear user data from localStorage
        navigate("/home"); // Redirect to login page
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h3 className="profile-title">
                    Welcome, <strong>{user.username}</strong>!
                </h3>
            </header>
            <div className="profile-details">
                <p>
                    <strong>Token:</strong> {user.token.substring(0, 20)} ...{" "}
                    {user.token.substr(user.token.length - 20)}
                </p>
                <p>
                    <strong>Id:</strong> {user.id}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <div>
                    <strong>Authorities:</strong>
                    <ul className="profile-roles">
                        {user.roles &&
                            user.roles.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                    </ul>
                </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Profile;

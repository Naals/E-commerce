import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "../../Styles/AuthPopup.css";

// eslint-disable-next-line react/prop-types
const AuthPopup = ({ onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true); // Toggle between Login and Register views

    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };


    return (
        <div className="auth-popup-container">
            <div className="auth-popup-card">
                {/* Close Button */}
                <button className="close-popup" onClick={onClose}>
                    &times;
                </button>

                {/* Render Login or Register Component */}
                {isLoginView ? (
                    <>
                        <Login onClose={onClose} toggleToRegister={toggleView} />
                        <p className="auth-switch-text">
                            Don’t have an account?{" "}
                            <span className="auth-switch-link" onClick={toggleView}>
                                Register
                            </span>
                        </p>
                    </>
                ) : (
                    <>
                        <Register onClose={onClose} toggleToLogin={toggleView} />
                        <p className="auth-switch-text">
                            Already have an account?{" "}
                            <span className="auth-switch-link" onClick={toggleView}>
                                Login
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPopup;

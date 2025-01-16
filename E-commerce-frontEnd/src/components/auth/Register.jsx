import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "../../Styles/login.css"; // Reuse the same CSS as Login
import { register } from "../../redux/actions/auth.jsx";
import {Navigate, useNavigate} from "react-router-dom";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

// eslint-disable-next-line react/prop-types
const Register = ({ onClose, toggleToLogin }) => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
                .then(() => {
                    navigate("/profile");
                    setSuccessful(true);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    // Redirect to profile if logged in
    if (isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Close Button */}
                <button className="close-popup" onClick={onClose}>
                    &times;
                </button>

                <h2 className="login-title">Create an Account</h2>
                <p className="login-subtitle">Sign up to get started</p>

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    Username
                                </label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-dark btn-block mt-3">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>

                <p className="login-register">
                    Already have an account?{" "}
                    <span className="register-link" onClick={toggleToLogin}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;

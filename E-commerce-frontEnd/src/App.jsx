import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MainLayout from "./Layout/MainLayout.jsx";

import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Home from "./components/home/Home.jsx";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import Cart from "./components/order/order.jsx"
import CheckOut from "./components/checkout/checkout.jsx";
import Collections from "./components/collections/collection.jsx";

import { logout } from "./redux/actions/auth";
import { clearMessage } from "./redux/actions/message";
import Order from "./components/order/order.jsx";
import UserService from "./redux/services/user.service.jsx";
import Product from "./components/product/product.jsx";
import WishList from "./components/wishlist/wish.jsx";

const App = () => {
    const [content, setContent] = useState("");
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [isLoginPage, setIsLoginPage] = useState(false); // State to track login page

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    let location = useLocation();

    useEffect(() => {
        if (["/login", "/register"].includes(location.pathname)) {
            dispatch(clearMessage());
            setIsLoginPage(location.pathname === "/login");
        } else {
            setIsLoginPage(false);
        }
    }, [dispatch, location]);

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
        } else {
            setShowModeratorBoard(false);
            setShowAdminBoard(false);
        }
    }, [currentUser]);

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
            <div className="container1">
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route path="/" element={<Home content={content} />} />
                        <Route path="/home" element={<Home content={content}/>} />
                        <Route path="/profile" element={<Profile content={content}/>} />
                        <Route path="/user" element={<BoardUser content={content}/>} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<CheckOut />} />
                        <Route path="/collections" element={<Collections  content={content}/>} />
                        <Route path="/product/:id" element={<Product />} />
                        <Route path="/wishlist" element={<WishList />} />
                    </Route>
                </Routes>
            </div>
    );
};

export default App;

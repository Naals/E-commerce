import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/";

const getPublicContent = () => {
    return axios.get(API_URL + "/products");
};

const getUserBoard = () => {
    console.log((API_URL + "users/products" + { headers: authHeader()}))
    return axios.get(API_URL + "users/products", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "/admin/products", { headers: authHeader() });
};

const getUserCart = () => {
    console.log((API_URL + "users/cart" + { headers: authHeader()}))
    return axios.get(API_URL + "users/cart", { headers: authHeader() });
};

const patchUserCart = (data) => {
    return axios.post(API_URL + "users/cart", data, { headers: authHeader() });
};

const patchUserFavourites = (data) => {
    return axios.post(API_URL + "users/favorites", data, { headers: authHeader() });
};

const deleteUserFavourites = (data) => axios.delete(API_URL + "users/delete/favorites", {
    headers: authHeader(),
    data: data
});

const deleteUserCart = (data) => {
    return axios.delete(API_URL + "users/delete/cart", {
        headers: authHeader(),
        data: data
    });
};


const getUserFavourites = () => {

    return axios.get(API_URL + "users/favorites", { headers: authHeader() });
};


export default {
    getPublicContent,
    getUserBoard,
    getAdminBoard,
    getUserCart,
    getUserFavourites,
    patchUserCart,
    patchUserFavourites,
    deleteUserFavourites,
    deleteUserCart,
};
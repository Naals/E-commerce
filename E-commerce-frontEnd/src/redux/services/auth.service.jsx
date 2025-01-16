import axios from "axios";

const API_URL = "/api/api/auth/";


const register = (username, email, password) => {
    return axios.post(API_URL + "signUp", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    console.log("Attempting login with:", username, password);
    return axios
        .post(API_URL + "signIn", { username, password })
        .then((response) => {
            console.log("Response received:", response);
            if (response.data.token) {
                const userData = {
                    ...response.data,
                    token: response.data.token,
                };
                console.log("Token:", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                console.warn("No token received in response.");
            }
            return response.data;
        })
        .catch((error) => {
            console.error("Login failed:", error);
            throw error;
        });
};



const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
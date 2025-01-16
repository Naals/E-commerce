import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../actions/type";

// Retrieve the user from localStorage if it exists
const user = JSON.parse(localStorage.getItem("user"));

// Set the initial state based on localStorage
const initialState = {
    isLoggedIn: !!user, // Converts the truthiness of `user` into a boolean
    user: user || null, // Use the user object from localStorage or set to null
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false, // Registration doesn't log the user in
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user, // Store the user information on successful login
            };
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false, // Clear the login state
                user: null, // Remove the user data
            };
        default:
            return state; // Return the current state for unknown action types
    }
}

import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import { setAuthToken } from "../utils/setAuthToken";

// Register user.
export const signupUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/signup", userData)
    .then(res => history.push("/"))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signinUser = userData => dispatch => {
  axios
    .post("/api/users/signin", userData)
    .then(res => {
      const { token } = res.data; // Save to localStorage.

      localStorage.setItem("jwtToken", token); // Set Token to localStorage.

      setAuthToken(token); // Set token to auth header.

      const decoded = jwt_decode(token); // Decode token to user data.

      dispatch(setCurrentUser(decoded)); // Set current user.
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user.
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

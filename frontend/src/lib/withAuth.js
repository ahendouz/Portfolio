import { setAuthToken } from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { store } from "../store";
import { setCurrentUser } from "../actions/authActions";

const token = localStorage.jwtToken;
// Check for token
if (token) {
  setAuthToken(token); // Set auth token to header auth.
  const decoded = jwt_decode(token); // Decode token and get user info and exp.
  store.dispatch(setCurrentUser(decoded)); // Set user and isAuthenticated
}

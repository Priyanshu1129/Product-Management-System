// actions/authActions.js
import {
  setLoading,
  setUser,
  setError,
  setSuccessMessage,
  logout as logoutReducer,
} from "../slices/authSlice";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  checkAuthStatus,
} from "../../services/authService";

// Register
export const register = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await registerUser(userData);
    dispatch(setUser(data.user));
    dispatch(setSuccessMessage("Registration successful"));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Registration failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Login
export const login = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await loginUser(credentials);
    dispatch(setUser(data.user));
    dispatch(setSuccessMessage("Login successful"));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout
export const logout = () => async (dispatch) => {
  console.log("logout req made");
  try {
    await logoutUser();
    dispatch(setSuccessMessage("Logout successful"));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Logout failed"));
  } finally {
    dispatch(logoutReducer());
  }
};

// Load current user on app start
export const loadUser = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await getCurrentUser();
    dispatch(setUser(data.user));
    dispatch(setSuccessMessage("User loaded successfully"));
  } catch (err) {
    dispatch(logoutReducer());
    dispatch(setError("Failed to load user"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Check auth status (silent check)
export const checkAuth = () => async (dispatch) => {
  console.log("checkAuth req made");
  dispatch(setLoading(true));
  try {
    const res = await checkAuthStatus();
    if (res.success) {
      dispatch(setUser(res.user));
    } else {
      dispatch(setUser(null));
    }
  } catch (err) {
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

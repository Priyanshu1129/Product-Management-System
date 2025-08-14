// services/authService.js
import api from "./api";

// Register
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return res.data;
};

// Logout
export const logoutUser = async () => {
  await api.post("/auth/logout");
};

// Get current user
export const getCurrentUser = async () => {
  const res = await api.get("/auth/me"); // You'll need to implement this route
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await api.get("/auth/check-auth", { withCredentials: true });
  return res.data;
};

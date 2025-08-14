import { useDispatch, useSelector } from "react-redux";
import { login, register, logout } from "@/redux/actions/authAction";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleLogin = (credentials) => dispatch(login(credentials));
  const handleRegister = (userData) => dispatch(register(userData));
  const handleLogout = () => dispatch(logout());

  return {
    ...authState,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

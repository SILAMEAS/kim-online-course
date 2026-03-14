import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/redux/slices/auth.slice"; // Make sure you have a logout action in your slice

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove tokens from cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("auth_user");

    // Clear Redux auth state
    dispatch(logout());

    // Redirect to login page
    navigate("/login");
  };

  return { handleLogout };
};

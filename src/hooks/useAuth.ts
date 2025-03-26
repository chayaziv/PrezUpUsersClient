import { useState } from "react";
import { loginUser, registerUser } from "../service/apiService";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/currentUserSlice";
import { clearUser } from "@/store/slices/currentUserSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    window.location.href = "/home";
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      if (data.data) {
        localStorage.setItem("token", data.data.token);
        dispatch(setUser(data.data.user));
        return { success: true, data: data.data };
      } else {
        setError(data.messege || "Unknown login error.");
        return { success: false };
      }
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response.data?.messege || "An error occurred while logging in."
        );
      } else if (err.request) {
        setError("Network error. Please try again.");
      } else {
        setError("An error occurred: " + err.message);
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    userName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const data = await registerUser(userName, email, password);
      if (data.data) {
        localStorage.setItem("token", data.data.token);
        dispatch(setUser(data.data.user));
        return { success: true, data: data.data };
      } else {
        setError(data.messege || "Unknown registration error.");
        return { success: false };
      }
    } catch (err: any) {
      if (err.response) {
        setError(
          err.response.data?.messege || "An error occurred while registering."
        );
      } else if (err.request) {
        setError("Network error. Please try again.");
      } else {
        setError("An error occurred: " + err.message);
      }
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuth;

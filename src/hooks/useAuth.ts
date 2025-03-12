import { useState } from "react";
import { loginUser, registerUser } from "../service/apiService";

interface AuthResponse {
  token?: string;
  message?: string;
}

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null); // נקה את השגיאות
    try {
      const data: AuthResponse = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token); // שמירת הטוקן
        return { success: true, data }; // מחזיר הצלחה עם נתונים
      } else {
        setError(data.message || "Unknown login error.");
        return { success: false };
      }
    } catch (err: any) {
      // טיפול בשגיאות מסוגים שונים (שגיאות רשת, server, response)
      if (err.response) {
        setError(
          err.response?.data?.errors[0] || "An error occurred while logging in."
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
    setError(null); // נקה את השגיאות
    try {
      const data: AuthResponse = await registerUser(userName, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token); // שמירת הטוקן
        return { success: true, data }; // מחזיר הצלחה עם נתונים
      } else {
        console.log(data);
        setError(data.message || "Unknown registration error.");
        return { success: false };
      }
    } catch (err: any) {
      // טיפול בשגיאות מסוגים שונים (שגיאות רשת, server, response)
      if (err.response) {
        console.log(err.response);
        setError(
          err.response?.data?.errors[0] ||
            "An error occurred while registering."
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

  return { loading, error, handleLogin, handleRegister };
};

export default useAuth;

// apiService.ts
import API from "../axiosInstance"; // הייבוא של ה-axiosInstance

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    return response.data; // מחזיר את התשובה מהשרת
  } catch (error) {
    throw error; // אם יש שגיאה, זורק אותה
  }
};

export const registerUser = async (userName: string, email: string, password: string) => {
  try {
    const response = await API.post("/auth/register", { userName, email, password });
    return response.data; // מחזיר את התשובה מהשרת
  } catch (error) {
    throw error; // אם יש שגיאה, זורק אותה
  }
};

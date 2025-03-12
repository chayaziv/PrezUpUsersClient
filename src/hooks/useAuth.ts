// import { useEffect, useState } from "react";
// import { loginUser, registerUser } from "../service/apiService";

// const useAuth = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true); // אם יש טוקן, נעדכן את ה-state
//     } else {
//       setIsLoggedIn(false); // אם אין טוקן, נוודא שהמשתמש לא מחובר
//     }
//   }, []); // empty dependency array, כלומר יקרה רק פעם אחת, כאשר הקומפוננטה נטענת

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/home";
//     setIsLoggedIn(false);
//   };

//   const handleLogin = async (email: string, password: string) => {
//     setLoading(true);
//     setError(null); // נקה את השגיאות
//     setIsLoggedIn(false);
//     try {
//       const data = await loginUser(email, password);
//       if (data.token) {
//         localStorage.setItem("token", data.token); // שמירת הטוקן
//         setIsLoggedIn(true);
//         console.log(isLoggedIn);
//         return { success: true, data }; // מחזיר הצלחה עם נתונים
//       } else {
//         setError(data.message || "Unknown login error.");
//         return { success: false };
//       }
//     } catch (err: any) {
//       if (err.response) {
//         setError(
//           err.response?.data?.errors[0] || "An error occurred while logging in."
//         );
//       } else if (err.request) {
//         setError("Network error. Please try again.");
//       } else {
//         setError("An error occurred: " + err.message);
//       }
//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (
//     userName: string,
//     email: string,
//     password: string
//   ) => {
//     setLoading(true);
//     setIsLoggedIn(false);
//     setError(null); // נקה את השגיאות
//     try {
//       const data = await registerUser(userName, email, password);
//       if (data.token) {
//         localStorage.setItem("token", data.token); // שמירת הטוקן
//         setIsLoggedIn(true);
//         console.log(isLoggedIn);
//         return { success: true, data }; // מחזיר הצלחה עם נתונים
//       } else {
//         setError(data.message || "Unknown registration error.");
//         return { success: false };
//       }
//     } catch (err: any) {
//       if (err.response) {
//         setError(
//           err.response?.data?.errors[0] ||
//             "An error occurred while registering."
//         );
//       } else if (err.request) {
//         setError("Network error. Please try again.");
//       } else {
//         setError("An error occurred: " + err.message);
//       }
//       return { success: false };
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     error,
//     isLoggedIn,
//     handleLogin,
//     handleRegister,
//     handleLogout,
//   };
// };

// export default useAuth;
import { useEffect, useState } from "react";
import { loginUser, registerUser } from "../service/apiService";
import { useDispatch } from "react-redux";
import { setUser } from "../store/currentUserSlice"; // פעולה ב-redux לעדכון המשתמש

const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
 

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser"); // מסיר גם את המידע של המשתמש
    window.location.href = "/home";
    
  };

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null); // נקה את השגיאות
    
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token); // שמירת הטוקן
        // localStorage.setItem("currentUser", JSON.stringify(data.user)); // שמירת פרטי המשתמש
        dispatch(setUser(data.user)); // עדכון ה-redux עם פרטי המשתמש
       
        return { success: true, data }; // מחזיר הצלחה עם נתונים
      } else {
        setError(data.message || "Unknown login error.");
        return { success: false };
      }
    } catch (err: any) {
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
      const data = await registerUser(userName, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token); // שמירת הטוקן
        // localStorage.setItem("currentUser", JSON.stringify(data.user)); // שמירת פרטי המשתמש
        dispatch(setUser(data.user)); // עדכון ה-redux עם פרטי המשתמש
       
        return { success: true, data }; // מחזיר הצלחה עם נתונים
      } else {
        setError(data.message || "Unknown registration error.");
        return { success: false };
      }
    } catch (err: any) {
      if (err.response) {
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

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuth;

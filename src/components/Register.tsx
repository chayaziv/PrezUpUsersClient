// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import LockIcon from "@mui/icons-material/Lock";
// import {
//   Visibility,
//   VisibilityOff,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import API from "../axiosInstance";

// const Register = () => {
//   const [userName, setUserName] = useState<string>("");
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const response = await API.post("/auth/register", {
//         userName,
//         email: userEmail,
//         password,
//       });

//       console.log("Registration success:", response.data);
//       // כאן אפשר להפנות לדף ההתחברות או לשמור את הטוקן אם נדרש
//     } catch (error: any) {
//       console.error(
//         "Registration failed:",
//         error.response?.data?.message || error.message
//       );
//       alert(error.response?.data?.message || "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper elevation={6} sx={{ padding: 4, mt: 8, borderRadius: 2 }}>
//         <Box display="flex" flexDirection="column" alignItems="center">
//           <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
//             <LockIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign Up
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ mt: 3 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="userName"
//               label="Full Name"
//               name="userName"
//               autoFocus
//               value={userName}
//               onChange={(event) => setUserName(event.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="userEmail"
//               label="Email"
//               name="userEmail"
//               autoComplete="email"
//               value={userEmail}
//               onChange={(event) => setUserEmail(event.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <PersonIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               id="password"
//               autoComplete="new-password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockIcon />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Sign Up"}
//             </Button>
//             <Grid container justifyContent="space-between">
//               <Grid item>
//                 <Button href="/login" size="small">
//                   Already have an account? Sign In
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Register;
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import {
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
} from "@mui/icons-material";
import useAuth from "../hooks/useAuth"; // הייבוא של ה-Hook
import { Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { handleRegister, loading, error } = useAuth(); // שימוש ב-Hook לניהול רישום

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { success } = await handleRegister(userName, userEmail, password);
    if (success) {
      // אם הרישום הצליח, אפשר להמשיך למקום הבא או להפעיל פעולה כלשהי
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, mt: 8, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Full Name"
              name="userName"
              autoFocus
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="Email"
              name="userEmail"
              autoComplete="email"
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button component={Link} to="/login" size="small">
                  Already have an account? Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
          {error && <div style={{ color: "red" }}>{error}</div>}{" "}
          {/* הצגת שגיאות */}
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;

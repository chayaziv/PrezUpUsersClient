// import { useSelector } from "react-redux";
// import { UserType } from "../types/user";

// // import { AppDispatch } from "../store/store";

// const Home = () => {

//   // const dispatch = useDispatch<AppDispatch>(); // יצירת dispatch
//   const user = useSelector(
//     (state: { currentUser: { user: UserType } }) => state.currentUser.user
//   ); // גישה לנתוני המשתמש

// // useEffect(() => {
// //     dispatch( );
// //   }, [dispatch]); // רק פעם אחת על טעינת הקומפוננטה

//   return (
//     <>
//       <h1>Home</h1>
//       {user ? (
//         <div>
//           <h2>Welcome, {user.name}!</h2>
//           <p>Email: {user.email}</p>
//           <p>Job Title: {user.jobTitle}</p>
//           <p>Company: {user.company}</p>
//           <p>Experience: {user.yearsOfExperience} years</p>
//           {/* תוכל להוסיף עוד פרטים פה */}
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}

//     </>
//   );
// };

// export default Home;

import {
  Box,
  Button,
  Typography,
  Grid,
  useTheme,
  Paper,
  CircularProgress,
} from "@mui/material";
// import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Star as StarIcon,
  PlayCircleFilled as PlayIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const Home = () => {
  const theme = useTheme();
  const history = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  // לדוגמה, נבצע fetch של נתונים מהשרת או נשתמש בנתונים מדומים (mock data)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // סימולציה של טעינה
    }, 2000); // 2 שניות של טעינה
  }, []);

  const navigateToPresentations = () => {
    history("/public-presentations");
  };

  const navigateToProfile = () => {
    history("/my-profile");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
      }}
    >
      {/* Header Section */}
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
        >
          Welcome to PrezUp
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: theme.palette.text.secondary, marginTop: 1 }}
        >
          Perfect your presentations with AI-driven feedback.
        </Typography>
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <CircularProgress
          size={80}
          sx={{ color: theme.palette.primary.main }}
        />
      ) : (
        <>
          {/* Main Content Section */}
          <Grid container spacing={4} sx={{ maxWidth: "1200px", marginTop: 4 }}>
            {/* First Card - Your Progress */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: theme.palette.background.default,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <StarIcon
                  sx={{ fontSize: 50, color: theme.palette.primary.main }}
                />
                <Typography
                  variant="h6"
                  sx={{ marginTop: 2, color: theme.palette.text.primary }}
                >
                  Your Progress
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginTop: 1, color: theme.palette.text.secondary }}
                >
                  Track your improvement over time and get detailed feedback.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 3 }}
                  onClick={navigateToProfile}
                >
                  View My Profile
                </Button>
              </Paper>
            </Grid>

            {/* Second Card - Explore Presentations */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: theme.palette.background.default,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <TrendingUpIcon
                  sx={{ fontSize: 50, color: theme.palette.secondary.main }}
                />
                <Typography
                  variant="h6"
                  sx={{ marginTop: 2, color: theme.palette.text.primary }}
                >
                  Explore Presentations
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginTop: 1, color: theme.palette.text.secondary }}
                >
                  Browse public presentations and gain insights.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: 3 }}
                  onClick={navigateToPresentations}
                >
                  Browse Now
                </Button>
              </Paper>
            </Grid>

            {/* Third Card - Get Started */}
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                  backgroundColor: theme.palette.background.default,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <PlayIcon
                  sx={{ fontSize: 50, color: theme.palette.success.main }}
                />
                <Typography
                  variant="h6"
                  sx={{ marginTop: 2, color: theme.palette.text.primary }}
                >
                  Get Started
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginTop: 1, color: theme.palette.text.secondary }}
                >
                  Ready to record and improve? Let's begin your journey!
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: 3 }}
                  onClick={navigateToProfile}
                >
                  Start Recording
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Home;

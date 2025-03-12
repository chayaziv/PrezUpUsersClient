import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home,
  ListAlt,
  Login,
  PersonAdd,
  PowerSettingsNew,
  Logout,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useAuth from "../hooks/useAuth"; // שימוש ב-hook עבור logout

const NavBar = () => {
  const { handleLogout } = useAuth(); // פונקציה להתנתקות
  const isLoggedIn = useSelector(
    (state: RootState) => state.currentUser.isLoggedIn
  ); // שליפת מצב ההתחברות מה-Redux

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ width: "100%", justifyContent: "center" }}
    >
      <Button color="inherit" component={Link} to="/home" startIcon={<Home />}>
        Home
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/about"
        startIcon={<ListAlt />}
      >
        About
      </Button>

      {isLoggedIn ? (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/record"
            startIcon={<PersonAdd />}
          >
            Record
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/my-presentations"
            startIcon={<ListAlt />}
          >
            My Presentations
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/public-presentations"
            startIcon={<ListAlt />}
          >
            Public Presentations
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/compare"
            startIcon={<ListAlt />}
            
          >
            compare
          </Button>

          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            startIcon={<Login />}
          >
            Login
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/register"
            startIcon={<PowerSettingsNew />}
          >
            Register
          </Button>
        </>
      )}
    </Stack>
  );
};

export default NavBar;

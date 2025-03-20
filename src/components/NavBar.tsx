import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, ListAlt, Login, PersonAdd, PowerSettingsNew, Logout, Add } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { handleLogout } = useAuth();
  const isLoggedIn = useSelector((state: RootState) => state.currentUser.isLoggedIn);

  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          PrezUp
        </Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} fullWidth component={Link} to="/record">
          Add Presentation
        </Button>
      </Box>

      <Divider />

      <List>
        <ListItemButton component={Link} to="/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton component={Link} to="/about">
          <ListItemIcon><ListAlt /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItemButton>

        {isLoggedIn ? (
          <>
            <ListItemButton component={Link} to="/my-presentations">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText primary="My Presentations" />
            </ListItemButton>

            <ListItemButton component={Link} to="/public-presentations">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText primary="Public Presentations" />
            </ListItemButton>

            <ListItemButton component={Link} to="/compare">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText primary="Compare" />
            </ListItemButton>

            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton component={Link} to="/login">
              <ListItemIcon><Login /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>

            <ListItemButton component={Link} to="/register">
              <ListItemIcon><PowerSettingsNew /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default NavBar;

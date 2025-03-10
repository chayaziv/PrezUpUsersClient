import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const AppLayout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NavBar />
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default AppLayout;
{
}

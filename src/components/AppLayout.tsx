import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box, AppBar, Toolbar } from "@mui/material";

const AppLayout = () => {
  ////------------------------------test
  return (
    <>
      <AppBar position="sticky" sx={{ width: "100%" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", padding: 0 }}>
          <NavBar />
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingTop: "64px" }}> {/* הרווח מתחת לתפריט */}
        <Outlet />
      </Box>
    </>
  );
};

export default AppLayout;

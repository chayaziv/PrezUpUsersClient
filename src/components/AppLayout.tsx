import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;

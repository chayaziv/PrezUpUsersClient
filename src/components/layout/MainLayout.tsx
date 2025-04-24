import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Fade, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import TopAppBar from "@/components/layout/TopAppBar";
import SideNavigation from "@/components/layout/SideNavigation";

const OutletSection = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      mt: 8,
      background: "#FAFAFA",
      minHeight: "calc(100vh - 64px)",
    }}
  >
    <Fade in={true} timeout={500}>
      <Box>
        <Outlet />
      </Box>
    </Fade>
  </Box>
);

const Wrapper = ({ children }) => (
  <Box sx={{ display: "flex" }}>{children}</Box>
);

const drawerWidth = 240;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);

  // Get auth state from Redux
  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.currentUser
  );

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Wrapper>
      <TopAppBar
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        isAuthenticated={isLoggedIn}
        userEmail={user.email}
      />

      <SideNavigation
        open={open}
        handleDrawerToggle={handleDrawerToggle}
        isAuthenticated={isLoggedIn}
        drawerWidth={drawerWidth}
      />
      <OutletSection />
    </Wrapper>
  );
};

export default MainLayout;

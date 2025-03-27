import { useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  VideoLibrary as VideoLibraryIcon,
  Person as PersonIcon,
  BarChart as BarChartIcon,
  VideoCall as VideoCallIcon,
  Videocam as VideocamIcon,
  Dashboard as DashboardIcon,
  Chat as ChatIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useState } from "react";

interface SideNavigationProps {
  open: boolean;
  handleDrawerToggle: () => void;
  isAuthenticated: boolean;
  drawerWidth: number;
}

const SideNavigation = ({
  open,
  handleDrawerToggle,
  isAuthenticated,
  drawerWidth,
}: SideNavigationProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "About", icon: <InfoIcon />, path: "/about" },
    { text: "Record Presentation", icon: <VideocamIcon />, path: "/record" },
    { text: "Customer Support", icon: <ChatIcon />, path: "/chat" },
  ];

  const authenticatedMenuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "All Presentations",
      icon: <VideoCallIcon />,
      path: "/presentations",
    },
    { text: "Comparisons", icon: <BarChartIcon />, path: "/comparisons" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isMobile ? open : true}
      onClose={isMobile ? handleDrawerToggle : undefined}
      sx={{
        width: isCollapsed ? 64 : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 64 : drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "none",
          mt: "64px",
          background: "#FAFAFA",
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <Tooltip title={isCollapsed ? "Expand menu" : "Collapse menu"}>
          <IconButton onClick={toggleCollapse} size="small">
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      <List sx={{ mt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) handleDrawerToggle();
              }}
              sx={{
                borderRadius: "0 20px 20px 0",
                mr: 1,
                mb: 0.5,
                minHeight: 48,
                px: 2.5,
                "&.Mui-selected": {
                  background: "rgba(75, 124, 133, 0.08)",
                  color: "primary.main",
                  "&:hover": {
                    background: "rgba(75, 124, 133, 0.12)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "text.secondary",
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 3,
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    fontWeight:
                      location.pathname === item.path ? "medium" : "normal",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}

        {isAuthenticated && (
          <>
            <Divider sx={{ my: 2 }} />
            {authenticatedMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) handleDrawerToggle();
                  }}
                  sx={{
                    borderRadius: "0 20px 20px 0",
                    mr: 1,
                    mb: 0.5,
                    minHeight: 48,
                    px: 2.5,
                    "&.Mui-selected": {
                      background: "rgba(75, 124, 133, 0.08)",
                      color: "primary.main",
                      "&:hover": {
                        background: "rgba(75, 124, 133, 0.12)",
                      },
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                    },
                    "&:hover": {
                      background: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.path
                          ? "primary.main"
                          : "text.secondary",
                      minWidth: 0,
                      mr: isCollapsed ? 0 : 3,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.95rem",
                        fontWeight:
                          location.pathname === item.path ? "medium" : "normal",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
};

export default SideNavigation;

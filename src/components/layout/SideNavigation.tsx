import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
  List,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Home, Info, Video, BarChart, User } from "lucide-react";
import { Chat, ChevronLeft, ChevronRight, Dashboard } from "@mui/icons-material";

import { drawerSx, listItemButtonSx } from "@/styles/sideNavigation";

const SideNavigationDrawer = ({
  open,
  isMobile,
  drawerWidth,
  isCollapsed,
  toggleCollapse,
  handleDrawerToggle,
  children,
}) => {
  const theme = useTheme();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isMobile ? open : true}
      onClose={isMobile ? handleDrawerToggle : undefined}
      sx={drawerSx(isCollapsed, drawerWidth, theme)}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <Tooltip title={isCollapsed ? "Expand menu" : "Collapse menu"}>
          <IconButton onClick={toggleCollapse} size="small">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Tooltip>
      </Box>
      {children}
    </Drawer>
  );
};

const SideNavigationList = ({
  items,
  location,
  navigate,
  isMobile,
  isCollapsed,
  handleDrawerToggle,

  authenticatedItems,
  isAuthenticated,
}) => (
  <>
    <List sx={{ mt: 1 }}>
      {items.map((item) => (
        <SideNavigationItem
          key={item.text}
          item={item}
          location={location}
          navigate={navigate}
          isMobile={isMobile}
          isCollapsed={isCollapsed}
          handleDrawerToggle={handleDrawerToggle}
        />
      ))}
      {isAuthenticated && <Divider sx={{ my: 2 }} />}
      {isAuthenticated &&
        authenticatedItems.map((item) => (
          <SideNavigationItem
            key={item.text}
            item={item}
            location={location}
            navigate={navigate}
            isMobile={isMobile}
            isCollapsed={isCollapsed}
            handleDrawerToggle={handleDrawerToggle}
          />
        ))}
    </List>
  </>
);

const SideNavigationItem = ({
  item,
  location,
  navigate,
  isMobile,
  isCollapsed,
  handleDrawerToggle,
}) => {
  const selected = location.pathname === item.path;
  const IconComponent = item.icon;

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        onClick={() => {
          navigate(item.path);
          if (isMobile) handleDrawerToggle();
        }}
        sx={listItemButtonSx}
      >
        <ListItemIcon
          sx={{
            color: selected ? "primary.main" : "text.secondary",
            minWidth: 0,
            mr: isCollapsed ? 0 : 3,
          }}
        >
          {IconComponent && <IconComponent size={20} />}
        </ListItemIcon>
        {!isCollapsed && (
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontSize: "0.95rem",
              fontWeight: selected ? "medium" : "normal",
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

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
    { text: "Home", icon: Home, path: "/" },
    { text: "About", icon: Info, path: "/about" },
    { text: "Customer Support", icon: Chat, path: "/chat" },
  ];

  const authenticatedMenuItems = [
    { text: "Record Presentation", icon: Video, path: "/record" },
    { text: "Dashboard", icon: Dashboard, path: "/dashboard" },
    { text: "All Presentations", icon: Video, path: "/presentations" },
    { text: "Comparisons", icon: BarChart, path: "/comparisons" },
    { text: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <SideNavigationDrawer
      isMobile={isMobile}
      open={open}
      drawerWidth={drawerWidth}
      isCollapsed={isCollapsed}
      toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      handleDrawerToggle={handleDrawerToggle}
    >
      <SideNavigationList
        items={menuItems}
        authenticatedItems={authenticatedMenuItems}
        isAuthenticated={isAuthenticated}
        location={location}
        navigate={navigate}
        isMobile={isMobile}
        isCollapsed={isCollapsed}
        handleDrawerToggle={handleDrawerToggle}
      />
    </SideNavigationDrawer>
  );
};

export default SideNavigation;

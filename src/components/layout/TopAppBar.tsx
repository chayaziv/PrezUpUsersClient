import { Children, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Videocam as VideocamIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Brightness4 as Brightness4Icon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { appBarStyles, signInButtonStyles } from "@/styles/topAppBarStyle";

const DrawerToggleButton = ({
  open,
  handleDrawerToggle,
}: {
  open: boolean;
  handleDrawerToggle: () => void;
}) => (
  <IconButton
    color="inherit"
    aria-label="open drawer"
    edge="start"
    onClick={handleDrawerToggle}
    sx={{ mr: 2, color: "text.primary" }}
  >
    {open ? <ChevronLeftIcon /> : <MenuIcon />}
  </IconButton>
);

const Title = () => (
  <Typography
    variant="h6"
    noWrap
    component="div"
    sx={{
      flexGrow: 1,
      fontWeight: "bold",
      letterSpacing: "0.5px",
      color: "text.primary",
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    <VideocamIcon sx={{ color: "primary.main" }} /> PresentationAI
  </Typography>
);

const SignInButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      startIcon={<LoginIcon />}
      onClick={() => navigate("/auth/signin")}
      sx={signInButtonStyles}
    >
      Sign In
    </Button>
  );
};

const NotificationsButton = () => {
  const navigate = useNavigate();
  return (
    <Tooltip title="Notifications">
      <IconButton
        sx={{ mr: 1, color: "text.primary" }}
        onClick={() => navigate("/notifications")}
      >
        <Badge badgeContent={3} color="primary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

const ThemeToggleButton = () => (
  <Tooltip title="Toggle theme">
    <IconButton sx={{ mr: 2, color: "text.primary" }}>
      <Brightness4Icon />
    </IconButton>
  </Tooltip>
);
const UserMenuButton = ({
  handleUserMenuClick,
  openUserMenu,
  getAvatarText,
}: {
  handleUserMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  openUserMenu: boolean;
  getAvatarText: () => string;
}) => (
  <Tooltip title="Account settings">
    <IconButton
      onClick={handleUserMenuClick}
      size="small"
      sx={{ p: 0, ml: 1 }}
      aria-controls={openUserMenu ? "account-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={openUserMenu ? "true" : undefined}
    >
      <Avatar>{getAvatarText()}</Avatar>
    </IconButton>
  </Tooltip>
);

const UserMenu = ({
  anchorEl,
  openUserMenu,
  handleCloseUserMenu,
  handleLogout,
}: {
  anchorEl: HTMLElement | null;
  openUserMenu: boolean;
  handleCloseUserMenu: () => void;
  handleLogout: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Menu
      anchorEl={anchorEl}
      open={openUserMenu}
      onClose={handleCloseUserMenu}
      PaperProps={{ elevation: 2 }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          navigate("/profile");
          handleCloseUserMenu();
        }}
      >
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/notifications");
          handleCloseUserMenu();
        }}
      >
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
        </ListItemIcon>
        Notifications
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

const AuthenticatedActions = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center" }}>{children}</div>
);

const Wrapper = ({ children }) => (
  <AppBar position="fixed" sx={appBarStyles}>
    <Toolbar>{children}</Toolbar>
  </AppBar>
);

interface TopAppBarProps {
  open: boolean;
  handleDrawerToggle: () => void;
  isAuthenticated: boolean;
  userEmail: string;
}

const TopAppBar = ({
  open,
  handleDrawerToggle,
  isAuthenticated,
  userEmail,
}: TopAppBarProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    handleCloseUserMenu();
    navigate("/");
    window.location.reload();
  };

  const getAvatarText = () =>
    userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  return (
    <Wrapper>
      <DrawerToggleButton open={open} handleDrawerToggle={handleDrawerToggle} />
      <Title />
      {isAuthenticated ? (
        <AuthenticatedActions>
          <>
            <NotificationsButton />
            <ThemeToggleButton />
            <UserMenuButton
              handleUserMenuClick={handleUserMenuClick}
              openUserMenu={openUserMenu}
              getAvatarText={getAvatarText}
            />
            <UserMenu
              anchorEl={anchorEl}
              openUserMenu={openUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
              handleLogout={handleLogout}
            />
          </>
        </AuthenticatedActions>
      ) : (
        <SignInButton />
      )}
    </Wrapper>
  );
};

export default TopAppBar;

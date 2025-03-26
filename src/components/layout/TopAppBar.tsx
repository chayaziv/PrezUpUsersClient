
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Videocam as VideocamIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Brightness4 as Brightness4Icon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';

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
  userEmail 
}: TopAppBarProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    handleCloseUserMenu();
    navigate('/');
    window.location.reload(); // Refresh to update auth state
  };

  // Get first letter of email for avatar
  const getAvatarText = () => {
    return userEmail ? userEmail.charAt(0).toUpperCase() : 'U';
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        background: '#FFFFFF',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, color: 'text.primary' }}
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <VideocamIcon sx={{ color: 'primary.main' }} /> PresentationAI
        </Typography>

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Notifications">
              <IconButton 
                sx={{ mr: 1, color: 'text.primary' }}
                onClick={() => navigate('/notifications')}
              >
                <Badge badgeContent={3} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle theme">
              <IconButton sx={{ mr: 2, color: 'text.primary' }}>
                <Brightness4Icon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Account settings">
              <IconButton 
                onClick={handleUserMenuClick}
                size="small"
                sx={{ p: 0, ml: 1 }}
                aria-controls={openUserMenu ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? 'true' : undefined}
              >
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    bgcolor: 'secondary.main',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                    border: '2px solid white',
                  }}
                >
                  {getAvatarText()}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openUserMenu}
              onClose={handleCloseUserMenu}
              PaperProps={{
                elevation: 2,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 180,
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => { navigate('/profile'); handleCloseUserMenu(); }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" color="inherit" />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem onClick={() => { navigate('/notifications'); handleCloseUserMenu(); }}>
                <ListItemIcon>
                  <NotificationsIcon fontSize="small" color="inherit" />
                </ListItemIcon>
                Notifications
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="inherit" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Button 
            variant="outlined" 
            startIcon={<LoginIcon />}
            onClick={() => navigate('/auth/signin')}
            sx={{
              borderColor: 'primary.light',
              color: 'primary.main',
              borderRadius: 2,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(75, 124, 133, 0.04)',
              }
            }}
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;

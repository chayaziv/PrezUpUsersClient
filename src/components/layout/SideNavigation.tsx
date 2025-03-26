
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  VideoLibrary as VideoLibraryIcon,
  Person as PersonIcon,
  BarChart as BarChartIcon,
  VideoCall as VideoCallIcon,
  Videocam as VideocamIcon,
  Dashboard as DashboardIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

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
  drawerWidth 
}: SideNavigationProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <InfoIcon />, path: '/about' },
    { text: 'Record Presentation', icon: <VideocamIcon />, path: '/record' },
    { text: 'Customer Support', icon: <ChatIcon />, path: '/chat' },
  ];

  const authenticatedMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'All Presentations', icon: <VideoCallIcon />, path: '/presentations' },
    { text: 'Comparisons', icon: <BarChartIcon />, path: '/comparisons' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={isMobile ? open : true}
      onClose={isMobile ? handleDrawerToggle : undefined}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'none',
          mt: '64px',
          background: '#FAFAFA',
        },
      }}
    >
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
                borderRadius: '0 20px 20px 0',
                mr: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  background: 'rgba(75, 124, 133, 0.08)',
                  color: 'primary.main',
                  '&:hover': {
                    background: 'rgba(75, 124, 133, 0.12)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  }
                },
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 'medium' : 'normal'
                }}
              />
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
                    borderRadius: '0 20px 20px 0',
                    mr: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      background: 'rgba(75, 124, 133, 0.08)',
                      color: 'primary.main',
                      '&:hover': {
                        background: 'rgba(75, 124, 133, 0.12)',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      }
                    },
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    minWidth: 40
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === item.path ? 'medium' : 'normal'
                    }}
                  />
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

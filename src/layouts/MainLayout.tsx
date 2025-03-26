
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Fade, useMediaQuery, useTheme } from '@mui/material';

import TopAppBar from '@/components/layout/TopAppBar';
import SideNavigation from '@/components/layout/SideNavigation';

const drawerWidth = 240;

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const location = useLocation();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  
  // Check authentication status from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    
    setIsAuthenticated(authStatus);
    setUserEmail(email);
  }, [location.pathname]); // Re-check when route changes

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopAppBar 
        open={open} 
        handleDrawerToggle={handleDrawerToggle} 
        isAuthenticated={isAuthenticated} 
        userEmail={userEmail} 
      />
      
      <SideNavigation 
        open={open} 
        handleDrawerToggle={handleDrawerToggle} 
        isAuthenticated={isAuthenticated} 
        drawerWidth={drawerWidth} 
      />
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        mt: 8,
        background: '#FAFAFA',
        minHeight: 'calc(100vh - 64px)'
      }}>
        <Fade in={true} timeout={500}>
          <div>
            <Outlet />
          </div>
        </Fade>
      </Box>
    </Box>
  );
};

export default MainLayout;

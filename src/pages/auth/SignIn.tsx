
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Link, 
  Paper, 
  Avatar,
  InputAdornment,
  IconButton,
  useTheme,
  Divider,
  Fade
} from '@mui/material';
import { 
  LockOutlined as LockOutlinedIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

// Mock auth service (would be replaced with real implementation)
const mockAuthService = {
  login: (email: string, password: string) => {
    // This would be an API call in a real app
    if (email && password) {
      // Store auth token and user info in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      return true;
    }
    return false;
  }
};

const SignIn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulating API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const success = mockAuthService.login(email, password);
      
      if (success) {
        // Force reload to update UI state based on authentication
        window.location.href = '/';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during sign in');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
      window.location.href = '/';
    }, 1000);
  };

  return (
    <Fade in={true} timeout={800}>
      <Container component="main" maxWidth="xs">
        <Paper 
          elevation={6} 
          sx={{ 
            mt: 8, 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            borderRadius: 3,
            background: `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Avatar sx={{ 
            m: 1, 
            bgcolor: 'primary.main',
            width: 56,
            height: 56,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mb: 2, fontWeight: 500 }}>
                {error}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && !email}
              InputProps={{
                sx: { borderRadius: 2 }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && !password}
              InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5, 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                fontWeight: 'bold',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)',
                  transition: 'all 0.3s'
                }
              }}
              endIcon={<LoginIcon />}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSocialLogin('Google')}
                  startIcon={<GoogleIcon />}
                  sx={{ 
                    py: 1.2, 
                    borderRadius: 2,
                    borderWidth: 1.5,
                    '&:hover': {
                      borderWidth: 1.5,
                      backgroundColor: 'rgba(66, 133, 244, 0.04)'
                    }
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSocialLogin('GitHub')}
                  startIcon={<GitHubIcon />}
                  sx={{ 
                    py: 1.2, 
                    borderRadius: 2,
                    borderWidth: 1.5,
                    '&:hover': {
                      borderWidth: 1.5,
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  GitHub
                </Button>
              </Grid>
            </Grid>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link 
                  component={RouterLink} 
                  to="/auth/signup" 
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'none',
                      color: 'primary.dark'
                    }
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
};

export default SignIn;

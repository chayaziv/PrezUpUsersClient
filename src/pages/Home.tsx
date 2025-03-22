
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,

CircularProgress,
Card,
CardContent,
CardMedia,
Avatar,
Chip,
useTheme,
createTheme,
ThemeProvider,
alpha,
Stack,
Divider
} from '@mui/material';
import {
Mic as MicIcon,
PlayArrow as PlayIcon,
TrendingUp as TrendingUpIcon,
Star as StarIcon,
Timeline as TimelineIcon,
People as PeopleIcon,
Speed as SpeedIcon,
Psychology as PsychologyIcon,
BarChart as BarChartIcon,
CloudUpload as CloudUploadIcon,
FormatQuote as FormatQuoteIcon,
NavigateNext as NavigateNextIcon,
Lightbulb as LightbulbIcon,
CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

// Sample data for presentations
const featuredPresentations = [
{
  id: 1,
  title: "How to Pitch to Investors",
  thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  author: "Sarah Johnson",
  role: "Startup Advisor",
  views: 4358,
  rating: 4.8,
  duration: "18:24"
},
{
  id: 2,
  title: "Technical Presentations for Non-Technical Audiences",
  thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  author: "David Chen",
  role: "Product Manager",
  views: 3271,
  rating: 4.7,
  duration: "12:51"
},
{
  id: 3,
  title: "Storytelling in Business Presentations",
  thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  author: "Maria Rodriguez",
  role: "Marketing Director",
  views: 5126,
  rating: 4.9,
  duration: "15:35"
}
];

// Sample testimonials
const testimonials = [
{
  id: 1,
  quote: "PrezUp transformed how I prepare for important pitches. The AI feedback pointed out habits I wasn't even aware of!",
  author: "Alex Thompson",
  role: "Sales Executive",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
},
{
  id: 2,
  quote: "As someone who used to avoid public speaking, this platform has been a game-changer. I practice with it before every presentation.",
  author: "Jennifer Wu",
  role: "UX Designer",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg"
}
];

const features = [
{
  icon: <MicIcon fontSize="large" />,
  title: "HD Recording",
  description: "Crystal clear audio and video capture with noise cancellation"
},
{
  icon: <BarChartIcon fontSize="large" />,
  title: "AI Analysis",
  description: "Get detailed insights on pace, tone, filler words, and engagement"
},
{
  icon: <PsychologyIcon fontSize="large" />,
  title: "Smart Feedback",
  description: "Personalized recommendations based on your presentation style"
},
{
  icon: <CloudUploadIcon fontSize="large" />,
  title: "Cloud Storage",
  description: "Securely store and access your presentations from anywhere"
}
];

const stats = [
{ label: "Active Users", value: "10K+", icon: <PeopleIcon /> },
{ label: "Presentations Analyzed", value: "50K+", icon: <TimelineIcon /> },
{ label: "Improvement Rate", value: "87%", icon: <TrendingUpIcon /> },
{ label: "AI Response Time", value: "<2s", icon: <SpeedIcon /> }
];

// Create a custom theme
const customTheme = createTheme({
palette: {
  primary: {
    main: '#3f51b5',
    light: '#757de8',
    dark: '#002984',
  },
  secondary: {
    main: '#f50057',
    light: '#ff4081',
    dark: '#c51162',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
},
typography: {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h2: {
    fontWeight: 700,
  },
  h4: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 500,
  },
},
shape: {
  borderRadius: 12,
},
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 8,
        padding: '8px 16px',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
},
});

const Home = () => {
const theme = customTheme;
const navigate = useNavigate();
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simulate loading state for demonstration
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1500);
  
  return () => clearTimeout(timer);
}, []);

if (loading) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 3,
        background: theme.palette.background.default
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="primary">
        PrezUp
      </Typography>
      <CircularProgress color="primary" size={48} />
      <Typography variant="body2" color="text.secondary">
        Loading your presentation workspace...
      </Typography>
    </Box>
  );
}

return (
  <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: 'background.default', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
            zIndex: 0
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-5%',
            left: '-5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`,
            zIndex: 0
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Chip
                  label="AI-Powered Presentation Coach"
                  color="primary"
                  size="small"
                  sx={{ mb: 2, fontWeight: 600 }}
                />
                <Typography 
                  variant="h2" 
                  component="h1" 
                  fontWeight="bold"
                  sx={{ 
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: theme.palette.primary.main
                  }}
                >
                  Elevate Your Presentation Skills
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{ mb: 4, fontWeight: 'normal' }}
                >
                  Record, analyze, and perfect your presentations with real-time AI feedback and expert insights.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                >
                  <Button 
                    variant="contained" 
                    size="large"
                    color="primary"
                    startIcon={<MicIcon />}
                    sx={{ 
                      borderRadius: 8,
                      px: 3,
                      py: 1.5,
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                  >
                    Start Recording
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    endIcon={<NavigateNextIcon />}
                    sx={{ 
                      borderRadius: 8,
                      px: 3,
                      py: 1.5
                    }}
                  >
                    Explore Presentations
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '320px', md: '480px' },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: `0 16px 40px ${alpha('#000', 0.15)}`,
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Person giving presentation"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography color="#ffffff" fontWeight="medium">
                    Live AI Feedback
                  </Typography>
                  <Button 
                    variant="contained"
                    sx={{ 
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: alpha(theme.palette.primary.main, 0.8),
                      '&:hover': {
                        bgcolor: theme.palette.primary.main
                      }
                    }}
                  >
                    <PlayIcon />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Stats Section */}
          <Grid 
            container 
            spacing={3} 
            justifyContent="center"
            sx={{ 
              mt: 8,
              pb: 2
            }}
          >
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(8px)',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  }}
                >
                  <Box color="primary.main" mb={1}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="bold" mb={0.5}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            Smart Features for Better Presentations
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: '800px', mx: 'auto', fontWeight: 'normal' }}
          >
            Our AI-powered platform provides all the tools you need to analyze, 
            improve, and perfect your presentation skills.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mb: 3
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Presentations */}
      <Box sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5), py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight="bold">
              Top Presentations
            </Typography>
            <Button 
              variant="outlined" 
              endIcon={<NavigateNextIcon />}
              sx={{ borderRadius: 8 }}
            >
              View All
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {featuredPresentations.map((presentation) => (
              <Grid item xs={12} sm={6} md={4} key={presentation.id}>
                <Card 
                  sx={{ 
                    borderRadius: 4, 
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={presentation.thumbnail}
                      alt={presentation.title}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12,
                        bgcolor: 'rgba(0,0,0,0.6)',
                        color: '#ffffff',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {presentation.duration}
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0,0,0,0.3)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          minWidth: 'auto',
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: theme.palette.primary.main,
                          color: '#ffffff',
                          '&:hover': {
                            bgcolor: theme.palette.primary.dark
                          }
                        }}
                      >
                        <PlayIcon />
                      </Button>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="h6" fontWeight="medium" gutterBottom noWrap>
                      {presentation.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        src={`https://randomuser.me/api/portraits/${presentation.id % 2 === 0 ? 'women' : 'men'}/${presentation.id + 20}.jpg`}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {presentation.author}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: theme.palette.warning.main, fontSize: '0.875rem', mr: 0.5 }} />
                        <Typography variant="body2" fontWeight="medium">
                          {presentation.rating}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {presentation.views.toLocaleString()} views
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            What Our Users Say
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: '700px', mx: 'auto', fontWeight: 'normal' }}
          >
            Join thousands of professionals who have transformed their presentation skills
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={6} key={testimonial.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  height: '100%',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 24,
                    left: 24,
                    width: 40,
                    height: 40,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23${theme.palette.primary.main.replace('#', '')}' opacity='0.2'%3E%3Cpath d='M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.626.41-2.23.315-.606.814-1.083 1.492-1.425.68-.35 1.34-.52 2.013-.52.42 0 .828.06 1.224.174.395.115.75.317 1.06.607.312.29.563.656.75 1.096.188.44.3.95.3 1.53 0 .66-.08 1.26-.24 1.783-.16.522-.39.968-.7 1.335-.31.366-.67.652-1.08.853-.41.2-.84.3-1.29.3s-.87-.09-1.26-.28-.7-.47-.93-.83c.04-.5.21-.95.52-1.35.31-.4.7-.73 1.19-.98zm7.46 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.813-.56-.12-1.07-.13-1.54-.028-.16-.95.09-1.626.407-2.23.315-.606.814-1.083 1.494-1.425.68-.35 1.34-.52 2.012-.52.42 0 .83.06 1.225.174.394.115.75.317 1.06.607.312.29.563.656.75 1.096.19.44.3.95.3 1.53 0 .66-.08 1.26-.24 1.783-.16.522-.4.968-.7 1.335-.302.366-.664.652-1.084.853-.42.2-.844.3-1.288.3-.443 0-.87-.09-1.263-.28-.394-.19-.7-.47-.927-.83.04-.5.21-.95.526-1.35.315-.4.705-.73 1.19-.98z'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    opacity: 0.2,
                    zIndex: 1
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ fontStyle: 'italic', mb: 3 }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

     
    </Box>
  </ThemeProvider>
);
};

export default Home;
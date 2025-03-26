
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Container,
  Paper,
  useTheme
} from '@mui/material';
import { 
  Videocam as VideocamIcon,
  Speed as SpeedIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <RecordVoiceOverIcon fontSize="large" />,
      title: "Speech Analysis",
      description: "Get detailed feedback on your speaking clarity, fluency, and engagement."
    },
    {
      icon: <PsychologyIcon fontSize="large" />,
      title: "AI Insights",
      description: "Receive personalized tips to improve your presentation style."
    },
    {
      icon: <SpeedIcon fontSize="large" />,
      title: "Performance Metrics",
      description: "Track your progress over time with comprehensive metrics."
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'primary.main',
          color: 'white',
          mb: 6,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundImage: 'linear-gradient(45deg, #2E5077 0%, #4A6D8C 100%)',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Elevate Your Presentations with AI
              </Typography>
              <Typography variant="h5" color="inherit" paragraph sx={{ opacity: 0.9, mb: 4 }}>
                Record and analyze your presentations to get personalized feedback and improve your public speaking skills.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<VideocamIcon />}
                onClick={() => navigate('/record')}
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(230, 57, 70, 0.3)'
                }}
              >
                Start Recording
              </Button>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="/placeholder.svg"
                alt="Presentation"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
                  transform: 'perspective(1000px) rotateY(-15deg)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="primary.main"
          gutterBottom
          sx={{ mb: 6 }}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <Box 
                  sx={{ 
                    p: 3, 
                    display: 'flex', 
                    justifyContent: 'center',
                    color: 'primary.main'
                  }}
                >
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h3" color="primary.main">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper 
          sx={{ 
            p: 6, 
            borderRadius: 3,
            textAlign: 'center',
            backgroundImage: 'linear-gradient(to right, #e6f2ff 0%, #f0f7ff 100%)',
          }}
        >
          <Typography variant="h4" gutterBottom color="primary.dark">
            Ready to improve your presentation skills?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            Start recording your presentations today and get detailed AI feedback to help you become a more confident and effective speaker.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/auth/signup')}
            sx={{ 
              px: 4, 
              py: 1.5,
              borderRadius: 2
            }}
          >
            Create Your Account
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;

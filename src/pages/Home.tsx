import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Videocam as VideocamIcon,
  Speed as SpeedIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Psychology as PsychologyIcon,
} from "@mui/icons-material";
import {
  heroPaperStyles,
  heroContainerStyles,
  heroTitleStyles,
  heroSubtitleStyles,
  heroButtonStyles,
  heroImageStyles,
  featuresTitleStyles,
  featureCardStyles,
  featureIconStyles,
  featureTitleStyles,
  ctaPaperStyles,
  ctaTextStyles,
  ctaButtonStyles,
} from "../styles/homeStyle";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <RecordVoiceOverIcon fontSize="large" />,
      title: "Speech Analysis",
      description:
        "Get detailed feedback on your speaking clarity, fluency, and engagement.",
    },
    {
      icon: <PsychologyIcon fontSize="large" />,
      title: "AI Insights",
      description:
        "Receive personalized tips to improve your presentation style.",
    },
    {
      icon: <SpeedIcon fontSize="large" />,
      title: "Performance Metrics",
      description: "Track your progress over time with comprehensive metrics.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper sx={heroPaperStyles}>
        <Container maxWidth="lg" sx={heroContainerStyles}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={heroTitleStyles}
              >
                Elevate Your Presentations with AI
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                paragraph
                sx={heroSubtitleStyles}
              >
                Record and analyze your presentations to get personalized
                feedback and improve your public speaking skills.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<VideocamIcon />}
                onClick={() => navigate("/record")}
                sx={heroButtonStyles}
              >
                Start Recording
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Box
                component="img"
                src="/placeholder.svg"
                alt="Presentation"
                sx={heroImageStyles}
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
          sx={featuresTitleStyles}
        >
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card sx={featureCardStyles}>
                <Box sx={featureIconStyles}>{feature.icon}</Box>
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={featureTitleStyles}
                  >
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
        <Paper sx={ctaPaperStyles}>
          <Typography variant="h4" gutterBottom color="primary.dark">
            Ready to improve your presentation skills?
          </Typography>
          <Typography variant="body1" paragraph sx={ctaTextStyles}>
            Start recording your presentations today and get detailed AI
            feedback to help you become a more confident and effective speaker.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/auth/signup")}
            sx={ctaButtonStyles}
          >
            Create Your Account
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;

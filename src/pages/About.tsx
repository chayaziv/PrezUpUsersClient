
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Psychology as PsychologyIcon,
  BarChart as BarChartIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  School as SchoolIcon,
  Grain as GrainIcon
} from '@mui/icons-material';

const About = () => {
  const metrics = [
    {
      icon: <RecordVoiceOverIcon fontSize="large" color="primary" />,
      title: "Clarity Analysis",
      description: "Evaluates how clearly your ideas are expressed and understood."
    },
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: "Fluency Scoring",
      description: "Measures your speech flow, pace, and smoothness of delivery."
    },
    {
      icon: <BarChartIcon fontSize="large" color="primary" />,
      title: "Confidence Metrics",
      description: "Assesses your perceived confidence level through voice and verbal cues."
    },
    {
      icon: <PsychologyIcon fontSize="large" color="primary" />,
      title: "Engagement Index",
      description: "Evaluates how engaging and captivating your presentation is."
    },
    {
      icon: <GrainIcon fontSize="large" color="primary" />,
      title: "Speech Style",
      description: "Analyzes your speaking style and provides tailored feedback."
    }
  ];

  const benefits = [
    "Improve your public speaking skills with targeted feedback",
    "Track your progress over time with comprehensive metrics",
    "Compare your presentations with others to gain new insights",
    "Receive personalized tips based on AI analysis",
    "Build confidence through objective performance measurement"
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          color="primary"
          align="center"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          About PresentationAI
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          align="center"
          gutterBottom
          sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
        >
          Empowering speakers with AI-driven presentation analysis and feedback
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 3,
            backgroundColor: 'primary.main',
            color: 'white'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                PresentationAI is dedicated to helping people become more effective and confident presenters through the power of artificial intelligence. Our platform provides detailed analysis and actionable feedback on your presentations.
              </Typography>
              <Typography variant="body1">
                Whether you're preparing for an important business meeting, academic presentation, or personal development, our AI tools will help you identify areas for improvement and track your progress over time.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="/placeholder.svg"
                alt="AI Analysis"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        <Typography
          variant="h3"
          component="h2"
          color="primary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          How It Works
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ mb: 4 }}
        >
          Our advanced AI analyzes multiple aspects of your presentations to provide comprehensive feedback and actionable insights:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {metric.icon}
                  </Box>
                  <Typography variant="h6" component="h3" align="center" gutterBottom>
                    {metric.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {metric.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 6 }} />

        <Typography
          variant="h3"
          component="h2"
          color="primary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Benefits
        </Typography>

        <Paper elevation={2} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <List>
            {benefits.map((benefit, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={benefit} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Typography
          variant="h3"
          component="h2"
          color="primary"
          gutterBottom
          sx={{ mb: 3 }}
        >
          Our Team
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ mb: 4 }}
        >
          PresentationAI was founded by a team of public speaking coaches, data scientists, and software engineers with a shared passion for helping people communicate more effectively.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[1, 2, 3].map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
                  >
                    T
                  </Avatar>
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    Team Member {member}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Co-Founder & Position
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Short bio of the team member highlighting their expertise and passion for presentation coaching and AI.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default About;

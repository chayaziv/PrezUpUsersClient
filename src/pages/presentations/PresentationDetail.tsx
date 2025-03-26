
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Grid, 
  Chip, 
  Button, 
  Divider, 
  LinearProgress, 
  Avatar, 
  IconButton,
  Card,
  CardContent,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  PlayCircleOutlined as PlayIcon, 
  PauseCircleOutlined as PauseIcon, 
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon2,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  VolumeMute as VolumeMuteIcon,
} from '@mui/icons-material';

// Mock presentation data
const mockPresentationData = {
  id: 1,
  title: "Quarterly Business Review",
  description: "A comprehensive overview of Q3 business performance with insights on market trends and projections for Q4.",
  date: "2023-09-20T14:30:00Z",
  duration: 420, // in seconds
  audioUrl: "https://file-examples.com/storage/fe9278ad7f642dbd39ab5c9/2017/11/file_example_MP3_700KB.mp3",
  thumbnailUrl: "https://source.unsplash.com/random/300x200/?presentation",
  clarity: 85,
  clarityFeedback: "Your presentation structure was clear and logical. Consider adding more visual cues to guide the audience through complex sections.",
  fluency: 92,
  fluencyFeedback: "Excellent speech flow with minimal filler words. Your pace variation effectively emphasized key points.",
  confidence: 88,
  confidenceFeedback: "Your voice projection and posture convey strong confidence. More direct eye contact would further enhance this impression.",
  engagement: 78,
  engagementFeedback: "You used good storytelling techniques. Consider incorporating more audience interaction techniques and rhetorical questions.",
  speechStyle: 90,
  speechStyleFeedback: "Your vocal variety and emphasis were excellent. Consider varying your speaking pace a bit more for dramatic effect at key moments.",
  score: 86,
  tips: [
    "Practice making direct eye contact with various audience members",
    "Add brief pauses after key points to let information sink in",
    "Incorporate one or two more examples that relate to your audience's industry",
    "Consider starting with a more provocative opening question or statement",
    "Add a clear call-to-action at the end of your presentation"
  ],
  isPublic: true,
  userId: 2,
  user: {
    id: 2,
    name: "Alex Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    jobTitle: "Senior Product Manager"
  },
  tags: [
    { id: 1, name: "Business" },
    { id: 2, name: "Sales" },
    { id: 3, name: "Quarterly Review" }
  ],
  upvotes: 24,
  views: 127,
  userHasUpvoted: false
};

const PresentationDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [presentation, setPresentation] = useState(mockPresentationData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(presentation.userHasUpvoted);
  const [upvoteCount, setUpvoteCount] = useState(presentation.upvotes);
  
  // Audio element ref
  const audioRef = useState(new Audio(presentation.audioUrl))[0];
  
  useEffect(() => {
    // Fetch presentation data based on ID
    // For now, using mock data
    console.log(`Fetching presentation with ID: ${id}`);
    
    // Set up audio event listeners
    audioRef.addEventListener('timeupdate', updateProgress);
    audioRef.addEventListener('ended', handleEnded);
    audioRef.volume = volume;
    
    return () => {
      audioRef.pause();
      audioRef.removeEventListener('timeupdate', updateProgress);
      audioRef.removeEventListener('ended', handleEnded);
    };
  }, [id]);
  
  // Audio control functions
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const updateProgress = () => {
    setCurrentTime(audioRef.currentTime);
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const seekTo = (e) => {
    const seekPosition = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
    const newTime = seekPosition * presentation.duration;
    audioRef.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const toggleMute = () => {
    audioRef.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e, newValue) => {
    const newVolume = newValue / 100;
    setVolume(newVolume);
    audioRef.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
      audioRef.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.muted = false;
    }
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoteCount(upvoteCount + 1);
    }
    setHasUpvoted(!hasUpvoted);
  };
  
  // Progress calculation for score components
  const getProgressColor = (score) => {
    if (score >= 90) return theme.palette.success.main;
    if (score >= 75) return theme.palette.info.main;
    if (score >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mr: 2, color: 'primary.main' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Presentation Details
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        {/* Left column - Presentation info and audio player */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  src={presentation.user.avatar} 
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {presentation.user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {presentation.user.jobTitle}
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                  <Tooltip title="Share presentation">
                    <IconButton color="primary" sx={{ mr: 1 }}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={hasUpvoted ? "Remove upvote" : "Upvote this presentation"}>
                    <IconButton 
                      color={hasUpvoted ? "primary" : "default"}
                      onClick={handleUpvote}
                    >
                      {hasUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    </IconButton>
                  </Tooltip>
                  <Typography variant="body2" sx={{ ml: 1, minWidth: 24 }}>
                    {upvoteCount}
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                {presentation.title}
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                {presentation.description}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {presentation.tags.map(tag => (
                  <Chip 
                    key={tag.id} 
                    label={tag.name} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {new Date(presentation.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {formatTime(presentation.duration)}
                </Typography>
              </Box>
              
              {/* Audio Player */}
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  mt: 3, 
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #f0f0f0 0%, #ffffff 100%)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <IconButton 
                    onClick={togglePlayPause} 
                    color="primary" 
                    sx={{ mr: 1 }}
                  >
                    {isPlaying ? <PauseIcon2 /> : <PlayArrowIcon />}
                  </IconButton>
                  
                  <Box sx={{ 
                    flex: 1, 
                    mx: 2, 
                    height: 48, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center' 
                  }}>
                    <Box 
                      sx={{ 
                        height: 4, 
                        bgcolor: 'rgba(0,0,0,0.05)', 
                        borderRadius: 2, 
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onClick={seekTo}
                    >
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${(currentTime / presentation.duration) * 100}%`,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(currentTime)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(presentation.duration)}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <IconButton onClick={toggleMute} color="primary">
                    {isMuted ? <VolumeOffIcon /> : 
                      volume < 0.1 ? <VolumeMuteIcon /> : <VolumeUpIcon />}
                  </IconButton>
                </Box>
              </Paper>
            </Paper>
          </motion.div>
          
          {/* Feedback and Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3, 
                borderRadius: 4,
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                AI Analysis & Tips
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Key Improvement Tips:
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  {presentation.tips.map((tip, index) => (
                    <Typography component="li" variant="body2" key={index} sx={{ mb: 1 }}>
                      {tip}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
        
        {/* Right column - Performance metrics */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Paper 
              elevation={1} 
              sx={{ 
                p: 3,
                mb: 4, 
                borderRadius: 4,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight="bold">
                  Overall Score
                </Typography>
                <Box 
                  sx={{ 
                    ml: 'auto',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    border: `8px solid ${getProgressColor(presentation.score)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" color={getProgressColor(presentation.score)}>
                    {presentation.score}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 3 }} />
              
              <Stack spacing={3}>
                {[
                  { label: 'Clarity', value: presentation.clarity, feedback: presentation.clarityFeedback },
                  { label: 'Fluency', value: presentation.fluency, feedback: presentation.fluencyFeedback },
                  { label: 'Confidence', value: presentation.confidence, feedback: presentation.confidenceFeedback },
                  { label: 'Engagement', value: presentation.engagement, feedback: presentation.engagementFeedback },
                  { label: 'Speech Style', value: presentation.speechStyle, feedback: presentation.speechStyleFeedback },
                ].map((metric) => (
                  <Card key={metric.label} variant="outlined" sx={{ borderRadius: 3, boxShadow: 'none' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {metric.label}
                        </Typography>
                        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                          <Typography 
                            variant="body2" 
                            fontWeight="bold" 
                            sx={{ 
                              color: getProgressColor(metric.value),
                              mr: 1
                            }}
                          >
                            {metric.value}/100
                          </Typography>
                        </Box>
                      </Box>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={metric.value} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          mb: 2,
                          bgcolor: 'rgba(0,0,0,0.04)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressColor(metric.value),
                            borderRadius: 4,
                          }
                        }}
                      />
                      
                      <Typography variant="body2" color="text.secondary">
                        {metric.feedback}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PresentationDetail;

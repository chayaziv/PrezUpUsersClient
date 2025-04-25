import { useState, useEffect, useRef, Children } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
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
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
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
} from "@mui/icons-material";
import { PresentationType } from "@/types/presentation";
import { fetchPublicPresentations } from "../../store/slices/PublicPresentationsSlice";
import PreviewPlayer from "@/components/recording/finalize/PreviewPlayer";
import {  getProgressColor } from "@/utils/format";




const PresentationView = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector(
    (state: RootState) => state.publicPresentations
  );

  // State
  const [presentation, setPresentation] = useState<PresentationType | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Audio element ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio control functions
  const updateProgress = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !presentation?.duration) return;
    const seekPosition = e.nativeEvent.offsetX / e.currentTarget.clientWidth;
    const newTime = seekPosition * presentation.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: Event, newValue: number | number[]) => {
    if (!audioRef.current) return;
    const newVolume = (newValue as number) / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchPublicPresentations());
    }
  }, [dispatch, list.length]);

  useEffect(() => {
    // Find the presentation by ID
    const foundPresentation = list.find((p) => p.id === Number(id));
    if (foundPresentation) {
      setPresentation(foundPresentation);

      // Initialize audio element
      const audio = new Audio(foundPresentation.fileUrl);
      audioRef.current = audio;

      // Set up audio event listeners
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnded);
      audio.volume = volume;

      return () => {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [id, list, volume]);

  if (loading || !presentation) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Header />

      <MainContent>
        <Info>
          <UserInfo
            name={presentation.user?.name}
            jobTitle={presentation.user?.jobTitle}
          />
          <MetaData presentation={presentation} />

          <PreviewPlayer videoUrl={presentation.fileUrl} />

          <Tips tips={presentation.tips} />
        </Info>

        <Metrics>
          <OverallScore score={presentation.score} />

          <Divider sx={{ mb: 3 }} />

          <PerformanceMetrics presentation={presentation} />
        </Metrics>
      </MainContent>
    </Container>
  );
};

export default PresentationView;

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ mr: 2, color: "primary.main" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" fontWeight="bold">
        Presentation Details
      </Typography>
    </Box>
  );
};

const MainContent = ({ children }) => (
  <Grid container spacing={4}>
    {children}
  </Grid>
);

const Info = ({ children }) => (
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
          overflow: "hidden",
        }}
      >
        {children}
      </Paper>
    </motion.div>
  </Grid>
);

const Metrics = ({ children }) => (
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
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        {children}
      </Paper>
    </motion.div>
  </Grid>
);

const UserInfo = ({ name, jobTitle }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    {/* <Avatar
                  src={presentation.user?.avatar}
                  sx={{ width: 48, height: 48, mr: 2 }}
                /> */}
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {jobTitle}
      </Typography>
    </Box>
    <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
      <Tooltip title="Share presentation">
        <IconButton color="primary" sx={{ mr: 1 }}>
          <ShareIcon />
        </IconButton>
      </Tooltip>
      {/* <Tooltip
                    title={
                      hasUpvoted ? "Remove upvote" : "Upvote this presentation"
                    }
                  >
                    <IconButton
                      color={hasUpvoted ? "primary" : "default"}
                      onClick={handleUpvote}
                    >
                      {hasUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    </IconButton>
                  </Tooltip> */}
      {/* <Typography variant="body2" sx={{ ml: 1, minWidth: 24 }}>
                    {upvoteCount}
                  </Typography> */}
    </Box>
  </Box>
);

const MetaData = ({ presentation }) => (
  <>
    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
      {presentation.title}
    </Typography>

    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
      {presentation.tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}
    </Box>

    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {new Date(presentation.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Duration: {formatTime(presentation.duration || 0)}
      </Typography>
    </Box>
  </>
);

const Tips = ({ tips }) => (
  <Box sx={{ mb: 3, mt: 3 }}>
    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
      Key Improvement Tips:
    </Typography>
    <Typography variant="body2" sx={{ mb: 1 }}>
      {tips}
    </Typography>
  </Box>
);

const OverallScore = ({ score }) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
    <Typography variant="h5" fontWeight="bold">
      Overall Score
    </Typography>
    <Box
      sx={{
        ml: "auto",
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: `8px solid ${getProgressColor(score)}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        color={getProgressColor(score)}
      >
        {score}
      </Typography>
    </Box>
  </Box>
);

const PerformanceMetrics = ({ presentation }) => (
  <Stack spacing={3}>
    {[
      {
        label: "Clarity",
        value: presentation.clarity,
        feedback: presentation.clarityFeedback,
      },
      {
        label: "Fluency",
        value: presentation.fluency,
        feedback: presentation.fluencyFeedback,
      },
      {
        label: "Confidence",
        value: presentation.confidence,
        feedback: presentation.confidenceFeedback,
      },
      {
        label: "Engagement",
        value: presentation.engagement,
        feedback: presentation.engagementFeedback,
      },
      {
        label: "Speech Style",
        value: presentation.speechStyle,
        feedback: presentation.speechStyleFeedback,
      },
    ].map((metric) => (
      <Card
        key={metric.label}
        variant="outlined"
        sx={{ borderRadius: 3, boxShadow: "none" }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {metric.label}
            </Typography>
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  color: getProgressColor(metric.value),
                  mr: 1,
                }}
              >
                {metric.value}/10
              </Typography>
            </Box>
          </Box>

          <LinearProgress
            variant="determinate"
            value={metric.value * 10}
            sx={{
              height: 8,
              borderRadius: 4,
              mb: 2,
              bgcolor: "rgba(0,0,0,0.04)",
              "& .MuiLinearProgress-bar": {
                bgcolor: getProgressColor(metric.value),
                borderRadius: 4,
              },
            }}
          />

          <Typography variant="body2" color="text.secondary">
            {metric.feedback}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Stack>
);

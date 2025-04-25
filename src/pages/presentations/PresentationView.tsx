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
import { getProgressColor } from "@/utils/format";
import Info from "./view/Info";
import Metrics from "./view/Metrics";

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
        <Info presentation={presentation} />

        <Metrics presentation={presentation} />
      </MainContent>
    </Container>
  );
};

export default PresentationView;

import React from "react";
import { motion } from "framer-motion";
import { Paper, Box, IconButton, Slider, Typography } from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  FullscreenRounded as FullscreenIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import useVideoPlayer from "@/hooks/useMediaPlayer";
import {
  styledContainer,
  videoStyle,
  playOverlay,
  playButton,
  controlsOverlay,
  sliderSection,
  controlsBar,
  sideSection,
  controlIconButton,
  timeText,
  volumeSlider,
  fullscreenButton,
} from "../../../styles/previewPlayerStyle";

const Video = ({
  videoRef,
  videoUrl,
  handleTimeUpdate,
  setIsPlaying,
  setIsMuted,
  setDuration,
}) => (
  <video
    ref={videoRef}
    src={videoUrl}
    style={videoStyle}
    onTimeUpdate={handleTimeUpdate}
    onPlay={() => setIsPlaying(true)}
    onPause={() => setIsPlaying(false)}
    onVolumeChange={() => setIsMuted(videoRef.current?.muted || false)}
    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
  />
);

const PlayOverlay = ({ onClick }) => (
  <Box sx={playOverlay}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <IconButton onClick={onClick} sx={playButton}>
        <PlayArrowIcon fontSize="large" />
      </IconButton>
    </motion.div>
  </Box>
);

const ControlsOverlay = ({ isVisible, children }) => (
  <Box sx={controlsOverlay(isVisible)}>{children}</Box>
);

const SliderSection = ({ currentTime, duration, onSliderChange }) => (
  <Slider
    size="small"
    value={currentTime}
    max={duration || 100}
    onChange={onSliderChange}
    aria-label="Video progress"
    sx={sliderSection}
  />
);

const ControlsBar = ({ children }) => <Box sx={controlsBar}>{children}</Box>;

const RightSide = ({ children }) => <Box sx={sideSection}>{children}</Box>;

const LeftSide = ({ children }) => <Box sx={sideSection}>{children}</Box>;

const PlayPauseButton = ({ isPlaying, onClick }) => (
  <IconButton onClick={onClick} size="small" sx={controlIconButton}>
    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
  </IconButton>
);

const RestartButton = ({ onClick }) => (
  <IconButton onClick={onClick} size="small" sx={controlIconButton}>
    <RefreshIcon />
  </IconButton>
);

const TimeDisplay = ({ currentTime, duration, formatTime }) => (
  <Typography variant="caption" sx={timeText}>
    {formatTime(currentTime)} / {formatTime(duration)}
  </Typography>
);

const VolumeControl = ({ isMuted, volume, onMuteToggle, onVolumeChange }) => (
  <>
    <IconButton onClick={onMuteToggle} size="small" sx={controlIconButton}>
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
    <Slider
      size="small"
      value={isMuted ? 0 : volume}
      max={1}
      min={0}
      step={0.1}
      onChange={onVolumeChange}
      aria-label="Volume"
      sx={volumeSlider}
    />
  </>
);

const FullscreenButton = ({ onClick }) => (
  <IconButton onClick={onClick} size="small" sx={fullscreenButton}>
    <FullscreenIcon />
  </IconButton>
);

const Wrapper = ({ children, setIsControlsVisible }) => (
  <Paper
    component={motion.div}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", delay: 0.3, stiffness: 100, damping: 15 }}
    elevation={2}
    sx={styledContainer}
    onMouseEnter={() => setIsControlsVisible(true)}
    onMouseLeave={() => setIsControlsVisible(false)}
  >
    <Box sx={{ position: "relative", width: "100%", bgcolor: "#000" }}>
      {children}
    </Box>
  </Paper>
);

interface PreviewPlayerProps {
  videoUrl: string;
}

const PreviewPlayer: React.FC<PreviewPlayerProps> = ({ videoUrl }) => {
  const {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isControlsVisible,
    setIsControlsVisible,
    handlePlayPause,
    handleTimeUpdate,
    handleSliderChange,
    handleVolumeChange,
    handleMuteToggle,
    handleFullscreen,
    handleRestart,
    setIsPlaying,
    setDuration,
    setIsMuted,
  } = useVideoPlayer();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <Wrapper setIsControlsVisible={setIsControlsVisible}>
      <Video
        videoRef={videoRef}
        videoUrl={videoUrl}
        handleTimeUpdate={handleTimeUpdate}
        setIsPlaying={setIsPlaying}
        setIsMuted={setIsMuted}
        setDuration={setDuration}
      />

      {!isPlaying && <PlayOverlay onClick={handlePlayPause} />}

      <ControlsOverlay isVisible={isControlsVisible || !isPlaying}>
        <SliderSection
          currentTime={currentTime}
          duration={duration}
          onSliderChange={handleSliderChange}
        />

        <ControlsBar>
          <LeftSide>
            <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} />
            <RestartButton onClick={handleRestart} />
            <TimeDisplay
              currentTime={currentTime}
              duration={duration}
              formatTime={formatTime}
            />
          </LeftSide>

          <RightSide>
            <VolumeControl
              isMuted={isMuted}
              volume={volume}
              onMuteToggle={handleMuteToggle}
              onVolumeChange={handleVolumeChange}
            />
            <FullscreenButton onClick={handleFullscreen} />
          </RightSide>
        </ControlsBar>
      </ControlsOverlay>
    </Wrapper>
  );
};

export default PreviewPlayer;

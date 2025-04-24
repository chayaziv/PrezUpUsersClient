import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Paper,
  Box,
  IconButton,
  Slider,
  Typography,
  alpha,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  FullscreenRounded as FullscreenIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

import useVideoPlayer from "@/hooks/useMediaPlayer";

const StyledContainer = ({ children, ...props }) => (
  <Paper
    component={motion.div}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", delay: 0.3, stiffness: 100, damping: 15 }}
    elevation={2}
    sx={{
      mb: 4,
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
      position: "relative",
    }}
    {...props}
  >
    {children}
  </Paper>
);

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
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      maxHeight: "450px",
      backgroundColor: "#000",
      position: "relative",
      zIndex: 0,
      display: "block",
    }}
    onTimeUpdate={handleTimeUpdate}
    onPlay={() => setIsPlaying(true)}
    onPause={() => setIsPlaying(false)}
    onVolumeChange={() => setIsMuted(videoRef.current?.muted || false)}
    onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
  />
);
const PlayOverlay = ({ onClick }) => (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 5,
      opacity: 0.9,
    }}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 2,
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        <PlayArrowIcon fontSize="large" />
      </IconButton>
    </motion.div>
  </Box>
);

const ControlsOverlay = ({ isVisible, children }) => (
  <Box
    sx={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      p: 1.5,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
      transition: "opacity 0.3s ease",
      opacity: isVisible ? 1 : 0,
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1,
    }}
  >
    {children}
  </Box>
);

const SliderSection = ({ currentTime, duration, onSliderChange }) => (
  <Slider
    size="small"
    value={currentTime}
    max={duration || 100}
    onChange={onSliderChange}
    aria-label="Video progress"
    sx={{
      color: "primary.main",
      height: 4,
      "& .MuiSlider-thumb": {
        width: 8,
        height: 8,
        "&:hover, &.Mui-focusVisible": {
          boxShadow: `0px 0px 0px 8px ${alpha("#3A36E0", 0.16)}`,
        },
      },
    }}
  />
);

const ControlsBar = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 1,
    }}
  >
    {children}
  </Box>
);
const RightSide = ({ children }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>{children}</Box>
);

const LeftSide = ({ children }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>{children}</Box>
);

const PlayPauseButton = ({ isPlaying, onClick }) => (
  <IconButton onClick={onClick} size="small" sx={{ color: "white", mr: 1 }}>
    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
  </IconButton>
);

const RestartButton = ({ onClick }) => (
  <IconButton onClick={onClick} size="small" sx={{ color: "white", mr: 1 }}>
    <RefreshIcon />
  </IconButton>
);

const TimeDisplay = ({ currentTime, duration, formatTime }) => (
  <Typography variant="caption" sx={{ color: "white" }}>
    {formatTime(currentTime)} / {formatTime(duration)}
  </Typography>
);

const VolumeControl = ({ isMuted, volume, onMuteToggle, onVolumeChange }) => (
  <>
    <IconButton onClick={onMuteToggle} size="small" sx={{ color: "white" }}>
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
      sx={{
        width: 80,
        color: "white",
        mx: 1,
        "& .MuiSlider-track": { border: "none" },
        "& .MuiSlider-thumb": {
          width: 12,
          height: 12,
          backgroundColor: "#fff",
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0px 0px 0px 8px ${alpha("#fff", 0.16)}`,
          },
        },
      }}
    />
  </>
);

const FullscreenButton = ({ onClick }) => (
  <IconButton onClick={onClick} size="small" sx={{ color: "white" }}>
    <FullscreenIcon />
  </IconButton>
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
    <StyledContainer
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseLeave={() => setIsControlsVisible(false)}
    >
      <Box sx={{ position: "relative", width: "100%", bgcolor: "#000" }}>
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
              <PlayPauseButton
                isPlaying={isPlaying}
                onClick={handlePlayPause}
              />
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
      </Box>
    </StyledContainer>
  );
};

export default PreviewPlayer;

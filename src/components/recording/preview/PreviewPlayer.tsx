
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Paper, Box, IconButton, Slider, Typography, alpha } from '@mui/material';
import { 
  PlayArrow as PlayArrowIcon, 
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  FullscreenRounded as FullscreenIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

interface PreviewPlayerProps {
  videoUrl: string;
}

const PreviewPlayer: React.FC<PreviewPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (duration === 0) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (videoRef.current && typeof newValue === 'number') {
      videoRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    if (videoRef.current && typeof newValue === 'number') {
      videoRef.current.volume = newValue;
      setVolume(newValue);
      setIsMuted(newValue === 0);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        // If we're unmuting, restore previous volume
        videoRef.current.volume = volume > 0 ? volume : 1;
        setVolume(volume > 0 ? volume : 1);
      } else {
        // If we're muting, save current volume but set to 0
        setVolume(videoRef.current.volume);
        videoRef.current.volume = 0;
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <Paper 
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring",
        delay: 0.3,
        stiffness: 100,
        damping: 15
      }}
      elevation={2} 
      sx={{ 
        mb: 4, 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
        position: 'relative',
      }}
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseLeave={() => setIsControlsVisible(false)}
    >
      <Box sx={{ position: 'relative', width: '100%', bgcolor: '#000' }}>
        <video
          ref={videoRef}
          src={videoUrl}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '450px',
            backgroundColor: '#000',
            position: 'relative',
            zIndex: 0,
            display: 'block'
          }}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onVolumeChange={() => setIsMuted(videoRef.current?.muted || false)}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
        />
        
        {/* Play/Pause Big Button Overlay */}
        {!isPlaying && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              opacity: 0.9
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <IconButton 
                onClick={handlePlayPause} 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  p: 2,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  }
                }}
              >
                <PlayArrowIcon fontSize="large" />
              </IconButton>
            </motion.div>
          </Box>
        )}
        
        {/* Controls Overlay */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0,
            p: 1.5,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
            transition: 'opacity 0.3s ease',
            opacity: isControlsVisible || !isPlaying ? 1 : 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          {/* Progress bar */}
          <Slider
            size="small"
            value={currentTime}
            max={duration || 100}
            onChange={handleSliderChange}
            aria-label="Video progress"
            sx={{ 
              color: 'primary.main',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: `0px 0px 0px 8px ${alpha('#3A36E0', 0.16)}`
                }
              }
            }}
          />
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={handlePlayPause} 
                size="small" 
                sx={{ color: 'white', mr: 1 }}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              
              <IconButton 
                onClick={handleRestart} 
                size="small" 
                sx={{ color: 'white', mr: 1 }}
              >
                <RefreshIcon />
              </IconButton>
              
              <Typography variant="caption" sx={{ color: 'white' }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={handleMuteToggle} 
                size="small" 
                sx={{ color: 'white' }}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              
              <Slider
                size="small"
                value={isMuted ? 0 : volume}
                max={1}
                min={0}
                step={0.1}
                onChange={handleVolumeChange}
                aria-label="Volume"
                sx={{ 
                  width: 80,
                  color: 'white',
                  mx: 1,
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                  '& .MuiSlider-thumb': {
                    width: 12,
                    height: 12,
                    backgroundColor: '#fff',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `0px 0px 0px 8px ${alpha('#fff', 0.16)}`
                    }
                  }
                }}
              />
              
              <IconButton 
                onClick={handleFullscreen} 
                size="small" 
                sx={{ color: 'white' }}
              >
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PreviewPlayer;

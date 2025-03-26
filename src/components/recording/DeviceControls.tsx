
import React from 'react';
import { Box, Typography, Stack, IconButton, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { motion } from 'framer-motion';

interface DeviceControlsProps {
  stream: MediaStream | null;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}

const DeviceControls: React.FC<DeviceControlsProps> = ({ stream, setStream }) => {
  const toggleVideoTrack = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setStream(new MediaStream(stream.getTracks()));
    }
  };

  const toggleAudioTrack = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setStream(new MediaStream(stream.getTracks()));
    }
  };

  return (
    <Paper 
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      elevation={1} 
      sx={{ 
        mt: 3, 
        p: 3, 
        borderRadius: 2, 
        background: 'linear-gradient(145deg, rgba(0, 20, 30, 0.3) 0%, rgba(0, 40, 50, 0.2) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 131, 143, 0.1)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.05)',
      }}
    >
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mb: 2, 
          fontWeight: 'medium', 
          color: 'primary.main',
          textShadow: '0 0 10px rgba(0, 131, 143, 0.3)',
        }}
      >
        Device Controls
      </Typography>
      
      <Stack 
        direction="row" 
        spacing={4} 
        justifyContent="center"
        component={motion.div}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        <Box 
          sx={{ textAlign: 'center' }}
          component={motion.div}
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 }
          }}
        >
          <IconButton
            color={stream?.getVideoTracks()[0]?.enabled ? "primary" : "default"}
            sx={{ 
              bgcolor: stream?.getVideoTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.1)' : 'rgba(0, 0, 0, 0.05)', 
              p: 2,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: stream?.getVideoTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-3px)',
                boxShadow: stream?.getVideoTracks()[0]?.enabled 
                  ? '0 6px 15px rgba(0, 131, 143, 0.3)' 
                  : '0 6px 15px rgba(0, 0, 0, 0.1)',
              }
            }}
            onClick={toggleVideoTrack}
          >
            {stream?.getVideoTracks()[0]?.enabled ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: stream?.getVideoTracks()[0]?.enabled ? 'primary.main' : 'text.secondary',
              transition: 'color 0.3s',
            }}
          >
            Camera {stream?.getVideoTracks()[0]?.enabled ? 'On' : 'Off'}
          </Typography>
        </Box>
        
        <Box 
          sx={{ textAlign: 'center' }}
          component={motion.div}
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 }
          }}
        >
          <IconButton
            color={stream?.getAudioTracks()[0]?.enabled ? "primary" : "default"}
            sx={{ 
              bgcolor: stream?.getAudioTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.1)' : 'rgba(0, 0, 0, 0.05)', 
              p: 2,
              transition: 'all 0.3s',
              '&:hover': {
                bgcolor: stream?.getAudioTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-3px)',
                boxShadow: stream?.getAudioTracks()[0]?.enabled 
                  ? '0 6px 15px rgba(0, 131, 143, 0.3)' 
                  : '0 6px 15px rgba(0, 0, 0, 0.1)',
              }
            }}
            onClick={toggleAudioTrack}
          >
            {stream?.getAudioTracks()[0]?.enabled ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              color: stream?.getAudioTracks()[0]?.enabled ? 'primary.main' : 'text.secondary',
              transition: 'color 0.3s',
            }}
          >
            Microphone {stream?.getAudioTracks()[0]?.enabled ? 'On' : 'Off'}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DeviceControls;

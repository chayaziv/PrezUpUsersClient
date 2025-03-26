
import React, { useRef, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Typography from '@mui/material/Typography';

interface CameraPreviewProps {
  stream: MediaStream | null;
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  countdown: number | null;
  formatTime: (seconds: number) => string;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({
  stream,
  isRecording,
  isPaused,
  recordingTime,
  countdown,
  formatTime
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Paper 
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      elevation={3} 
      sx={{ 
        width: '100%', 
        height: '100%', 
        mb: 3, 
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: '#000',
        border: isRecording ? '2px solid #00838F' : 'none',
        transition: 'border 0.3s ease',
        boxShadow: isRecording 
          ? '0 0 20px rgba(0, 131, 143, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.6)' 
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '400px',
          objectFit: 'cover',
        }}
      />
      
      <AnimatePresence>
        {countdown !== null && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 10,
              borderRadius: 2,
            }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'white', 
                fontSize: '5rem',
                textShadow: '0 0 30px rgba(0, 131, 143, 0.8)',
              }}
            >
              {countdown}
            </Typography>
          </Box>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isRecording && (
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            sx={{ 
              position: 'absolute', 
              top: 10, 
              right: 10, 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'rgba(0, 0, 0, 0.7)', 
              px: 1.5, 
              py: 0.7, 
              borderRadius: 10,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <FiberManualRecordIcon 
              color="error" 
              sx={{ 
                mr: 1, 
                animation: isPaused ? 'none' : 'pulse 1.5s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.3 },
                  '100%': { opacity: 1 },
                },
              }} 
            />
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 'medium' }}>
              {formatTime(recordingTime)}
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Paper>
  );
};

export default CameraPreview;

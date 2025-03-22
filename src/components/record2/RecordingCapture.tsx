import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Stack, 
  Fade, 
  Alert,
  LinearProgress,
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';

interface RecordingCaptureProps {
  presentationTitle: string;
  onComplete: (videoBlob: Blob) => void;
  onBack: () => void;
}

const RecordingCapture: React.FC<RecordingCaptureProps> = ({
  presentationTitle,
  onComplete,
  onBack
}) => {
  // ... keep existing code (state definitions and refs)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  // Get user media
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setError('Could not access camera or microphone. Please check your permissions.');
        setIsLoading(false);
      }
    }
    
    setupCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // ... keep existing code (timer and countdown effects)
  useEffect(() => {
    if (isRecording && !isPaused && !countdown) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, countdown]);
  
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      startRecording();
      setCountdown(null);
    }
  }, [countdown]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartCountdown = () => {
    setCountdown(3);
  };
  
  const startRecording = () => {
    if (!stream) return;
    
    recordedChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'audio/wav' });
      onComplete(blob);
    };
    
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    setIsPaused(false);
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
    }
  };

  const handlePauseResumeRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    
    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };
  
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
        <CircularProgress size={60} color="primary" sx={{ mb: 2 }} />
        <Typography variant="h6">Setting up your camera...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ mb: 2 }}
        action={
          <Button color="inherit" size="small" onClick={onBack}>
            Go Back
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }
  
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
        {presentationTitle}
      </Typography>
      
      {countdown !== null && (
        <Fade in={countdown !== null}>
          <Box
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
            <Typography variant="h1" sx={{ color: 'white', fontSize: '5rem' }}>
              {countdown}
            </Typography>
          </Box>
        </Fade>
      )}
      
      <Paper 
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
          transition: 'border 0.3s ease'
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
        
        {isRecording && (
          <Box sx={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            display: 'flex', 
            alignItems: 'center', 
            bgcolor: 'rgba(0, 0, 0, 0.7)', 
            px: 1.5, 
            py: 0.7, 
            borderRadius: 10
          }}>
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
      </Paper>
      
      {isRecording && (
        <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: 'text.secondary' }}>
            Recording progress (max 5 minutes)
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(recordingTime / 300) * 100} // Assuming max recording time is 5 minutes (300 seconds)
            sx={{ height: 8, borderRadius: 4 }}
          />
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
            {formatTime(recordingTime)} / 05:00
          </Typography>
        </Paper>
      )}
      
      <Divider sx={{ my: 3 }} />
      
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          disabled={isRecording}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Back
        </Button>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {!isRecording ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<FiberManualRecordIcon />}
              onClick={handleStartCountdown}
              disabled={!!countdown}
              sx={{ 
                px: 3,
                py: 1,
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0, 131, 143, 0.25)'
                }
              }}
            >
              Start Recording
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                color={isPaused ? "success" : "primary"}
                onClick={handlePauseResumeRecording}
                startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                sx={{ borderRadius: 2 }}
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<StopIcon />}
                onClick={handleStopRecording}
                sx={{ 
                  px: 3,
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(220, 0, 0, 0.25)'
                  }
                }}
              >
                Stop Recording
              </Button>
            </>
          )}
        </Box>
      </Stack>
      
      <Paper elevation={1} sx={{ mt: 3, p: 3, borderRadius: 2, bgcolor: 'rgba(0, 131, 143, 0.03)' }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium', color: 'primary.main' }}>
          Device Controls
        </Typography>
        
        <Stack direction="row" spacing={4} justifyContent="center">
          <Box sx={{ textAlign: 'center' }}>
            <IconButton
              color={stream?.getVideoTracks()[0]?.enabled ? "primary" : "default"}
              sx={{ 
                bgcolor: stream?.getVideoTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.1)' : 'rgba(0, 0, 0, 0.05)', 
                p: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: stream?.getVideoTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                }
              }}
              onClick={() => {
                if (stream) {
                  const videoTrack = stream.getVideoTracks()[0];
                  videoTrack.enabled = !videoTrack.enabled;
                  setStream(new MediaStream(stream.getTracks()));
                }
              }}
            >
              {stream?.getVideoTracks()[0]?.enabled ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ mt: 1, color: stream?.getVideoTracks()[0]?.enabled ? 'primary.main' : 'text.secondary' }}>
              Camera {stream?.getVideoTracks()[0]?.enabled ? 'On' : 'Off'}
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <IconButton
              color={stream?.getAudioTracks()[0]?.enabled ? "primary" : "default"}
              sx={{ 
                bgcolor: stream?.getAudioTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.1)' : 'rgba(0, 0, 0, 0.05)', 
                p: 2,
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: stream?.getAudioTracks()[0]?.enabled ? 'rgba(0, 131, 143, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                }
              }}
              onClick={() => {
                if (stream) {
                  const audioTrack = stream.getAudioTracks()[0];
                  audioTrack.enabled = !audioTrack.enabled;
                  setStream(new MediaStream(stream.getTracks()));
                }
              }}
            >
              {stream?.getAudioTracks()[0]?.enabled ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <Typography variant="body2" sx={{ mt: 1, color: stream?.getAudioTracks()[0]?.enabled ? 'primary.main' : 'text.secondary' }}>
              Microphone {stream?.getAudioTracks()[0]?.enabled ? 'On' : 'Off'}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RecordingCapture;

import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import CameraPreview from "./CameraPreview";
import RecordingProgress from "./RecordingProgress";
import RecordingControls from "./RecordingControls";
import DeviceControls from "./DeviceControls";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { useTheme } from "@mui/material/styles";

interface RecordingCaptureProps {
  presentationName: string;
  onComplete: (videoBlob: Blob) => void;
  onBack: () => void;
}

const RecordingCapture: React.FC<RecordingCaptureProps> = ({
  presentationName,
  onComplete,
  onBack,
}) => {
  const {
    stream,
    setStream,
    isLoading,
    error,
    isRecording,
    isPaused,
    recordingTime,
    countdown,
    setCountdown,
    startRecording,
    stopRecording,
    pauseResumeRecording,
    formatTime,
  } = useMediaRecorder({ onComplete });

  const theme = useTheme();

  const handleStartCountdown = () => {
    setCountdown(3);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 6,
        }}
      >
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
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{ width: "100%", position: "relative" }}
    >
      <Typography
        component={motion.h2}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        variant="h5"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          mb: 2,
          background: `linear-gradient(to right, ${theme.palette.custom.blue}, ${theme.palette.custom.lightBlue})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {presentationName}
      </Typography>

      <CameraPreview
        stream={stream}
        isRecording={isRecording}
        isPaused={isPaused}
        recordingTime={recordingTime}
        countdown={countdown}
        formatTime={formatTime}
      />

      {isRecording && (
        <RecordingProgress
          recordingTime={recordingTime}
          formatTime={formatTime}
        />
      )}

      <Divider
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.4 }}
        sx={{ my: 3 }}
      />

      <RecordingControls
        isRecording={isRecording}
        isPaused={isPaused}
        countdown={countdown}
        onBack={onBack}
        onStartCountdown={handleStartCountdown}
        onPauseResume={pauseResumeRecording}
        onStop={stopRecording}
      />

      <DeviceControls stream={stream} setStream={setStream} />
    </Box>
  );
};

export default RecordingCapture;

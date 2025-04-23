//VVV

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
import { useTheme } from "@mui/material/styles";
import CameraPreview from "./CameraPreview";
import RecordingProgress from "./RecordingProgress";
import RecordingControls from "./RecordingControls";
import DeviceControls from "./DeviceControls";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import {
  containerStyle,
  loadingBoxStyle,
  loadingSpinnerStyle,
  errorAlertStyle,
  dividerStyle,
  titleStyle,
} from "../../styles/recordingCaptureStyle";

interface RecordingCaptureProps {
  presentationName: string;
  onComplete: (videoBlob: Blob) => void;
  onBack: () => void;
}
const Wrapper = ({ children }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    sx={containerStyle}
  >
    {children}
  </Box>
);
const Loading = () => (
  <Box sx={loadingBoxStyle}>
    <CircularProgress size={60} color="primary" sx={loadingSpinnerStyle} />
    <Typography variant="h6">Setting up your camera...</Typography>
  </Box>
);

const Error = ({ error, onBack }) => (
  <Alert
    severity="error"
    sx={errorAlertStyle}
    action={
      <Button color="inherit" size="small" onClick={onBack}>
        Go Back
      </Button>
    }
  >
    {error}
  </Alert>
);

const PresentationTitle = ({ presentationName, theme }) => (
  <Typography
    component={motion.h2}
    transition={{ delay: 0.1 }}
    variant="h5"
    gutterBottom
    sx={titleStyle(theme)}
  >
    {presentationName}
  </Typography>
);
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
    stopRecording,
    pauseResumeRecording,
    formatTime,
  } = useMediaRecorder({ onComplete });

  const theme = useTheme();

  const handleStartCountdown = () => {
    setCountdown(3);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} onBack={onBack} />;
  }

  return (
    <Wrapper>
      <PresentationTitle presentationName={presentationName} theme={theme} />
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
        sx={dividerStyle}
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
    </Wrapper>
  );
};

export default RecordingCapture;

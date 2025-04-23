///VV


import React, { useRef, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  paperStyles,
  videoStyles,
  countdownOverlayStyles,
  countdownTextStyles,
  recordingIndicatorStyles,
  recordingIconStyles,
  recordingTimeTextStyles,
} from "../../styles/cameraPreviewStyle";

const CountdownAnimation = ({ countdown }: { countdown: number }) => (
  <AnimatePresence>
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      sx={countdownOverlayStyles}
    >
      <Typography variant="h1" sx={countdownTextStyles}>
        {countdown}
      </Typography>
    </Box>
  </AnimatePresence>
);
const Indicator = ({ recordingTime, isPaused, formatTime }) => (
  <AnimatePresence>
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      sx={recordingIndicatorStyles}
    >
      <FiberManualRecordIcon color="error" sx={recordingIconStyles(isPaused)} />
      <Typography variant="body2" sx={recordingTimeTextStyles}>
        {formatTime(recordingTime)}
      </Typography>
    </Box>{" "}
  </AnimatePresence>
);
const Wrapper = ({ children, isRecording }) => (
  <Paper
    component={motion.div}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    elevation={3}
    sx={paperStyles(isRecording)}
  >
    {children}
  </Paper>
);
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
  formatTime,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Wrapper isRecording={isRecording}>
      <video ref={videoRef} autoPlay muted playsInline style={videoStyles} />

      {countdown !== null && <CountdownAnimation countdown={countdown} />}

      {isRecording && (
        <Indicator
          recordingTime={recordingTime}
          isPaused={isPaused}
          formatTime={formatTime}
        />
      )}
    </Wrapper>
  );
};

export default CameraPreview;

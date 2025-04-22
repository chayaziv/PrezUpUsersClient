import React from "react";
import { Stack, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import {
  backButtonStyles,
  startButtonStyles,
  pauseResumeButtonStyles,
  stopButtonStyles,
} from "../../styles/recordingControlsStyle";

interface RecordingControlsProps {
  isRecording: boolean;
  isPaused: boolean;
  countdown: number | null;
  onBack: () => void;
  onStartCountdown: () => void;
  onPauseResume: () => void;
  onStop: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  isPaused,
  countdown,
  onBack,
  onStartCountdown,
  onPauseResume,
  onStop,
}) => {
  const theme = useTheme();

  return (
    <Stack
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        disabled={isRecording}
        variant="outlined"
        sx={backButtonStyles}
      >
        Back
      </Button>

      <Box sx={{ display: "flex", gap: 2 }}>
        {!isRecording ? (
          <Button
            component={motion.button}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variant="contained"
            color="primary"
            startIcon={<FiberManualRecordIcon />}
            onClick={onStartCountdown}
            disabled={!!countdown}
            sx={startButtonStyles}
          >
            Start Recording
          </Button>
        ) : (
          <>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              variant="outlined"
              color={isPaused ? "success" : "primary"}
              onClick={onPauseResume}
              startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              sx={pauseResumeButtonStyles(isPaused, theme)}
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>
            <Button
              component={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              variant="contained"
              color="error"
              startIcon={<StopIcon />}
              onClick={onStop}
              sx={stopButtonStyles}
            >
              Stop Recording
            </Button>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default RecordingControls;

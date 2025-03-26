import React from "react";
import { Stack, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

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
        sx={{
          borderRadius: 2,
          borderColor: "rgba(255, 255, 255, 0.15)",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        }}
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
            sx={{
              px: 3,
              py: 1,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s",
              background: "linear-gradient(45deg, #00838F 30%, #4FB3BF 90%)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 25px rgba(0, 131, 143, 0.5)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                opacity: 0,
                transition: "opacity 0.5s",
              },
              "&:hover::before": {
                opacity: 1,
              },
            }}
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
              sx={{
                borderRadius: 2,
                borderColor: isPaused
                  ? alpha(theme.palette.success.main, 0.5)
                  : alpha(theme.palette.primary.main, 0.5),
                "&:hover": {
                  borderColor: isPaused
                    ? alpha(theme.palette.success.main, 0.8)
                    : alpha(theme.palette.primary.main, 0.8),
                  backgroundColor: isPaused
                    ? alpha(theme.palette.success.main, 0.05)
                    : alpha(theme.palette.primary.main, 0.05),
                },
              }}
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
              sx={{
                px: 3,
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(220, 0, 0, 0.3)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.5s",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
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

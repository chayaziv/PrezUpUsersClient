import React from "react";
import {
  Paper,
  Typography,
  LinearProgress,
  Box,
  Tooltip,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { MicIcon, TimerIcon } from "lucide-react";
import { useTheme } from "@mui/material/styles";

interface RecordingProgressProps {
  recordingTime: number;
  formatTime: (seconds: number) => string;
}

const RecordingProgress: React.FC<RecordingProgressProps> = ({
  recordingTime,
  formatTime,
}) => {
  const theme = useTheme();
  // Calculate percentage to determine color
  const percentage = (recordingTime / 300) * 100;
  const getColorByPercentage = () => {
    if (percentage <= 60) return theme.palette.custom.turquoise;
    if (percentage <= 80) return theme.palette.custom.turquoise;
    if (percentage <= 95) return theme.palette.custom.yellow;
    return theme.palette.custom.red;
  };

  const getRemainingTime = () => {
    const remaining = 300 - recordingTime;
    return formatTime(remaining);
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
      elevation={1}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        background: "white",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MicIcon size={20} color={theme.palette.custom.turquoise} />
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Recording in Progress
          </Typography>
        </Box>
        <Tooltip title="Maximum recording time is 5 minutes">
          <Chip
            label={`${formatTime(recordingTime)} / 05:00`}
            size="small"
            icon={<TimerIcon size={16} />}
            variant="outlined"
            color={percentage > 80 ? "warning" : "primary"}
          />
        </Tooltip>
      </Box>

      <Tooltip title={`${getRemainingTime()} remaining`}>
        <Box sx={{ position: "relative" }}>
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              "& .MuiLinearProgress-bar": {
                background: `linear-gradient(to right, ${
                  theme.palette.custom.turquoise
                }, ${getColorByPercentage()})`,
                borderRadius: 5,
                transition: "transform 0.2s linear",
              },
            }}
          />
        </Box>
      </Tooltip>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          0:00
        </Typography>
        <Typography variant="caption" color="text.secondary">
          5:00
        </Typography>
      </Box>
    </Paper>
  );
};

export default RecordingProgress;

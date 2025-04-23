
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
import { styles } from "@/styles/recordingProgressStyle";



const Header = ({ recordingTime, formatTime, percentage }) => {
  const theme = useTheme();

  return (
    <Box sx={styles.header}>
      <Box sx={styles.titleWrapper}>
        <MicIcon size={20} color={theme.palette.custom.turquoise} />
        <Typography variant="subtitle1" sx={styles.title}>
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
  );
};

const ProgressBar = ({
  percentage,
  getRemainingTime,
  getColorByPercentage,
}) => {
  const theme = useTheme();

  return (
    <Tooltip title={`${getRemainingTime()} remaining`}>
      <Box sx={styles.progressWrapper}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            ...styles.progressBase,
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
  );
};

const Timestamps = () => (
  <Box sx={styles.timestamps}>
    <Typography variant="caption" color="text.secondary">
      0:00
    </Typography>
    <Typography variant="caption" color="text.secondary">
      5:00
    </Typography>
  </Box>
);

const Wrapper = ({ children }) => (
  <Paper
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ delay: 0.3 }}
    elevation={1}
    sx={styles.paper}
  >
    {children}
  </Paper>
);
interface RecordingProgressProps {
  recordingTime: number;
  formatTime: (seconds: number) => string;
}

const RecordingProgress: React.FC<RecordingProgressProps> = ({
  recordingTime,
  formatTime,
}) => {
  const theme = useTheme();
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
    <Wrapper>
      <Header
        recordingTime={recordingTime}
        formatTime={formatTime}
        percentage={percentage}
      />
      <ProgressBar
        percentage={percentage}
        getRemainingTime={getRemainingTime}
        getColorByPercentage={getColorByPercentage}
      />
      <Timestamps />
    </Wrapper>
  );
};

export default RecordingProgress;

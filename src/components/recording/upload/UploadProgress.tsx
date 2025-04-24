
import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";

// פונקציה להצגת כותרת התהליך
const ProgressTitle = ({ uploadProgress }: { uploadProgress: number }) => (
  <Typography
    variant="body2"
    sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
  >
    <span>Uploading...</span>
    <span>{uploadProgress}%</span>
  </Typography>
);

// פונקציה להציג את ה-LinearProgress
const ProgressBar = ({ uploadProgress }: { uploadProgress: number }) => (
  <LinearProgress
    variant="determinate"
    value={uploadProgress}
    sx={{
      height: 8,
      borderRadius: 4,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      "& .MuiLinearProgress-bar": {
        background: "linear-gradient(to right, #00838F, #4FB3BF)",
        boxShadow: "0 0 10px rgba(0, 131, 143, 0.5)",
      },
    }}
  />
);

// פונקציה שמטפלת בעימוד הקומפוננטה
const UploadProgressWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    sx={{ mb: 3 }}
  >
    {children}
  </Box>
);

interface UploadProgressProps {
  isUploading: boolean;
  uploadProgress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  isUploading,
  uploadProgress,
}) => {
  if (!isUploading) return null;

  return (
    <UploadProgressWrapper>
      <ProgressTitle uploadProgress={uploadProgress} />
      <ProgressBar uploadProgress={uploadProgress} />
    </UploadProgressWrapper>
  );
};

export default UploadProgress;

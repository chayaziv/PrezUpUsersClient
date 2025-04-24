import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import {
  progressTitleStyle,
  progressBarStyle,
  uploadProgressWrapperStyle,
} from "@/styles/uploadProgressStyle";

const ProgressTitle = ({ uploadProgress }: { uploadProgress: number }) => (
  <Typography variant="body2" sx={progressTitleStyle}>
    <span>Uploading...</span>
    <span>{uploadProgress}%</span>
  </Typography>
);

const ProgressBar = ({ uploadProgress }: { uploadProgress: number }) => (
  <LinearProgress
    variant="determinate"
    value={uploadProgress}
    sx={progressBarStyle}
  />
);

const UploadProgressWrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    sx={uploadProgressWrapperStyle}
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

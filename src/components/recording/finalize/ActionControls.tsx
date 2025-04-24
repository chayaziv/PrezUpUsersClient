import React from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ShareIcon from "@mui/icons-material/Share";
import CircularProgress from "@mui/material/CircularProgress";
import {
  downloadButtonStyles,
  playButtonStyles,
  uploadButtonStyles,
  shareButtonStyles,
  wrapperStyles,
} from "../../../styles/actionControlsStyle"; // import styles

interface ActionControlsProps {
  isUploading: boolean;
  uploadComplete: boolean;
  isPublic: boolean;
  onDownload: () => void;
  onPlay: () => void;
  onUpload: () => void;
  onCopyLink: () => void;
  copySuccess: boolean;
}

const DownloadButton = ({
  isUploading,
  onDownload,
}: {
  isUploading: boolean;
  onDownload: () => void;
}) => (
  <Tooltip title="Save to your device" arrow placement="left">
    <Button
      component={motion.button}
      variants={{
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      }}
      transition={{ delay: 0.6 }}
      whileHover={{ scale: 1.02, x: 5 }}
      fullWidth
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={onDownload}
      disabled={isUploading}
      sx={downloadButtonStyles} // Use styles
    >
      Download Recording
    </Button>
  </Tooltip>
);

const PlayButton = ({
  isUploading,
  onPlay,
}: {
  isUploading: boolean;
  onPlay: () => void;
}) => (
  <Tooltip title="Play in the preview above" arrow placement="left">
    <Button
      component={motion.button}
      variants={{
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      }}
      transition={{ delay: 0.7 }}
      whileHover={{ scale: 1.02, x: 5 }}
      fullWidth
      variant="outlined"
      color="secondary"
      startIcon={<PlayArrowIcon />}
      onClick={onPlay}
      disabled={isUploading}
      sx={playButtonStyles} // Use styles
    >
      Play Again
    </Button>
  </Tooltip>
);

const UploadButton = ({
  isUploading,
  uploadComplete,
  onUpload,
}: {
  isUploading: boolean;
  uploadComplete: boolean;
  onUpload: () => void;
}) => (
  <Tooltip title="Upload to the cloud" arrow placement="left">
    <Button
      component={motion.button}
      variants={{
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      }}
      transition={{ delay: 0.8 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 25px rgba(0, 131, 143, 0.5)",
      }}
      fullWidth
      variant="contained"
      color="primary"
      startIcon={
        isUploading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <CloudUploadIcon />
        )
      }
      onClick={onUpload}
      disabled={isUploading || uploadComplete}
      sx={uploadButtonStyles} // Use styles
    >
      {isUploading ? "Uploading..." : "Upload to Server"}
    </Button>
  </Tooltip>
);

const ShareButton = ({
  isUploading,
  copySuccess,
  onCopyLink,
}: {
  isUploading: boolean;
  copySuccess: boolean;
  onCopyLink: () => void;
}) => (
  <Tooltip title="Create a shareable link" arrow placement="left">
    <Button
      component={motion.button}
      variants={{
        initial: { x: 20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      }}
      transition={{ delay: 0.9 }}
      whileHover={{ scale: 1.02, x: 5 }}
      fullWidth
      variant="text"
      startIcon={<ShareIcon />}
      onClick={onCopyLink}
      disabled={isUploading}
      sx={shareButtonStyles} // Use styles
    >
      {copySuccess ? "Link copied!" : "Share with others"}
    </Button>
  </Tooltip>
);

const Wrapper = ({ children }) => <Stack sx={wrapperStyles}>{children}</Stack>;

const ActionControls: React.FC<ActionControlsProps> = ({
  isUploading,
  uploadComplete,
  isPublic,
  onDownload,
  onPlay,
  onUpload,
  onCopyLink,
  copySuccess,
}) => {
  if (uploadComplete) {
    return null;
  }

  return (
    <Wrapper>
      <DownloadButton isUploading={isUploading} onDownload={onDownload} />
      <PlayButton isUploading={isUploading} onPlay={onPlay} />
      <UploadButton
        isUploading={isUploading}
        uploadComplete={uploadComplete}
        onUpload={onUpload}
      />
      {isPublic && !uploadComplete && (
        <ShareButton
          isUploading={isUploading}
          copySuccess={copySuccess}
          onCopyLink={onCopyLink}
        />
      )}
    </Wrapper>
  );
};

export default ActionControls;

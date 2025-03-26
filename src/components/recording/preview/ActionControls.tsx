
import React from 'react';
import { Button, Stack, alpha, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShareIcon from '@mui/icons-material/Share';
import CircularProgress from '@mui/material/CircularProgress';

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

const ActionControls: React.FC<ActionControlsProps> = ({
  isUploading,
  uploadComplete,
  isPublic,
  onDownload,
  onPlay,
  onUpload,
  onCopyLink,
  copySuccess
}) => {
  if (uploadComplete) {
    return null; // Don't show controls when upload is complete
  }

  return (
    <Stack 
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, staggerChildren: 0.1 }}
      spacing={2}
    >
      <Tooltip title="Save to your device" arrow placement="left">
        <Button
          component={motion.button}
          variants={{
            initial: { x: 20, opacity: 0 },
            animate: { x: 0, opacity: 1 }
          }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, x: 5 }}
          fullWidth
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onDownload}
          disabled={isUploading}
          sx={{ 
            justifyContent: 'flex-start',
            borderRadius: 2,
            py: 1.2,
            borderColor: alpha('#FFFFFF', 0.2),
            background: alpha('#000000', 0.2),
            '&:hover': {
              borderColor: alpha('#FFFFFF', 0.3),
              background: alpha('#000000', 0.3),
            }
          }}
        >
          Download Recording
        </Button>
      </Tooltip>
      
      <Tooltip title="Play in the preview above" arrow placement="left">
        <Button
          component={motion.button}
          variants={{
            initial: { x: 20, opacity: 0 },
            animate: { x: 0, opacity: 1 }
          }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02, x: 5 }}
          fullWidth
          variant="outlined"
          color="secondary"
          startIcon={<PlayArrowIcon />}
          onClick={onPlay}
          disabled={isUploading}
          sx={{ 
            justifyContent: 'flex-start',
            borderRadius: 2,
            py: 1.2,
            borderColor: alpha('#B2EBF2', 0.3),
            background: alpha('#B2EBF2', 0.05),
            '&:hover': {
              borderColor: alpha('#B2EBF2', 0.5),
              background: alpha('#B2EBF2', 0.1),
            }
          }}
        >
          Play Again
        </Button>
      </Tooltip>
      
      <Tooltip title="Upload to the cloud" arrow placement="left">
        <Button
          component={motion.button}
          variants={{
            initial: { x: 20, opacity: 0 },
            animate: { x: 0, opacity: 1 }
          }}
          transition={{ delay: 0.8 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 8px 25px rgba(0, 131, 143, 0.5)'
          }}
          fullWidth
          variant="contained"
          color="primary"
          startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : <CloudUploadIcon />}
          onClick={onUpload}
          disabled={isUploading || uploadComplete}
          sx={{ 
            justifyContent: 'flex-start',
            borderRadius: 2,
            py: 1.2,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s',
            background: 'linear-gradient(45deg, #00838F 30%, #4FB3BF 90%)',
            '&:hover': {
              transform: 'translateY(-3px)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
              opacity: 0,
              transition: 'opacity 0.5s',
            },
            '&:hover::before': {
              opacity: 1,
            }
          }}
        >
          {isUploading ? "Uploading..." : "Upload to Server"}
        </Button>
      </Tooltip>

      {isPublic && !uploadComplete && (
        <Tooltip title="Create a shareable link" arrow placement="left">
          <Button
            component={motion.button}
            variants={{
              initial: { x: 20, opacity: 0 },
              animate: { x: 0, opacity: 1 }
            }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.02, x: 5 }}
            fullWidth
            variant="text"
            startIcon={<ShareIcon />}
            onClick={onCopyLink}
            disabled={isUploading}
            sx={{ 
              justifyContent: 'flex-start',
              borderRadius: 2,
              py: 1,
              color: alpha('#FFFFFF', 0.7),
              '&:hover': {
                background: alpha('#FFFFFF', 0.05),
                color: alpha('#FFFFFF', 0.9),
              }
            }}
          >
            {copySuccess ? 'Link copied!' : 'Share with others'}
          </Button>
        </Tooltip>
      )}
    </Stack>
  );
};

export default ActionControls;

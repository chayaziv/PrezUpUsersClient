
import React, { useState } from 'react';
import { Box, Typography, Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface UploadCompleteProps {
  presentationName: string;
}

const UploadComplete: React.FC<UploadCompleteProps> = ({ presentationName }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    // Simulate copying a link
    navigator.clipboard.writeText(`https://presentation-app.com/view/${presentationName.replace(/ /g, '-').toLowerCase()}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      sx={{ 
        textAlign: 'center', 
        p: 3,
        bgcolor: alpha('#4CAF50', 0.1),
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(76, 175, 80, 0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(76, 175, 80, 0.1), transparent 70%)',
          pointerEvents: 'none',
        }
      }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2, filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.5))' }} />
      </motion.div>
      <Typography variant="h6" gutterBottom>
        Upload Complete!
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
        Your presentation has been successfully uploaded.
      </Typography>
      
      <Button
        component={motion.button}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variant="outlined"
        color="primary"
        startIcon={copySuccess ? <CheckCircleIcon /> : <ContentCopyIcon />}
        onClick={handleCopyLink}
        sx={{ 
          borderRadius: 2,
          py: 1,
          position: 'relative',
          overflow: 'hidden',
          borderColor: copySuccess ? 'success.main' : 'primary.main',
          color: copySuccess ? 'success.main' : 'primary.main',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            opacity: 0,
            transition: 'opacity 0.5s',
          },
          '&:hover::before': {
            opacity: 1,
          }
        }}
      >
        {copySuccess ? 'Link copied!' : 'Copy sharing link'}
      </Button>
    </Box>
  );
};

export default UploadComplete;

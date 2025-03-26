
import React from 'react';
import { Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <Box 
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Button
        component={motion.button}
        whileHover={{ 
          scale: 1.05,
          y: -3,
          boxShadow: '0 6px 20px rgba(0, 131, 143, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
        variant="text"
        color="primary"
        startIcon={<RestartAltIcon />}
        onClick={onReset}
        sx={{ 
          borderRadius: 2,
          py: 1,
          px: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: 0,
            height: '2px',
            background: 'linear-gradient(to right, #00838F, #4FB3BF)',
            transition: 'all 0.3s ease',
          },
          '&:hover::after': {
            width: '80%',
            left: '10%',
          }
        }}
      >
        Record Another Presentation
      </Button>
    </Box>
  );
};

export default ResetButton;


import React from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Chip, 
  alpha,
  Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import LabelIcon from '@mui/icons-material/Label';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface PresentationDetailsProps {
  name: string;
  isPublic: boolean;
  tags: string[];
  fileSize: number; // in MB
}

const PresentationDetails: React.FC<PresentationDetailsProps> = ({
  name,
  isPublic,
  tags,
  fileSize
}) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        background: 'white',
        border: '1px solid',
        borderColor: alpha('#3A36E0', 0.1),
        flex: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-5px)',
        }
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: 'primary.main', 
          fontWeight: 600, 
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <VideoFileIcon fontSize="small" />
        Presentation Details
      </Typography>
      
      <List dense>
        <ListItem 
          component={motion.li}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          sx={{ px: 0 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {isPublic ? 
              <PublicIcon color="primary" /> : 
              <LockIcon color="secondary" />}
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Visibility
              </Typography>
            }
            secondary={
              <Tooltip title={isPublic ? "Anyone can view this presentation" : "Only you can view this presentation"}>
                <Chip 
                  label={isPublic ? "Public" : "Private"}
                  size="small"
                  color={isPublic ? "primary" : "default"}
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Tooltip>
            } 
          />
        </ListItem>
        
        <Divider component="li" sx={{ my: 1.5 }} />
        
        <ListItem 
          component={motion.li}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          sx={{ px: 0 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LabelIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Tags
              </Typography>
            }
            secondary={
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {tags.length > 0 ? (
                  tags.map(tag => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      color="primary"
                      variant="outlined" 
                      sx={{ 
                        borderRadius: 2,
                        background: alpha('#3A36E0', 0.05),
                        borderColor: alpha('#3A36E0', 0.3),
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">No tags</Typography>
                )}
              </Box>
            } 
          />
        </ListItem>
        
        <Divider component="li" sx={{ my: 1.5 }} />
        
        <ListItem 
          component={motion.li}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          sx={{ px: 0 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <VideoFileIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                File Size
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {fileSize.toFixed(2)} MB
              </Typography>
            } 
          />
        </ListItem>
        
        <Divider component="li" sx={{ my: 1.5 }} />
        
        <ListItem 
          component={motion.li}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          sx={{ px: 0 }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <CalendarTodayIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Created
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            } 
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default PresentationDetails;

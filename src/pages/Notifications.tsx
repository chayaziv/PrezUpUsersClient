
import { useState } from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Chip, 
  Divider, 
  IconButton, 
  Tabs, 
  Tab, 
  Box, 
  Button, 
  Paper,
  Badge
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  CheckCircle as CheckCircleIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Star as StarIcon,
  Share as ShareIcon,
  VideoCall as VideoCallIcon,
  AccessTime as AccessTimeIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'upvote',
    read: false,
    timestamp: '2023-09-18T09:30:00Z',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    content: 'upvoted your presentation',
    presentation: 'Q2 Sales Strategy Pitch',
    presentationId: 123
  },
  {
    id: 2,
    type: 'comment',
    read: false,
    timestamp: '2023-09-17T16:45:00Z',
    user: {
      name: 'Michael Torres',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    content: 'commented on your presentation',
    comment: 'Great delivery and very persuasive arguments. I particularly liked your section on market analysis.',
    presentation: 'Product Launch Keynote',
    presentationId: 122
  },
  {
    id: 3,
    type: 'achievement',
    read: true,
    timestamp: '2023-09-15T11:20:00Z',
    content: 'You earned a new achievement',
    achievement: 'Consistent Presenter',
    description: 'Completed 5 presentations in one month'
  },
  {
    id: 4,
    type: 'system',
    read: true,
    timestamp: '2023-09-14T08:10:00Z',
    content: 'Your presentation analysis is ready',
    presentation: 'Team Leadership Workshop',
    presentationId: 120
  },
  {
    id: 5,
    type: 'mention',
    read: false,
    timestamp: '2023-09-13T14:35:00Z',
    user: {
      name: 'Rebecca Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    content: 'mentioned you in a comment',
    comment: 'I agree with @user about the clarity of delivery. Very professional!',
    presentation: 'Annual Budget Review',
    presentationId: 118
  },
  {
    id: 6,
    type: 'upvote',
    read: true,
    timestamp: '2023-09-12T10:15:00Z',
    user: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
    },
    content: 'upvoted your presentation',
    presentation: 'Marketing Strategy Overview',
    presentationId: 115
  },
  {
    id: 7,
    type: 'share',
    read: true,
    timestamp: '2023-09-10T09:05:00Z',
    user: {
      name: 'Jennifer Lee',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
    },
    content: 'shared your presentation',
    presentation: 'Customer Satisfaction Survey Results',
    presentationId: 112
  }
];

// Helper functions
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'upvote':
      return <ThumbUpIcon sx={{ color: 'primary.main' }} />;
    case 'comment':
      return <CommentIcon sx={{ color: 'info.main' }} />;
    case 'achievement':
      return <StarIcon sx={{ color: 'warning.main' }} />;
    case 'system':
      return <VideoCallIcon sx={{ color: 'secondary.main' }} />;
    case 'mention':
      return <CommentIcon sx={{ color: 'info.main' }} />;
    case 'share':
      return <ShareIcon sx={{ color: 'success.main' }} />;
    default:
      return <AccessTimeIcon />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleDeleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const filteredNotifications = tabValue === 0 
    ? notifications 
    : tabValue === 1 
      ? notifications.filter(notification => !notification.read)
      : notifications.filter(notification => 
          ['upvote', 'comment', 'mention'].includes(notification.type)
        );
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={1} 
        sx={{ 
          p: 3, 
          mt: 4, 
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Notifications
            {unreadCount > 0 && (
              <Badge 
                badgeContent={unreadCount} 
                color="primary" 
                sx={{ ml: 2 }}
              />
            )}
          </Typography>
          <Box>
            {unreadCount > 0 && (
              <Button 
                variant="text" 
                color="primary" 
                onClick={handleMarkAllAsRead}
                startIcon={<CheckCircleIcon />}
                sx={{ mr: 1 }}
              >
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="text" 
                color="primary" 
                onClick={handleClearAll}
                startIcon={<DeleteIcon />}
              >
                Clear all
              </Button>
            )}
          </Box>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="All" />
            <Tab 
              label="Unread" 
              icon={unreadCount > 0 ? <Badge badgeContent={unreadCount} color="primary" /> : undefined} 
              iconPosition="end"
            />
            <Tab label="Interactions" />
          </Tabs>
        </Box>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <List sx={{ pt: 2 }}>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <motion.div key={notification.id} variants={itemVariants}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ 
                      py: 2, 
                      px: 2,
                      borderRadius: 2,
                      mb: 1,
                      position: 'relative',
                      backgroundColor: notification.read ? 'transparent' : 'rgba(58, 54, 224, 0.04)'
                    }}
                  >
                    {!notification.read && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 4,
                          borderRadius: '4px 0 0 4px',
                          backgroundColor: 'primary.main'
                        }}
                      />
                    )}
                    <ListItemAvatar>
                      {notification.user ? (
                        <Avatar src={notification.user.avatar} alt={notification.user.name} />
                      ) : (
                        <Avatar sx={{ bgcolor: notification.type === 'achievement' ? 'warning.main' : 'secondary.main' }}>
                          {getNotificationIcon(notification.type)}
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1">
                          {notification.user && (
                            <Typography component="span" fontWeight="bold" color="text.primary">
                              {notification.user.name}{' '}
                            </Typography>
                          )}
                          {notification.content}
                          {notification.presentation && (
                            <Typography component="span" fontWeight="medium" color="primary.main">
                              {' '}"{notification.presentation}"
                            </Typography>
                          )}
                          {notification.achievement && (
                            <Typography component="span" fontWeight="medium" color="warning.main">
                              {' '}{notification.achievement}
                            </Typography>
                          )}
                        </Typography>
                      }
                      secondary={
                        <>
                          {notification.comment && (
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ 
                                display: 'block', 
                                mt: 1, 
                                p: 1.5, 
                                borderRadius: 2, 
                                backgroundColor: 'background.default',
                                borderLeft: '3px solid',
                                borderColor: 'divider'
                              }}
                            >
                              "{notification.comment}"
                            </Typography>
                          )}
                          {notification.description && (
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {notification.description}
                            </Typography>
                          )}
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {formatDate(notification.timestamp)}
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {!notification.read && (
                        <IconButton 
                          size="small" 
                          onClick={() => handleMarkAsRead(notification.id)} 
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          <CheckCircleIcon fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteNotification(notification.id)}
                        color="default"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                  {filteredNotifications.indexOf(notification) < filteredNotifications.length - 1 && (
                    <Divider component="li" variant="inset" />
                  )}
                </motion.div>
              ))
            ) : (
              <Box 
                sx={{ 
                  py: 6, 
                  textAlign: 'center', 
                  color: 'text.secondary' 
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircleIcon sx={{ fontSize: 64, color: 'success.light', mb: 2, opacity: 0.8 }} />
                  <Typography variant="h6" gutterBottom>
                    All caught up!
                  </Typography>
                  <Typography variant="body2">
                    You have no {tabValue === 1 ? 'unread ' : ''}{tabValue === 2 ? 'interaction ' : ''}notifications.
                  </Typography>
                </motion.div>
              </Box>
            )}
          </List>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default Notifications;

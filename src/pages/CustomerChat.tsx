
import { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Avatar, 
  List, 
  ListItem, 
  Divider, 
  CircularProgress, 
  IconButton, 
  Tooltip, 
  Fade,
  Chip,
} from '@mui/material';
import { 
  Send as SendIcon, 
  AttachFile as AttachFileIcon, 
  SentimentSatisfiedAlt as EmojiIcon,
  MoreVert as MoreVertIcon,
  ArrowDownward as ScrollDownIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Mock chat history
const initialMessages = [
  {
    id: 1,
    sender: 'bot',
    message: 'Hello! Welcome to PresentationAI. How can I help you today?',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 2,
    sender: 'user',
    message: 'Hi! I\'m having trouble understanding my presentation score.',
    timestamp: new Date(Date.now() - 3540000).toISOString(),
  },
  {
    id: 3,
    sender: 'bot',
    message: 'I understand. Your presentation score is calculated based on several factors including clarity, fluency, confidence, engagement, and speech style. Each of these factors contributes to your overall score. Which part would you like me to explain in more detail?',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 4,
    sender: 'user',
    message: 'Can you tell me how to improve my confidence score?',
    timestamp: new Date(Date.now() - 3400000).toISOString(),
  },
  {
    id: 5,
    sender: 'bot',
    message: 'Absolutely! Here are some tips to improve your confidence score:\n\n1. Practice your presentation multiple times\n2. Record yourself and watch the playback to identify areas for improvement\n3. Work on maintaining eye contact with your audience\n4. Use positive body language and stand tall\n5. Speak clearly and at a moderate pace\n6. Start with a strong opening to build your confidence\n7. Prepare for potential questions\n\nWould you like specific exercises for any of these areas?',
    timestamp: new Date(Date.now() - 3350000).toISOString(),
  }
];

// Suggested questions
const suggestedQuestions = [
  "How can I improve my clarity score?",
  "What factors affect my engagement rating?",
  "Tips for reducing filler words?",
  "How to structure a better presentation?",
  "Best practices for presentation slides"
];

const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const CustomerChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle scroll to show/hide scroll button
  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const bottomThreshold = 100;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < bottomThreshold;
    
    setShowScrollButton(!isNearBottom);
  };
  
  useEffect(() => {
    scrollToBottom();
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [messages]);
  
  const sendMessage = (message = newMessage) => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const botMessage = {
        id: messages.length + 2,
        sender: 'bot',
        message: getBotResponse(message),
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };
  
  const getBotResponse = (message) => {
    // Simple response logic - could be replaced with actual AI/API call
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you with your presentations today?";
    } else if (lowerMessage.includes('clarity')) {
      return "To improve clarity in your presentations, focus on: 1) Organize your content with a clear beginning, middle, and end, 2) Use simple language and avoid jargon, 3) Provide concrete examples, 4) Use visual aids that support your points, and 5) Practice transitions between sections. Would you like more specific tips on any of these areas?";
    } else if (lowerMessage.includes('confidence')) {
      return "Building confidence takes practice! Try these techniques: 1) Rehearse your full presentation at least 5 times, 2) Record yourself and review your performance, 3) Practice in front of friends or family, 4) Focus on your breathing before and during the presentation, 5) Prepare thoroughly so you know your content inside and out.";
    } else if (lowerMessage.includes('engagement')) {
      return "To increase audience engagement: 1) Start with a compelling hook or question, 2) Incorporate storytelling elements, 3) Use varied vocal tones and pacing, 4) Include interactive elements where appropriate, 5) Make eye contact with different sections of your audience, and 6) Use gestures to emphasize key points.";
    } else if (lowerMessage.includes('filler words')) {
      return "To reduce filler words like 'um' and 'uh': 1) Record yourself and identify your most common filler words, 2) Practice pausing instead of using fillers, 3) Slow down your speaking pace, 4) Prepare thoroughly so you're confident with your content, and 5) Have a friend signal when you use filler words during practice sessions.";
    } else if (lowerMessage.includes('structure')) {
      return "A well-structured presentation typically follows this format: 1) Introduction (hook, purpose, preview), 2) Main content (3-5 key points with supporting evidence), 3) Recap of main points, 4) Strong conclusion with call to action. I'd recommend the 'Tell them what you'll tell them, tell them, then tell them what you told them' approach.";
    } else if (lowerMessage.includes('slides')) {
      return "For effective presentation slides: 1) Follow the 6x6 rule (max 6 bullet points, max 6 words each), 2) Use high-quality, relevant images, 3) Maintain consistent styling, 4) Use contrasting colors for readability, 5) Include only key information on slides - you are the presentation, slides are support, and 6) Use animations sparingly and purposefully.";
    } else {
      return "Thanks for your message. I'd be happy to help with your presentation skills or answer questions about your AI analysis. Could you tell me more specifically what you'd like assistance with?";
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  return (
    <Container maxWidth="md">
      <Paper 
        elevation={1} 
        sx={{ 
          height: 'calc(100vh - 180px)', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Chat Header */}
        <Box 
          sx={{ 
            p: 2, 
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(to right, #f7f9fc, #ffffff)',
          }}
        >
          <Avatar 
            src="/placeholder.svg" 
            alt="PresentationAI Assistant"
            sx={{ 
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              mr: 2,
            }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              PresentationAI Assistant
            </Typography>
            <Typography variant="caption" color="text.secondary">
              AI-powered presentation coach
            </Typography>
          </Box>
          <IconButton sx={{ ml: 'auto' }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
        
        {/* Chat Messages */}
        <Box 
          ref={containerRef}
          sx={{ 
            flex: 1, 
            overflowY: 'auto',
            p: 2,
            bgcolor: '#f7f9fc',
          }}
        >
          <List>
            {messages.map((msg, index) => (
              <ListItem
                key={msg.id}
                disableGutters
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                      color: msg.sender === 'user' ? 'white' : 'text.primary',
                      p: 2,
                      borderRadius: msg.sender === 'user' 
                        ? '20px 20px 4px 20px' 
                        : '20px 20px 20px 4px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    <Typography variant="body1">{msg.message}</Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ mt: 0.5, mx: 1 }}
                  >
                    {formatTime(msg.timestamp)}
                  </Typography>
                </motion.div>
              </ListItem>
            ))}
            
            {isTyping && (
              <ListItem
                disableGutters
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    p: 2,
                    borderRadius: '20px 20px 20px 4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography variant="body2">Typing...</Typography>
                </Box>
              </ListItem>
            )}
            
            {/* This element is used to scroll to bottom */}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        
        {/* Suggested Questions */}
        {messages.length < 7 && (
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            bgcolor: 'rgba(0, 0, 0, 0.02)',
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ width: '100%', mb: 1 }}>
              Suggested questions:
            </Typography>
            {suggestedQuestions.map((question, index) => (
              <Chip 
                key={index}
                label={question}
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => sendMessage(question)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(78, 205, 196, 0.1)',
                  }
                }}
              />
            ))}
          </Box>
        )}
        
        {/* Chat Input */}
        <Box 
          sx={{ 
            p: 2, 
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'background.paper',
            position: 'relative',
          }}
        >
          <IconButton size="small" sx={{ mr: 1 }}>
            <AttachFileIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ mr: 1 }}>
            <EmojiIcon fontSize="small" />
          </IconButton>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'background.default',
              }
            }}
          />
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendMessage()}
            disabled={!newMessage.trim()}
            sx={{ 
              ml: 1, 
              minWidth: 0, 
              width: 40, 
              height: 40, 
              borderRadius: '50%',
            }}
          >
            <SendIcon fontSize="small" />
          </Button>
          
          {/* Scroll to bottom button */}
          <Fade in={showScrollButton}>
            <IconButton
              color="primary"
              size="small"
              onClick={scrollToBottom}
              sx={{
                position: 'absolute',
                bottom: 80,
                right: 20,
                bgcolor: 'background.paper',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                }
              }}
            >
              <ScrollDownIcon fontSize="small" />
            </IconButton>
          </Fade>
        </Box>
      </Paper>
    </Container>
  );
};

export default CustomerChat;

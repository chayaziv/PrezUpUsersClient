import React from "react";
import { Box, Typography, Stack, IconButton, Paper } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { motion } from "framer-motion";
import {
  paperStyles,
  titleStyles,
  iconButtonStyles,
  iconTextStyles,
} from "../../styles/deviceControlsStyle";

const VideoControl = ({ stream, onClick }) => {
  const isEnabled = !!stream?.getVideoTracks()[0]?.enabled;

  return (
    <Box
      sx={{ textAlign: "center" }}
      component={motion.div}
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
    >
      <IconButton
        color={isEnabled ? "primary" : "default"}
        sx={iconButtonStyles(isEnabled)}
        onClick={onClick}
      >
        {isEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
      </IconButton>
      <Typography variant="body2" sx={iconTextStyles(isEnabled)}>
        Camera {isEnabled ? "On" : "Off"}
      </Typography>
    </Box>
  );
};

const AudioControl = ({ stream, onClick }) => {
  const isEnabled = !!stream?.getAudioTracks()[0]?.enabled;
  return (
    <Box
      sx={{ textAlign: "center" }}
      component={motion.div}
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
    >
      <IconButton
        color={isEnabled ? "primary" : "default"}
        sx={iconButtonStyles(isEnabled)}
        onClick={onClick}
      >
        {isEnabled ? <MicIcon /> : <MicOffIcon />}
      </IconButton>
      <Typography variant="body2" sx={iconTextStyles(isEnabled)}>
        Microphone {isEnabled ? "On" : "Off"}
      </Typography>
    </Box>
  );
};
const ControlsButtons = ({ children }) => (
  <Stack
    direction="row"
    spacing={4}
    justifyContent="center"
    component={motion.div}
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
      },
    }}
    initial="hidden"
    animate="show"
  >
    {children}
  </Stack>
);
const Wrapper = ({ children }) => (
  <Paper
    component={motion.div}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.6 }}
    elevation={1}
    sx={paperStyles}
  >
    {children}
  </Paper>
);
interface DeviceControlsProps {
  stream: MediaStream | null;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}

const DeviceControls: React.FC<DeviceControlsProps> = ({
  stream,
  setStream,
}) => {
  const toggleVideoTrack = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setStream(new MediaStream(stream.getTracks()));
    }
  };

  const toggleAudioTrack = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setStream(new MediaStream(stream.getTracks()));
    }
  };

  return (
    <Wrapper>
      <Typography variant="subtitle1" sx={titleStyles}>
        Device Controls
      </Typography>

      <ControlsButtons>
        <VideoControl stream={stream} onClick={toggleVideoTrack} />
        <AudioControl stream={stream} onClick={toggleAudioTrack} />
      </ControlsButtons>
    </Wrapper>
  );
};

export default DeviceControls;

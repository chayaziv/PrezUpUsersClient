
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

interface DeviceControlsProps {
  stream: MediaStream | null;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}

const DeviceControls: React.FC<DeviceControlsProps> = ({ stream, setStream }) => {
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
    <Paper
      component={motion.div}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      elevation={1}
      sx={paperStyles}
    >
      <Typography variant="subtitle1" sx={titleStyles}>
        Device Controls
      </Typography>

      <Stack
        direction="row"
        spacing={4}
        justifyContent="center"
        component={motion.div}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <Box
          sx={{ textAlign: "center" }}
          component={motion.div}
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 },
          }}
        >
          <IconButton
            color={stream?.getVideoTracks()[0]?.enabled ? "primary" : "default"}
            sx={iconButtonStyles(!!stream?.getVideoTracks()[0]?.enabled)}
            onClick={toggleVideoTrack}
          >
            {stream?.getVideoTracks()[0]?.enabled ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          <Typography
            variant="body2"
            sx={iconTextStyles(!!stream?.getVideoTracks()[0]?.enabled)}
          >
            Camera {stream?.getVideoTracks()[0]?.enabled ? "On" : "Off"}
          </Typography>
        </Box>

        <Box
          sx={{ textAlign: "center" }}
          component={motion.div}
          variants={{
            hidden: { y: 20, opacity: 0 },
            show: { y: 0, opacity: 1 },
          }}
        >
          <IconButton
            color={stream?.getAudioTracks()[0]?.enabled ? "primary" : "default"}
            sx={iconButtonStyles(!!stream?.getAudioTracks()[0]?.enabled)}
            onClick={toggleAudioTrack}
          >
            {stream?.getAudioTracks()[0]?.enabled ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <Typography
            variant="body2"
            sx={iconTextStyles(!!stream?.getAudioTracks()[0]?.enabled)}
          >
            Microphone {stream?.getAudioTracks()[0]?.enabled ? "On" : "Off"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default DeviceControls;
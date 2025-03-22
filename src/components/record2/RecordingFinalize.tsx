import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import LockIcon from "@mui/icons-material/Lock";
import LabelIcon from "@mui/icons-material/Label";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { RecordingData } from "./RecordManager";
import axios from "axios";
import API from "../../axiosInstance";

interface RecordingFinalizeProps {
  recordingData: RecordingData;
  onReset: () => void;
}

const RecordingFinalize: React.FC<RecordingFinalizeProps> = ({
  recordingData,
  onReset,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

//   const handlePlay = () => {
//     if (videoRef.current) {
//       videoRef.current.play();
//     }
//   };

  const handleDownload = () => {
    if (recordingData.audioBlob) {
      const url = URL.createObjectURL(recordingData.audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recordingData.title.replace(/ /g, "_")}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  //   const handleUpload = () => {
  //     setIsUploading(true);
  //     setError(null);

  //     // Simulate upload with progress updates
  //     const interval = setInterval(() => {
  //       setUploadProgress((prev) => {
  //         const newProgress = prev + 10;
  //         if (newProgress >= 100) {
  //           clearInterval(interval);
  //           setTimeout(() => {
  //             setUploadComplete(true);
  //             setIsUploading(false);
  //           }, 500);
  //           return 100;
  //         }
  //         return newProgress;
  //       });
  //     }, 400);
  //   };
  const submitRecording = async () => {
    // if (!recordingData.audioBlob) {
    //   setError(
    //     "No recording found. Please go back and record your presentation."
    //   );
    //   return;
    // }
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("audio", recordingData.audioBlob!, "recording.wav");
    formData.append("title", recordingData.title);
    formData.append("isPublic", recordingData.isPublic.toString());
    formData.append("tagsJson", JSON.stringify(recordingData.tags));
    try {
      await API.post("presentation/analyze-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      setUploadComplete(true);
      //   navigate("/my-presentations");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to upload the recording");
    } finally {
      setIsUploading(false);
    }
  };

  if (!recordingData.audioBlob) {
    console.log("No ", recordingData);
    return (
      <Alert severity="error">
        No recording found. Please go back and record your presentation.
      </Alert>
    );
  }

  const videoUrl = URL.createObjectURL(recordingData.audioBlob);
  const videoSize =
    Math.round((recordingData.audioBlob.size / (1024 * 1024)) * 10) / 10; // Size in MB with 1 decimal

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <VideoFileIcon color="primary" sx={{ mr: 1.5, fontSize: 28 }} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Review Your Presentation
        </Typography>
      </Box>

      <Typography
        variant="body1"
        gutterBottom
        sx={{ mb: 3, color: "text.secondary" }}
      >
        Your recording is ready! Review it before uploading to the server.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          overflow: "hidden",
          border: "4px solid #00838F",
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            backgroundColor: "#000",
          }}
        />
      </Paper>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "primary.main", fontWeight: 600, mb: 2 }}
          >
            Presentation Details
          </Typography>

          <List dense>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                {recordingData.isPublic ? (
                  <PublicIcon color="primary" />
                ) : (
                  <LockIcon sx={{ color: "text.secondary" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Visibility
                  </Typography>
                }
                secondary={recordingData.isPublic ? "Public" : "Private"}
              />
            </ListItem>

            <Divider component="li" sx={{ my: 1 }} />

            <ListItem sx={{ px: 0 }}>
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
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mt: 0.5,
                    }}
                  >
                    {recordingData.tags.length > 0 ? (
                      recordingData.tags.map((tag) => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ borderRadius: 1 }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No tags
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>

            <Divider component="li" sx={{ my: 1 }} />

            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <VideoFileIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    File Size
                  </Typography>
                }
                secondary={`${videoSize} MB`}
              />
            </ListItem>
          </List>
        </Paper>

        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: "rgba(0, 131, 143, 0.03)",
            border: "1px solid rgba(0, 131, 143, 0.1)",
            flex: 1,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "primary.main", fontWeight: 600, mb: 2 }}
          >
            Actions
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {isUploading && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
              >
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </Typography>
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          )}

          {uploadComplete ? (
            <Box
              sx={{
                textAlign: "center",
                p: 3,
                bgcolor: "success.light",
                borderRadius: 2,
              }}
            >
              <CheckCircleIcon
                sx={{ fontSize: 48, color: "success.main", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Upload Complete!
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Your presentation has been successfully uploaded.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                disabled={isUploading}
                sx={{
                  justifyContent: "flex-start",
                  borderRadius: 2,
                  py: 1.2,
                }}
              >
                Download Recording
              </Button>

              {/* <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<PlayArrowIcon />}
                onClick={handlePlay}
                disabled={isUploading}
                sx={{
                  justifyContent: "flex-start",
                  borderRadius: 2,
                  py: 1.2,
                }}
              >
                Play Again
              </Button> */}

              <Button
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
                onClick={submitRecording}
                disabled={isUploading || uploadComplete}
                sx={{
                  justifyContent: "flex-start",
                  borderRadius: 2,
                  py: 1.2,
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0, 131, 143, 0.25)",
                  },
                }}
              >
                {isUploading ? "Uploading..." : "Upload to Server"}
              </Button>
            </Stack>
          )}
        </Paper>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="text"
          color="primary"
          startIcon={<RestartAltIcon />}
          onClick={onReset}
          sx={{
            borderRadius: 2,
            py: 1,
            px: 3,
          }}
        >
          Record Another Presentation
        </Button>
      </Box>
    </Box>
  );
};

export default RecordingFinalize;

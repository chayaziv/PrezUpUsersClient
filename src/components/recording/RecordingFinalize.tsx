import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addPresentation } from "@/store/slices/myPresentations";
import { AppDispatch } from "@/store/store";
import {
  Box,
  Typography,
  Alert,
  Paper,
  Stack,
  Divider,
  alpha,
  Snackbar,
} from "@mui/material";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { motion } from "framer-motion";
import PreviewPlayer from "./preview/PreviewPlayer";
import PresentationDetails from "./preview/PresentationDetails";
import UploadProgress from "./upload/UploadProgress";
import UploadComplete from "./upload/UploadComplete";
import ResetButton from "./preview/ResetButton";
import { TagType } from "@/types/tag";
import { RecordingData } from "@/types/recording";
import ActionControls from "./preview/ActionControls";

const Header = () => (
  <>
    <Box
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      sx={{ display: "flex", alignItems: "center", mb: 3 }}
    >
      <VideoFileIcon
        color="primary"
        sx={{
          mr: 1.5,
          fontSize: 28,
          filter: "drop-shadow(0 0 10px rgba(0, 131, 143, 0.5))",
        }}
      />
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          background: "linear-gradient(to right, #00838F, #4FB3BF)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Review Your Presentation
      </Typography>
    </Box>

    <Typography
      component={motion.p}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      variant="body1"
      gutterBottom
      sx={{ mb: 3, color: "text.secondary" }}
    >
      Your recording is ready! Review it before uploading to the server.
    </Typography>
  </>
);

const Actions = ({ error, children }) => (
  <Paper
    elevation={1}
    sx={{
      p: 3,
      borderRadius: 2,
      background:
        "linear-gradient(145deg, rgba(255, 255, 255, 0.3) 0%, rgba(170, 215, 215, 0.2) 100%)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(0, 131, 143, 0.1)",
      boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
      flex: 1,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        transform: "translateY(-5px)",
      },
    }}
  >
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        color: "primary.main",
        fontWeight: 600,
        mb: 2,
        textShadow: "0 0 10px rgba(0, 131, 143, 0.3)",
      }}
    >
      Actions
    </Typography>

    {error && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
      >
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </motion.div>
    )}
    {children}
  </Paper>
);

const SnackbarAlert = ({ snackbar, handleCloseSnackbar }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={handleCloseSnackbar}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert
      onClose={handleCloseSnackbar}
      severity={snackbar.severity}
      sx={{ width: "100%" }}
    >
      {snackbar.message}
    </Alert>
  </Snackbar>
);

const Wrapper = ({ children }) => (
  <Box
    component={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    sx={{ width: "100%" }}
  >
    {children}
  </Box>
);

const RecordingSummary = ({ children }) => (
  <Stack
    component={motion.div}
    initial={{ y: 30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
    direction={{ xs: "column", md: "row" }}
    spacing={3}
    sx={{ mb: 4 }}
  >
    {children}
  </Stack>
);

const DividerSection = () => (
  <Divider
    component={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.5 }}
    transition={{ delay: 0.9 }}
    sx={{ my: 3 }}
  />
);

interface RecordingFinalizeProps {
  recordingData: RecordingData;
  onReset: () => void;
}

const RecordingFinalize: React.FC<RecordingFinalizeProps> = ({
  recordingData,
  onReset,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity?: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleDownload = () => {
    if (recordingData.videoBlob) {
      const url = URL.createObjectURL(recordingData.videoBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recordingData.name.replace(/ /g, "_")}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSnackbar({
        open: true,
        message: "Your recording is being downloaded to your device.",
        severity: "info",
      });
    }
  };

  const handleUpload = async () => {
    if (!recordingData.videoBlob) {
      setError("No recording data available");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append(
        "audio",
        recordingData.videoBlob,
        `${recordingData.name}.webm`
      );
      formData.append("title", recordingData.name);
      formData.append("isPublic", recordingData.isPublic.toString());

      // וידוא שהתגיות נשלחות בצורה תקינה
      const tagsJson =
        recordingData.tags && recordingData.tags.length > 0
          ? JSON.stringify(recordingData.tags)
          : "[]";
      formData.append("tagsJson", tagsJson);

      await dispatch(addPresentation(formData)).unwrap();

      setUploadComplete(true);
      setSnackbar({
        open: true,
        message: "Your presentation has been successfully uploaded.",
        severity: "success",
      });
    } catch (error: any) {
      setError(error.message || "Failed to upload presentation");
      setSnackbar({
        open: true,
        message: "Failed to upload presentation. Please try again.",
        severity: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyLink = () => {
    // Simulate copying a link
    navigator.clipboard.writeText(
      `https://presentation-app.com/view/${recordingData.name
        .replace(/ /g, "-")
        .toLowerCase()}`
    );
    setCopySuccess(true);
    setSnackbar({
      open: true,
      message: "Link copied to clipboard!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (!recordingData.videoBlob) {
    return (
      <Alert severity="error">
        No recording found. Please go back and record your presentation.
      </Alert>
    );
  }

  const videoUrl = URL.createObjectURL(recordingData.videoBlob);
  const videoSize =
    Math.round((recordingData.videoBlob.size / (1024 * 1024)) * 10) / 10; // Size in MB with 1 decimal

  return (
    <Wrapper>
      <SnackbarAlert
        snackbar={snackbar}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      <Header />
      <PreviewPlayer videoUrl={videoUrl} />

      <RecordingSummary>
        <PresentationDetails
          name={recordingData.name}
          isPublic={recordingData.isPublic}
          tags={recordingData.tags}
          fileSize={videoSize}
        />
        <Actions error={error}>
          <UploadProgress
            isUploading={isUploading}
            uploadProgress={uploadProgress}
          />

          {uploadComplete ? (
            <UploadComplete presentationName={recordingData.name} />
          ) : (
            <ActionControls
              isUploading={isUploading}
              uploadComplete={uploadComplete}
              isPublic={recordingData.isPublic}
              onDownload={handleDownload}
              onPlay={handlePlay}
              onUpload={handleUpload}
              onCopyLink={handleCopyLink}
              copySuccess={copySuccess}
            />
          )}
        </Actions>
      </RecordingSummary>

      <DividerSection />

      <ResetButton onReset={onReset} />
    </Wrapper>
  );
};

export default RecordingFinalize;

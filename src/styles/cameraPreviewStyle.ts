import { SystemStyleObject, Theme } from "@mui/system";

export const paperStyles = (
  isRecording: boolean
): SystemStyleObject<Theme> => ({
  width: "100%",
  height: "100%",
  mb: 3,
  borderRadius: 2,
  overflow: "hidden",
  position: "relative",
  bgcolor: "#000",
  border: isRecording ? "2px solid #00838F" : "none",
  transition: "border 0.3s ease",
  boxShadow: isRecording
    ? "0 0 20px rgba(0, 131, 143, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.6)"
    : "0 8px 32px rgba(0, 0, 0, 0.3)",
});

export const videoStyles: React.CSSProperties = {
  width: "100%",
  height: "auto",
  maxHeight: "400px",
  objectFit: "cover",
};

export const countdownOverlayStyles: SystemStyleObject<Theme> = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "rgba(0, 0, 0, 0.7)",
  zIndex: 10,
  borderRadius: 2,
};

export const countdownTextStyles: SystemStyleObject<Theme> = {
  color: "white",
  fontSize: "5rem",
  textShadow: "0 0 30px rgba(0, 131, 143, 0.8)",
};

export const recordingIndicatorStyles: SystemStyleObject<Theme> = {
  position: "absolute",
  top: 10,
  right: 10,
  display: "flex",
  alignItems: "center",
  bgcolor: "rgba(0, 0, 0, 0.7)",
  px: 1.5,
  py: 0.7,
  borderRadius: 10,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

export const recordingIconStyles = (isPaused: boolean): SystemStyleObject<Theme> => ({
  mr: 1,
  animation: isPaused ? "none" : "pulse 1.5s infinite ease-in-out",
  "@keyframes pulse": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.3 },
    "100%": { opacity: 1 },
  },
});

export const recordingTimeTextStyles: SystemStyleObject<Theme> = {
  color: "white",
  fontWeight: "medium",
};
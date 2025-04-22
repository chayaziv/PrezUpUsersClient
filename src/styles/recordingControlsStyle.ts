import { SystemStyleObject, Theme } from "@mui/system";
import { alpha } from "@mui/material/styles";

export const backButtonStyles: SystemStyleObject<Theme> = {
  borderRadius: 2,
  borderColor: "rgba(255, 255, 255, 0.15)",
  "&:hover": {
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
};

export const startButtonStyles: SystemStyleObject<Theme> = {
  px: 3,
  py: 1,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s",
  background: "linear-gradient(45deg, #00838F 30%, #4FB3BF 90%)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 25px rgba(0, 131, 143, 0.5)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.5s",
  },
  "&:hover::before": {
    opacity: 1,
  },
};

export const pauseResumeButtonStyles = (
  isPaused: boolean,
  theme: Theme
): SystemStyleObject<Theme> => ({
  borderRadius: 2,
  borderColor: isPaused
    ? alpha(theme.palette.success.main, 0.5)
    : alpha(theme.palette.primary.main, 0.5),
  "&:hover": {
    borderColor: isPaused
      ? alpha(theme.palette.success.main, 0.8)
      : alpha(theme.palette.primary.main, 0.8),
    backgroundColor: isPaused
      ? alpha(theme.palette.success.main, 0.05)
      : alpha(theme.palette.primary.main, 0.05),
  },
});

export const stopButtonStyles: SystemStyleObject<Theme> = {
  px: 3,
  borderRadius: 2,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(220, 0, 0, 0.3)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.5s",
  },
  "&:hover::before": {
    opacity: 1,
  },
};
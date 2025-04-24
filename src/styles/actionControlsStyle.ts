import { alpha, SxProps, Theme } from "@mui/material";

// עיצוב עבור כפתור ההורדה
export const downloadButtonStyles: SxProps<Theme> = {
  justifyContent: "flex-start",
  borderRadius: 2,
  py: 1.2,
  borderColor: alpha("#FFFFFF", 0.2),
  background: alpha("#000000", 0.2),
  "&:hover": {
    borderColor: alpha("#FFFFFF", 0.3),
    background: alpha("#000000", 0.3),
  },
};

// עיצוב עבור כפתור הניגון
export const playButtonStyles: SxProps<Theme> = {
  justifyContent: "flex-start",
  borderRadius: 2,
  py: 1.2,
  borderColor: alpha("#B2EBF2", 0.3),
  background: alpha("#B2EBF2", 0.05),
  "&:hover": {
    borderColor: alpha("#B2EBF2", 0.5),
    background: alpha("#B2EBF2", 0.1),
  },
};

// עיצוב עבור כפתור ההעלאה
export const uploadButtonStyles: SxProps<Theme> = {
  justifyContent: "flex-start",
  borderRadius: 2,
  py: 1.2,
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s",
  background: "linear-gradient(45deg, #00838F 30%, #4FB3BF 90%)",
  "&:hover": {
    transform: "translateY(-3px)",
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
      "radial-gradient(circle, rgba(228, 218, 218, 0.3) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.5s",
  },
  "&:hover::before": {
    opacity: 1,
  },
};

// עיצוב עבור כפתור השיתוף
export const shareButtonStyles: SxProps<Theme> = {
  justifyContent: "flex-start",
  borderRadius: 2,
  py: 1,
  color: alpha("#2F4F4F", 0.7),
  "&:hover": {
    background: alpha("#2F4F4F", 0.05),
    color: alpha("#2F4F4F", 0.9),
  },
};

// עיצוב עבור ה-wrapper של הקומפוננטה
export const wrapperStyles: SxProps<Theme> = {
  component: "div",
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.5, staggerChildren: 0.1 },
  spacing: 2,
};

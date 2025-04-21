import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const outerBoxStyles: SystemStyleObject<Theme> = {
  minHeight: "calc(100vh - 64px)",
  py: 4,
  px: { xs: 2, md: 4 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(circle at 10% 20%, rgba(58, 54, 224, 0.05) 0%, rgba(0, 0, 0, 0) 80%)",
};

export const titleStyles = (theme: Theme): SystemStyleObject<Theme> => ({
  mb: 4,
  fontSize: { xs: "1.75rem", md: "2.5rem" },
  color: "primary.main",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  background: `linear-gradient(to right, ${theme.palette.custom.blue}, ${theme.palette.custom.lightBlue})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

export const stepperStyles = (theme: Theme): SystemStyleObject<Theme> => ({
  mb: 4,
  p: 3,
  borderRadius: 3,
  backgroundColor: `rgba(58, 54, 224, 0.03)`,
  backdropFilter: "blur(10px)",
  "& .MuiStepLabel-root .Mui-active": {
    color: "primary.main",
  },
  "& .MuiStepLabel-root .Mui-completed": {
    color: "primary.main",
  },
  "& .MuiStepLabel-label": {
    mt: 1,
    color: "text.secondary",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: "primary.main",
    fontWeight: "bold",
  },
});

export const paperStyles = (
  theme: Theme,
  activeStep: number
): SystemStyleObject<Theme> => ({
  p: { xs: 3, md: 4 },
  borderRadius: 4,
  transition: "all 0.3s ease",
  transform: `translateY(${activeStep === 0 ? 0 : activeStep === 1 ? 5 : 10}px)`,
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
  border: "1px solid",
  borderColor: `rgba(58, 54, 224, 0.1)`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: `linear-gradient(to right, ${theme.palette.custom.blue}, ${theme.palette.custom.lightBlue})`,
  },
});

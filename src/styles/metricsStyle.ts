import { SystemStyleObject, Theme } from "@mui/system";

export const overallScoreContainerStyles: SystemStyleObject<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 3,
};

export const overallScoreCircleStyles = (score: string): SystemStyleObject<Theme> => ({
  ml: "auto",
  width: 80,
  height: 80,
  borderRadius: "50%",
  border: `8px solid ${score}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.paper",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
});

export const metricCardStyles: SystemStyleObject<Theme> = {
  borderRadius: 3,
  boxShadow: "none",
};

export const metricProgressStyles = (value: string): SystemStyleObject<Theme> => ({
  height: 8,
  borderRadius: 4,
  mb: 2,
  bgcolor: "rgba(0,0,0,0.04)",
  "& .MuiLinearProgress-bar": {
    bgcolor: value,
    borderRadius: 4,
  },
});

export const metricsContainerStyles: SystemStyleObject<Theme> = {
  p: 3,
  mb: 4,
  borderRadius: 4,
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
};
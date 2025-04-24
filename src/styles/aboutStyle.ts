// src/styles/aboutStyles.ts
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const containerBoxSx: SystemStyleObject<Theme> = {
  mb: 6,
};

export const titleSx: SystemStyleObject<Theme> = {
  fontWeight: "bold",
  mb: 2,
};

export const subtitleSx: SystemStyleObject<Theme> = {
  mb: 6,
  maxWidth: 800,
  mx: "auto",
};

export const missionPaperSx: SystemStyleObject<Theme> = {
  p: 4,
  mb: 6,
  borderRadius: 3,
  backgroundColor: "primary.main",
  color: "white",
};

export const missionImageSx: SystemStyleObject<Theme> = {
  width: "100%",
  height: "auto",
  borderRadius: 2,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
};

export const cardSx: SystemStyleObject<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
  },
};

export const benefitsPaperSx: SystemStyleObject<Theme> = {
  p: 4,
  mb: 6,
  borderRadius: 3,
};

export const avatarBoxSx: SystemStyleObject<Theme> = {
  p: 3,
  display: "flex",
  justifyContent: "center",
};

export const avatarSx: SystemStyleObject<Theme> = {
  width: 100,
  height: 100,
  bgcolor: "primary.main",
};

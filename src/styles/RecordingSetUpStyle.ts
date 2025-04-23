
import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const form: SxProps<Theme> = {
  width: "100%",
};

export const headerBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 3,
};

export const settingsIcon: SxProps<Theme> = {
  mr: 1.5,
  fontSize: 26,
  color: "primary.main",
};

export const headerText: SxProps<Theme> = {
  color: "text.primary",
  fontWeight: 600,
};

export const subHeaderText: SxProps<Theme> = {
  mb: 4,
  color: "text.secondary",
};

export const paperBox: SxProps<Theme> = {
  p: 3,
  mb: 4,
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
};

export const continueButton: SxProps<Theme> = {
  px: 3,
  py: 1,
  borderRadius: 2,
};

// Presentation Name Field Styles
export const presentationNameBox: SxProps<Theme> = {
  mb: 3,
};

export const presentationNameLabelBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  mb: 1,
};

export const presentationNameIcon: SxProps<Theme> = {
  mr: 1,
  mt: 0.5,
  color: "text.secondary",
};

export const presentationNameText: SxProps<Theme> = {
  fontWeight: 500,
  color: "text.primary",
};

// Visibility Toggle Styles
export const visibilityBox: SxProps<Theme> = {
  mb: 3,
};

export const visibilityLabelBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  mb: 1,
};

export const visibilityIcon: SxProps<Theme> = {
  mr: 1,
  mt: 0.5,
  color: "text.secondary",
};

export const visibilityText: SxProps<Theme> = {
  fontWeight: 500,
  color: "text.primary",
};

export const visibilityLabelText: SxProps<Theme> = {
  fontSize: "body2",
  color: "text.secondary",
};

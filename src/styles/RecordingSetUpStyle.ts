// styles/RecordingSetupStyle.ts
import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const formStyle: SxProps<Theme> = {
  width: "100%",
};

export const headerBoxStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 3,
};

export const settingsIconStyle: SxProps<Theme> = {
  mr: 1.5,
  fontSize: 26,
  color: "primary.main",
};

export const headerTextStyle: SxProps<Theme> = {
  color: "text.primary",
  fontWeight: 600,
};

export const subHeaderTextStyle: SxProps<Theme> = {
  mb: 4,
  color: "text.secondary",
};

export const paperBoxStyle: SxProps<Theme> = {
  p: 3,
  mb: 4,
  bgcolor: "background.paper",
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
};

export const continueButtonStyle: SxProps<Theme> = {
  px: 3,
  py: 1,
  borderRadius: 2,
};

import { SxProps, Theme } from "@mui/material";

export const containerStyle: SxProps<Theme> = {
  width: "100%",
  position: "relative",
};

export const loadingBoxStyle: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  py: 6,
};

export const loadingSpinnerStyle: SxProps<Theme> = {
  mb: 2,
};

export const errorAlertStyle: SxProps<Theme> = {
  mb: 2,
};

export const dividerStyle: SxProps<Theme> = {
  my: 3,
};

export const titleStyle = (theme: Theme): SxProps<Theme> => ({
  color: "primary.main",
  fontWeight: "bold",
  mb: 2,
  background: `linear-gradient(to right, ${theme.palette.custom.blue}, ${theme.palette.custom.lightBlue})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
});

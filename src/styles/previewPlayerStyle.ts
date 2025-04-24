import { Theme, alpha, SxProps } from "@mui/material";

export const styledContainer: SxProps<Theme> = {
  mb: 4,
  borderRadius: 3,
  overflow: "hidden",
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
  position: "relative",
};

export const videoStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  maxHeight: "450px",
  backgroundColor: "#000",
  position: "relative",
  zIndex: 0,
  display: "block",
};

export const playOverlay: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 5,
  opacity: 0.9,
};

export const playButton: SxProps<Theme> = {
  bgcolor: "primary.main",
  color: "white",
  p: 2,
  "&:hover": {
    bgcolor: "primary.dark",
  },
};

export const controlsOverlay = (isVisible: boolean): SxProps<Theme> => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  p: 1.5,
  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
  transition: "opacity 0.3s ease",
  opacity: isVisible ? 1 : 0,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const sliderSection: SxProps<Theme> = {
  color: "primary.main",
  height: 4,
  "& .MuiSlider-thumb": {
    width: 8,
    height: 8,
    "&:hover, &.Mui-focusVisible": {
      boxShadow: (theme) => `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
    },
  },
};

export const controlsBar: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  px: 1,
};

export const sideSection: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
};

export const controlIconButton: SxProps<Theme> = {
  color: "white",
  mr: 1,
};

export const timeText: SxProps<Theme> = {
  color: "white",
};

export const volumeSlider: SxProps<Theme> = {
  width: 80,
  color: "white",
  mx: 1,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    width: 12,
    height: 12,
    backgroundColor: "#fff",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: `0px 0px 0px 8px ${alpha("#fff", 0.16)}`,
    },
  },
};

export const fullscreenButton: SxProps<Theme> = {
  color: "white",
};

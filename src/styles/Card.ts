import { SxProps, Theme } from "@mui/material";

export const cardStyles: SxProps<Theme> = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
  },
};

export const availableCardContentStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "180px",
  bgcolor: "grey.50",
  borderBottom: "1px solid",
  borderColor: "grey.200",
};

export const titleStyles: SxProps<Theme> = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "3em",
  fontWeight: 500,
  color: "#333",
};

export const scoreStyles: SxProps<Theme> = {
  mb: 1.5,
};

export const dateStyles: SxProps<Theme> = {
  mb: 1.5,
};

export const tagsStyles: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
  mb: 1.5,
};

export const chipStyles: SxProps<Theme> = {
  mr: 0.5,
  mb: 0.5,
  bgcolor: "rgba(0,0,0,0.05)",
  color: "text.secondary",
  borderRadius: 1,
};

export const detailsContentStyles: SxProps<Theme> = {
  flexGrow: 1,
  pt: 2,
  px: 2.5,
};

export const viewButtonStyles: SxProps<Theme> = {
  justifyContent: "flex-end",
  px: 2,
  pb: 1.5,
};
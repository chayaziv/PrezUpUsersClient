import { Theme } from "@mui/material/styles";
import { SxProps, SystemStyleObject } from "@mui/system";

export const drawerSx = (
  isCollapsed: boolean,
  drawerWidth: number,
  theme: Theme
): SxProps<Theme> => ({
  width: isCollapsed ? 64 : drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: isCollapsed ? 64 : drawerWidth,
    boxSizing: "border-box",
    borderRight: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "none",
    mt: "64px",
    background: "#FAFAFA",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

export const listItemButtonSx: SxProps<Theme> = {
  borderRadius: "0 20px 20px 0",
  mr: 1,
  mb: 0.5,
  minHeight: 48,
  px: 2.5,
  "&.Mui-selected": {
    background: "rgba(75, 124, 133, 0.08)",
    color: "primary.main",
    "&:hover": {
      background: "rgba(75, 124, 133, 0.12)",
    },
    "& .MuiListItemIcon-root": {
      color: "primary.main",
    },
  },
  "&:hover": {
    background: "rgba(0, 0, 0, 0.04)",
  },
};

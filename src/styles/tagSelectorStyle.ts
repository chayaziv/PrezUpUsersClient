import { SystemStyleObject, Theme } from "@mui/system";
import { alpha } from "@mui/material/styles";

export const containerStyles: SystemStyleObject<Theme> = {
  mb: 3,
};

export const headerStyles: SystemStyleObject<Theme> = {
  display: "flex",
  alignItems: "flex-start",
  mb: 1,
};

export const iconStyles: SystemStyleObject<Theme> = {
  mr: 1,
  mt: 0.5,
  color: "text.secondary",
};

export const titleStyles: SystemStyleObject<Theme> = {
  fontWeight: 500,
  color: "text.primary",
};

export const chipStyles = (theme: Theme): SystemStyleObject<Theme> => ({
  borderRadius: 2,
  background: alpha(theme.palette.primary.main, 0.05),
  borderColor: alpha(theme.palette.primary.main, 0.3),
});

export const captionStyles: SystemStyleObject<Theme> = {
  mt: 0.5,
  display: "block",
  color: "text.secondary",
};
import { SystemStyleObject, Theme } from "@mui/system";

export const wrapperStyles: SystemStyleObject<Theme> = {
  p: 2.5,
  mb: 4,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "rgba(0, 0, 0, 0.06)",
  background: "#FFFFFF",
};

export const titleBoxStyles: SystemStyleObject<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 2,
};

export const titleIconStyles: SystemStyleObject<Theme> = {
  mr: 1,
  color: "text.secondary",
};

export const titleTextStyles: SystemStyleObject<Theme> = {
  fontWeight: 500,
  color: "text.primary",
};

export const selectStyles: SystemStyleObject<Theme> = {
  borderRadius: 1.5,
};

export const searchBarStyles: SystemStyleObject<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
  },
};
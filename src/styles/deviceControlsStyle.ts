import { SystemStyleObject, Theme } from "@mui/system";

export const paperStyles: SystemStyleObject<Theme> = {
  mt: 3,
  p: 3,
  borderRadius: 2,
  background: "linear-gradient(145deg, rgba(0, 20, 30, 0.3) 0%, rgba(0, 40, 50, 0.2) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(0, 131, 143, 0.1)",
  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
};

export const titleStyles: SystemStyleObject<Theme> = {
  mb: 2,
  fontWeight: "medium",
  color: "primary.main",
  textShadow: "0 0 10px rgba(0, 131, 143, 0.3)",
};

export const iconButtonStyles = (enabled: boolean): SystemStyleObject<Theme> => ({
  bgcolor: enabled ? "rgba(0, 131, 143, 0.1)" : "rgba(0, 0, 0, 0.05)",
  p: 2,
  transition: "all 0.3s",
  "&:hover": {
    bgcolor: enabled ? "rgba(0, 131, 143, 0.15)" : "rgba(0, 0, 0, 0.08)",
    transform: "translateY(-3px)",
    boxShadow: enabled
      ? "0 6px 15px rgba(0, 131, 143, 0.3)"
      : "0 6px 15px rgba(0, 0, 0, 0.1)",
  },
});

export const iconTextStyles = (enabled: boolean): SystemStyleObject<Theme> => ({
  mt: 1,
  color: enabled ? "primary.main" : "text.secondary",
  transition: "color 0.3s",
});
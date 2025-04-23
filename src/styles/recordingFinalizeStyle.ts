import { Theme, SystemStyleObject } from "@mui/system";

export const styles: Record<string, SystemStyleObject<Theme>> = {
  container: {
    width: "100%",
  },
  headerBox: {
    display: "flex",
    alignItems: "center",
    mb: 3,
  },
  icon: {
    mr: 1.5,
    fontSize: 28,
    filter: "drop-shadow(0 0 10px rgba(0, 131, 143, 0.5))",
  },
  title: {
    color: "primary.main",
    fontWeight: "bold",
    background: "linear-gradient(to right, #00838F, #4FB3BF)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    mb: 3,
    color: "text.secondary",
  },
  actionsCard: {
    p: 3,
    borderRadius: 2,
    background: "linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(170, 215, 215, 0.2))",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 131, 143, 0.1)",
    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.05)",
    flex: 1,
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      transform: "translateY(-5px)",
    },
  },
  actionsTitle: {
    color: "primary.main",
    fontWeight: 600,
    mb: 2,
    textShadow: "0 0 10px rgba(0, 131, 143, 0.3)",
  },
};

import { SystemStyleObject, Theme } from "@mui/system";

export const styles: { [key: string]: SystemStyleObject<Theme> } = {
  paper: {
    p: 3,
    mb: 3,
    borderRadius: 3,
    background: "white",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  title: {
    fontWeight: "medium",
  },
  progressWrapper: {
    position: "relative",
  },
  progressBase: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  timestamps: {
    display: "flex",
    justifyContent: "space-between",
    mt: 1,
  },
};

export default styles;
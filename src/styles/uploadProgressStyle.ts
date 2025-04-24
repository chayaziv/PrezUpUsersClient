import { SystemStyleObject } from "@mui/system";

export const progressTitleStyle: SystemStyleObject = {
  mb: 1,
  display: "flex",
  justifyContent: "space-between",
};

export const progressBarStyle: SystemStyleObject = {
  height: 8,
  borderRadius: 4,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  "& .MuiLinearProgress-bar": {
    background: "linear-gradient(to right, #00838F, #4FB3BF)",
    boxShadow: "0 0 10px rgba(0, 131, 143, 0.5)",
  },
};

export const uploadProgressWrapperStyle: SystemStyleObject = {
  mb: 3,
};

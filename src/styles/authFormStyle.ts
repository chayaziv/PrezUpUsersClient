// // styles/authFormStyles.ts
// import { SxProps, Theme } from "@mui/material";

// const authFormStyles: Record<string, SxProps<Theme>> = {
//   container: {
//     mt: 8,
//     p: 4,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     borderRadius: 2,
//   },
//   avatar: {
//     m: 1,
//     bgcolor: "primary.main",
//     width: 56,
//     height: 56,
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
//   title: {
//     mb: 3,
//   },
//   form: {
//     width: "100%",
//   },
//   submitButton: {
//     mt: 3,
//     mb: 2,
//     py: 1.5,
//   },
//   divider: {
//     my: 2,
//   },
//   googleButton: {
//     py: 1.2,
//     borderRadius: 2,
//     borderWidth: 1.5,
//     "&:hover": {
//       borderWidth: 1.5,
//       backgroundColor: "rgba(66, 133, 244, 0.04)",
//     },
//   },
//   githubButton: {
//     py: 1.2,
//     borderRadius: 2,
//     borderWidth: 1.5,
//     "&:hover": {
//       borderWidth: 1.5,
//       backgroundColor: "rgba(0, 0, 0, 0.04)",
//     },
//   },
// };

// export default authFormStyles;
// 
import { Theme } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const containerStyles: SystemStyleObject<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
};

export const paperStyles: SystemStyleObject<Theme> = {
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 3,
  boxShadow: 3,
  backgroundColor: "#fff",
};

export const avatarStyles: SystemStyleObject<Theme> = {
  m: 1,
  bgcolor: "secondary.main",
};

export const formStyles: SystemStyleObject<Theme> = {
  width: "100%",
  mt: 1,
};

export const submitButtonStyles: SystemStyleObject<Theme> = {
  mt: 3,
  mb: 2,
  borderRadius: "20px",
  fontWeight: "bold",
};

export const socialButtonStyles: SystemStyleObject<Theme> = {
  textTransform: "none",
  borderRadius: "20px",
  fontWeight: "bold",
};

export const googleButtonHover: SystemStyleObject<Theme> = {
  backgroundColor: "#e8f0fe",
  borderColor: "#c6dafc",
  "&:hover": {
    backgroundColor: "#d2e3fc",
    borderColor: "#a8c7ff",
  },
};

export const githubButtonHover: SystemStyleObject<Theme> = {
  backgroundColor: "#f6f8fa",
  borderColor: "#d0d7de",
  "&:hover": {
    backgroundColor: "#dfe3e6",
    borderColor: "#b5bdc5",
  },
};

export const dividerStyles: SystemStyleObject<Theme> = {
  my: 2,
  width: "100%",
};


import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      turquoise: string;
      yellow: string;
      red: string;
      blue: string;
      lightBlue: string;
      chart: {
        blue1: string;
        blue2: string;
        red1: string;
        pink: string;
        red2: string;
      };
    };
  }
  interface PaletteOptions {
    custom?: {
      turquoise?: string;
      yellow?: string;
      red?: string;
      blue?: string;
      lightBlue?: string;
      chart?: {
        blue1?: string;
        blue2?: string;
        red1?: string;
        pink?: string;
        red2?: string;
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4B7C85",
      light: "#78A2AA",
      dark: "#376169",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9E9E9E",
      light: "#CFCFCF",
      dark: "#707070",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    error: {
      main: "#D32F2F",
    },
    warning: {
      main: "#ED6C02",
    },
    info: {
      main: "#0288D1",
    },
    success: {
      main: "#2E7D32",
    },
    text: {
      primary: "#333333",
      secondary: "#757575",
    },
    custom: {
      turquoise: "#4ECDC4",
      yellow: "#FFD166",
      red: "#FF6B6B",
      blue: "#376169",
      lightBlue: "#78A2AA",
      chart: {
        blue1: "#376169",
        blue2: "#78A2AA",
        red1: "#E63946",
        pink: "#F48C99",
        red2: "#C01E2E",
      },
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "-0.01em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      letterSpacing: "0",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      letterSpacing: "0",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "0",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
        },
        containedPrimary: {
          background: "#4B7C85",
          "&:hover": {
            background: "#376169",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          },
        },
        containedSecondary: {
          background: "#9E9E9E",
          "&:hover": {
            background: "#707070",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          },
        },
        outlined: {
          borderWidth: "1px",
          "&:hover": {
            borderWidth: "1px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          borderRadius: 12,
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
        rounded: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4B7C85",
              },
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.05)",
          backgroundColor: "#FFFFFF",
          color: "#333333",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "12px 0",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "all 0.2s ease",
          margin: "2px 0",
          "&.Mui-selected": {
            background: "rgba(75, 124, 133, 0.08)",
            "&:hover": {
              background: "rgba(75, 124, 133, 0.12)",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          "&.MuiChip-colorPrimary": {
            background: "rgba(75, 124, 133, 0.1)",
            color: "#4B7C85",
          },
          "&.MuiChip-colorSecondary": {
            background: "rgba(158, 158, 158, 0.1)",
            color: "#757575",
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
          border: "2px solid #FFFFFF",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
          backgroundColor: "#4B7C85",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          "&.Mui-selected": {
            color: "#4B7C85",
          },
        },
      },
    },
  },
});

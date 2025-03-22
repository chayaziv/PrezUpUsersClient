import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import RecordingSetup from "./RecordingSetup";
import RecordingCapture from "./RecordingCapture";
import RecordingFinalize from "./RecordingFinalize";
import { TagType } from "../../types/tag";

export type RecordingData = {
  title: string;
  isPublic: boolean;
  tags: TagType[];
  audioBlob?: Blob;
};

// Create a clean black, white, and turquoise theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00838F", // Dark turquoise
      light: "#4FB3BF",
      dark: "#005662",
      contrastText: "#fff",
    },
    secondary: {
      main: "#B2EBF2", // Light turquoise
      light: "#E0F7FA",
      dark: "#80DEEA",
      contrastText: "#000",
    },
    background: {
      default: "#F5F5F5", // Light gray background
      paper: "#FFFFFF", // White paper
    },
    text: {
      primary: "#212121", // Almost black
      secondary: "#757575", // Medium gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: 16,
          background: "white",
          borderRadius: 8,
        },
      },
    },
  },
});

const RecordManager = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [recordingData, setRecordingData] = useState<RecordingData>({
    title: "",
    isPublic: false,
    tags: [],
  });

  const handleSetupComplete = (data: Partial<RecordingData>) => {
    setRecordingData((prev) => ({ ...prev, ...data }));
    setActiveStep(1);
  };

  const handleCaptureComplete = (audioBlob: Blob) => {
    setRecordingData((prev) => ({ ...prev, audioBlob }));
    setActiveStep(2);
  };

  const handleReset = () => {
    setRecordingData({
      title: "",
      isPublic: false,
      tags: [],
    });
    setActiveStep(0);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const steps = ["Setup", "Record", "Finalize"];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          py: 4,
          px: { xs: 2, md: 4 },
          backgroundColor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            align="center"
            sx={{
              mb: 4,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              color: "primary.main",
            }}
          >
            Presentation Recorder
          </Typography>

          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              "& .MuiStepLabel-root .Mui-active": {
                color: "primary.main",
              },
              "& .MuiStepLabel-root .Mui-completed": {
                color: "primary.main",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: "background.paper",
              borderRadius: 2,
              transition: "transform 0.3s ease",
              transform: `translateY(${
                activeStep === 0 ? 0 : activeStep === 1 ? 5 : 10
              }px)`,
            }}
          >
            {activeStep === 0 && (
              <RecordingSetup
                initialData={recordingData}
                onComplete={handleSetupComplete}
              />
            )}
            {activeStep === 1 && (
              <RecordingCapture
                presentationTitle={recordingData.title}
                onComplete={handleCaptureComplete}
                onBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <RecordingFinalize
                recordingData={recordingData}
                onReset={handleReset}
              />
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default RecordManager;

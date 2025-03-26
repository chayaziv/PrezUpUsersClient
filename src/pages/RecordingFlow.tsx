import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  ThemeProvider,
  alpha,
} from "@mui/material";
import RecordingSetup from "@/components/recording/RecordingSetup";
import RecordingCapture from "@/components/recording/RecordingCapture";
import RecordingFinalize from "@/components/recording/RecordingFinalize";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";

type RecordingData = {
  name: string;
  isPublic: boolean;
  tags: string[];
  videoBlob?: Blob;
};

const RecordingFlow = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [recordingData, setRecordingData] = useState<RecordingData>({
    name: "",
    isPublic: false,
    tags: [],
  });

  const handleSetupComplete = (data: Partial<RecordingData>) => {
    setRecordingData((prev) => ({ ...prev, ...data }));
    setActiveStep(1);
  };

  const handleCaptureComplete = (videoBlob: Blob) => {
    setRecordingData((prev) => ({ ...prev, videoBlob }));
    setActiveStep(2);
  };

  const handleReset = () => {
    setRecordingData({
      name: "",
      isPublic: false,
      tags: [],
    });
    setActiveStep(0);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const steps = ["Setup", "Record", "Finalize"];

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        py: 4,
        px: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(58, 54, 224, 0.05) 0%, rgba(0, 0, 0, 0) 80%)",
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
            fontWeight: 800,
            letterSpacing: "-0.02em",
            background: `linear-gradient(to right, ${theme.palette.custom.blue}, ${theme.palette.custom.lightBlue})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
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
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.custom.blue, 0.03),
            backdropFilter: "blur(10px)",
            "& .MuiStepLabel-root .Mui-active": {
              color: "primary.main",
            },
            "& .MuiStepLabel-root .Mui-completed": {
              color: "primary.main",
            },
            "& .MuiStepLabel-label": {
              mt: 1,
              color: "text.secondary",
            },
            "& .MuiStepLabel-label.Mui-active": {
              color: "primary.main",
              fontWeight: "bold",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                transition: "all 0.3s ease",
                transform: `translateY(${
                  activeStep === 0 ? 0 : activeStep === 1 ? 5 : 10
                }px)`,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                border: "1px solid",
                borderColor: alpha(theme.palette.custom.blue, 0.1),
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background: `linear-gradient(to right, ${theme.palette.custom.blue}, ${theme.palette.custom.lightBlue})`,
                },
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
                  presentationName={recordingData.name}
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
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default RecordingFlow;

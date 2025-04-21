
import  { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";

import RecordingSetup from "@/components/recording/RecordingSetup";
import RecordingCapture from "@/components/recording/RecordingCapture";
import RecordingFinalize from "@/components/recording/RecordingFinalize";
import { RecordingData } from "@/types/recording";
import {
  outerBoxStyles,
  paperStyles,
  stepperStyles,
  titleStyles,
} from "@/styles/RecordingFlowStyle";

const RecordingFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [recordingData, setRecordingData] = useState<RecordingData>({
    name: "",
    isPublic: false,
    tags: [],
  });

  const theme = useTheme();
  const steps = ["Setup", "Record", "Finalize"];

  const handleSetupComplete = (data: Partial<RecordingData>) => {
    setRecordingData((prev) => ({ ...prev, ...data }));
    setActiveStep(1);
  };

  const handleCaptureComplete = (videoBlob: Blob) => {
    setRecordingData((prev) => ({ ...prev, videoBlob }));
    setActiveStep(2);
  };

  const handleReset = () => {
    setRecordingData({ name: "", isPublic: false, tags: [] });
    setActiveStep(0);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => Math.max(0, prevStep - 1));
  };

  const Header = () => (
    <Typography sx={titleStyles(theme)} variant="h1" align="center">
      Presentation Recorder
    </Typography>
  );

  const StepperNav = () => (
    <Stepper activeStep={activeStep} alternativeLabel sx={stepperStyles(theme)}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  const StepContent = () => (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
      >
        <Paper sx={paperStyles(theme, activeStep)} elevation={2}>
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
  );

  return (
    <Box sx={outerBoxStyles}>
      <Container maxWidth="md">
        <Header />
        <StepperNav />
        <StepContent />
      </Container>
    </Box>
  );
};

export default RecordingFlow;

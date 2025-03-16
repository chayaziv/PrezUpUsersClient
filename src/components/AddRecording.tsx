import { useState } from "react";
import { Box, Paper, Stepper, Step, StepLabel } from "@mui/material";
import Step1Details from "./Step1Details";
import Step2Recorder from "./Step2Recorder";
import Step3Submit from "./Step3Submit";


const steps = ["Details", "Recording", "Submit"];

const AddRecording: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [recordingData, setRecordingData] = useState({
    title: "",
    isPublic: false,
    audioBlob: null as Blob | null,
  });

  const nextStep = () => setActiveStep((prev) => prev + 1);
  const prevStep = () => setActiveStep((prev) => prev - 1);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
      <Paper sx={{ padding: 4, width: "100%", maxWidth: 600 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && <Step1Details nextStep={nextStep} setRecordingData={setRecordingData} />}
        {activeStep === 1 && <Step2Recorder nextStep={nextStep} prevStep={prevStep} setRecordingData={setRecordingData} />}
        {activeStep === 2 && <Step3Submit prevStep={prevStep} recordingData={recordingData} />}
      </Paper>
    </Box>
  );
};

export default AddRecording;

import { useState } from "react";
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Divider,
} from "@mui/material";
import {
  MdOutlineDescription,
  MdOutlineMic,
  MdOutlineCloudUpload,
} from "react-icons/md";
import Step1Details from "./Step1Details";
import Step2Recorder from "./Step2Recorder";
import Step3Submit from "./Step3Submit";

const steps = [
  { label: "Details", icon: <MdOutlineDescription size={24} /> },
  { label: "Recording", icon: <MdOutlineMic size={24} /> },
  { label: "Submit", icon: <MdOutlineCloudUpload size={24} /> },
];

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 600,
          borderRadius: 3,
          boxShadow: 5,
          background: "#f9f9f9",
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(({ label, icon }) => (
            <Step key={label}>
              <StepLabel icon={icon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 3 }} />

        {activeStep === 0 && (
          <Step1Details
            nextStep={nextStep}
            setRecordingData={setRecordingData}
          />
        )}
        {activeStep === 1 && (
          <Step2Recorder
            nextStep={nextStep}
            prevStep={prevStep}
            setRecordingData={setRecordingData}
          />
        )}
        {activeStep === 2 && (
          <Step3Submit prevStep={prevStep} recordingData={recordingData} />
        )}
      </Paper>
    </Box>
  );
};

export default AddRecording;

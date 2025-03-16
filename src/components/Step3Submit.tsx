import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { addPresentation } from "../store/myPresentations";
import { useNavigate } from "react-router-dom";

const Step3Submit: React.FC<{ prevStep: () => void; recordingData: any }> = ({
  prevStep,
  recordingData,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const submitRecording = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", recordingData.audioBlob, "recording.wav");
    formData.append("title", recordingData.title);
    formData.append("isPublic", recordingData.isPublic.toString());

    // await fetch("https://your-api.com/upload", {
    //   method: "POST",
    //   body: formData,
    // });
    dispatch(addPresentation(formData));
    navigate("/my-presentations");
    setLoading(false);
    alert("Recording uploaded successfully!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 3,
        alignItems: "center",
      }}
    >
      <Button variant="outlined" onClick={prevStep}>
        Back
      </Button>
      <Button variant="contained" onClick={submitRecording} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Upload"}
      </Button>
    </Box>
  );
};

export default Step3Submit;

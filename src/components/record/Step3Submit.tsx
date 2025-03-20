// import { useState } from "react";
// import { Box, Button, CircularProgress } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store/store";
// import { addPresentation } from "../store/myPresentations";
// import { useNavigate } from "react-router-dom";

// const Step3Submit: React.FC<{ prevStep: () => void; recordingData: any }> = ({
//   prevStep,
//   recordingData,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const submitRecording = async () => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("audio", recordingData.audioBlob, "recording.wav");
//     formData.append("title", recordingData.title);
//     formData.append("isPublic", recordingData.isPublic.toString());
//     dispatch(addPresentation(formData));
//     navigate("/my-presentations");
//     setLoading(false);
//     alert("Recording uploaded successfully!");
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         mt: 3,
//         alignItems: "center",
//       }}
//     >
//       <Button variant="outlined" onClick={prevStep}>
//         Back
//       </Button>
//       <Button variant="contained" onClick={submitRecording} disabled={loading}>
//         {loading ? <CircularProgress size={24} /> : "Upload"}
//       </Button>
//     </Box>
//   );
// };

// export default Step3Submit;
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addPresentation } from "../../store/myPresentations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Step3Submit: React.FC<{ prevStep: () => void; recordingData: any }> = ({
  prevStep,
  recordingData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // שימוש ב- loading מה- Slice
  const loading = useSelector(
    (state: RootState) => state.myPresentations.loading
  );
  const [error, setError] = useState<string | null>(null);

  const submitRecording = async () => {
    setError(null);

    const formData = new FormData();
    formData.append("audio", recordingData.audioBlob, "recording.wav");
    formData.append("title", recordingData.title);
    formData.append("isPublic", recordingData.isPublic.toString());

    try {
      await dispatch(addPresentation(formData)).unwrap();
      navigate("/my-presentations");
    } catch (err: any) {
      setError(err || "Failed to upload the recording");
    }
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
      {error && <Alert severity="error">{error}</Alert>}
      <Button variant="outlined" onClick={prevStep} disabled={loading}>
        Back
      </Button>
      <Button variant="contained" onClick={submitRecording} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Upload"}
      </Button>
    </Box>
  );
};

export default Step3Submit;

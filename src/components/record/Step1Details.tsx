import { useState } from "react";
import { Box, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";

const Step1Details: React.FC<{ nextStep: () => void; setRecordingData: (data: any) => void }> = ({
  nextStep,
  setRecordingData,
}) => {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleNext = () => {
    setRecordingData((prev: any) => ({ ...prev, title, isPublic }));
    nextStep();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
      <TextField label="Recording Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
      <FormControlLabel control={<Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />} label="Public" />

      <Button variant="contained" onClick={handleNext} disabled={!title}>
        Next
      </Button>
    </Box>
  );
};

export default Step1Details;

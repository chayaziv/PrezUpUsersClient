import { useState, useRef } from "react";
import { Box, IconButton, Button } from "@mui/material";
import { Mic, Stop } from "@mui/icons-material";

const Step2Recorder: React.FC<{ nextStep: () => void; prevStep: () => void; setRecordingData: (data: any) => void }> = ({
  nextStep,
  prevStep,
  setRecordingData,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setAudioBlob(blob);
      setAudioURL(URL.createObjectURL(blob));
      setRecordingData((prev: any) => ({ ...prev, audioBlob: blob }));
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", mt: 3 }}>
      {audioURL && <audio controls src={audioURL} />}
      <IconButton color="primary" onClick={isRecording ? stopRecording : startRecording} size="large">
        {isRecording ? <Stop fontSize="large" /> : <Mic fontSize="large" />}
      </IconButton>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button variant="contained" onClick={nextStep} disabled={!audioBlob}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Step2Recorder;

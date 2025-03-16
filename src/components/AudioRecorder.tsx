import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Box,
  CircularProgress,
  Typography,
  Paper,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Mic, Stop, Download, Save } from "@mui/icons-material";
import { addPresentation } from "../store/myPresentations";
import { AppDispatch } from "../store/store";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: any) => state.myPresentations);

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        setAudioURL(URL.createObjectURL(audioBlob));
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const saveAudio = (): void => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");
      dispatch(addPresentation(formData));
    }
  };

  const downloadAudio = (): void => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recording.wav";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        padding: 3,
      }}
    >
      <Paper
        sx={{
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 3 }}>
          Audio Recorder
        </Typography>

        <Stack direction="column" spacing={2} alignItems="center">
          <Box>{audioURL && <audio controls src={audioURL as string} />}</Box>

          <Stack direction="row" spacing={2} justifyContent="center">
            {!isRecording ? (
              <Tooltip title="Start Recording">
                <IconButton
                  color="primary"
                  onClick={startRecording}
                  size="large"
                  sx={{ backgroundColor: "#1976d2", color: "white" }}
                >
                  <Mic fontSize="large" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Stop Recording">
                <IconButton
                  color="error"
                  onClick={stopRecording}
                  size="large"
                  sx={{ backgroundColor: "#d32f2f", color: "white" }}
                >
                  <Stop fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={saveAudio}
              disabled={!audioBlob || loading}
              startIcon={<Save />}
            >
              {loading ? "Saving..." : "Save Audio"}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={downloadAudio}
              disabled={!audioBlob}
              startIcon={<Download />}
            >
              Download
            </Button>
          </Stack>

          {isRecording && (
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
            >
              <CircularProgress />
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default AudioRecorder;

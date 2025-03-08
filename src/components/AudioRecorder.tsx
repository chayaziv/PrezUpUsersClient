import React, { useState, useRef } from "react";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
  // http://localhost:5015/api/presentation
  const saveAudio = async (): Promise<void> => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");
      try {
        const response = await fetch(
          "http://localhost:5015/api/Presentation/analyze-audio",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to analyze audio");
        }

        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
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
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={saveAudio} disabled={!audioBlob}>
        Save Audio
      </button>
      <button onClick={downloadAudio} disabled={!audioBlob}>
        Download Audio
      </button>
      {audioURL && <audio controls src={audioURL} />}
    </div>
  );
};

export default AudioRecorder;

// try {
//   const response = await fetch("http://localhost:5000//analyze-audio", {
//     // עדכון הנתיב לנתיב ה־Flask שלך
//     method: "POST",
//     body: formData,
//   });

//   if (response.ok) {
//     const data = await response.text();
//     console.log("data", data);
//     let res = data
//       .replace("```json", "")
//       .replace("```", "")
//       .trim(); // הסרת רווחים מיותרים
//     res = res.replace(/\n/g, ""); //הסרת מעברי שורה
//     const res3 = JSON.parse(res);
//     console.log("res3", res3.scores);
//     console.log("res3", res3.tips);
//   } else {
//     console.error("Error during analysis:", response);
//   }
// } catch (error) {
//   console.error("Error saving file:", error);
// }

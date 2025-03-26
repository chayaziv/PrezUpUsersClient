
import { useState, useRef, useEffect } from 'react';

export interface UseMediaRecorderProps {
  onComplete: (videoBlob: Blob) => void;
}

export interface UseMediaRecorderReturn {
  stream: MediaStream | null;
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
  isLoading: boolean;
  error: string | null;
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  countdown: number | null;
  setCountdown: React.Dispatch<React.SetStateAction<number | null>>;
  startRecording: () => void;
  stopRecording: () => void;
  pauseResumeRecording: () => void;
  formatTime: (seconds: number) => string;
}

export const useMediaRecorder = ({ onComplete }: UseMediaRecorderProps): UseMediaRecorderReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        
        setStream(stream);
        setIsLoading(false);
      } catch (err) {
        console.error('Error accessing media devices:', err);
        setError('Could not access camera or microphone. Please check your permissions.');
        setIsLoading(false);
      }
    }
    
    setupCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  useEffect(() => {
    if (isRecording && !isPaused && !countdown) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused, countdown]);
  
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => (prev !== null ? prev - 1 : null));
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      startRecording();
      setCountdown(null);
    }
  }, [countdown]);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const startRecording = () => {
    if (!stream) return;
    
    recordedChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      onComplete(blob);
    };
    
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
    setIsPaused(false);
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
    }
  };
  
  const pauseResumeRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    
    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  return {
    stream,
    setStream,
    isLoading,
    error,
    isRecording,
    isPaused,
    recordingTime,
    countdown,
    setCountdown,
    startRecording,
    stopRecording,
    pauseResumeRecording,
    formatTime
  };
};

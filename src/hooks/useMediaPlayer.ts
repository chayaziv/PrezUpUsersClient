// hooks/useVideoPlayer.ts
import { useRef, useState } from "react";

const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (duration === 0) setDuration(videoRef.current.duration);
  };

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    if (!videoRef.current || typeof newValue !== "number") return;
    videoRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    if (!videoRef.current || typeof newValue !== "number") return;
    videoRef.current.volume = newValue;
    setVolume(newValue);
    setIsMuted(newValue === 0);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    if (isMuted) {
      videoRef.current.volume = volume > 0 ? volume : 1;
      setVolume(volume > 0 ? volume : 1);
    } else {
      setVolume(videoRef.current.volume);
      videoRef.current.volume = 0;
    }
  };

  const handleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isControlsVisible,
    setIsControlsVisible,
    handlePlayPause,
    handleTimeUpdate,
    handleSliderChange,
    handleVolumeChange,
    handleMuteToggle,
    handleFullscreen,
    handleRestart,
    setIsPlaying,
    setDuration,
    setIsMuted,
  };
};

export default useVideoPlayer;

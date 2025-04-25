// src/utils/format.ts

export const getProgressColor = (value: number): string => {
    if (value >= 9) return "rgb(92, 169, 92)"; // ירוק
    if (value >= 5) return "rgb(172, 158, 84)"
    return "rgb(182, 117, 117)"; // אדום
  };
  
export  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
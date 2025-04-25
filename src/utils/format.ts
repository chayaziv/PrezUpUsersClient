// src/utils/format.ts

export const getProgressColor = (value: number): string => {
    if (value >= 9) return "#4caf50"; // ירוק
    if (value >= 5) return "#ff9800"; // כתום
    return "#f44336"; // אדום
  };
  
export  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
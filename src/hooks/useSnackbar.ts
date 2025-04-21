import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext";
import type { SnackbarContextProps } from "../types/SnackbarTypes";

export const useSnackbar = (): SnackbarContextProps => {
  const context: SnackbarContextProps = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  console.log("useSnackbar", context);
  return context;
};

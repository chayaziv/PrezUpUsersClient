import React, { useState } from "react";
import { SnackbarContext } from "./SnackbarContext";
import type { SnackbarState, SnackbarSeverity } from "../types/SnackbarTypes";
import BaseSnackbar from "@/components/common/BaseSnackbar";

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (
    message: string,
    severity: SnackbarSeverity = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, closeSnackbar }}>
      {children}
      <BaseSnackbar />
    </SnackbarContext.Provider>
  );
};

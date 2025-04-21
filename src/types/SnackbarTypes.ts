export type SnackbarSeverity = "error" | "success" | "info" | "warning";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

export interface SnackbarContextProps {
  snackbar: SnackbarState;
  showSnackbar: (message: string, severity?: SnackbarSeverity) => void;
  closeSnackbar: () => void;
}
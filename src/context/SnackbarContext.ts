import { createContext } from "react";
import type { SnackbarContextProps } from "../types/SnackbarTypes";

export const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

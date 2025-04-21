import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type BaseTextFieldProps = TextFieldProps & {
  errorText?: string; // טקסט שגיאה מותאם אישית
};

const BaseTextField: React.FC<BaseTextFieldProps> = ({
  error,
  errorText,
  ...props
}) => {
  return (
    <TextField
      {...props}
      error={error}
      helperText={error ? errorText : props.helperText}
      fullWidth
     
      margin="normal"
    />
  );
};

export default BaseTextField;

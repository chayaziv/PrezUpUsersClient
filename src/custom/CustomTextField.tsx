import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface CustomTextFieldProps {
  id: string;
  label: string;
  type: string;
  name:string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
  showPassword?: boolean; // לא חובה אם מדובר בשדה רגיל
  setShowPassword?: () => void; // לא חובה אם מדובר בשדה רגיל
  InputProps?: object;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  error,
  helperText,
  showPassword,
  setShowPassword,
  InputProps,
}) => {
  // אם השדה הוא שדה סיסמה, נוסיף את הלוגיקה של התצוגה
  const isPasswordField = type === 'password' || showPassword !== undefined;

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      type={isPasswordField ? (showPassword ? 'text' : 'password') : type} // אם יש showPassword נציג טקסט
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={
        isPasswordField
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={setShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
              ...InputProps,
            }
          : InputProps
      }
    />
  );
};

export default CustomTextField;

import {
    TextField,
    InputAdornment,
    IconButton,
  } from "@mui/material";
  import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
  } from "@mui/icons-material";
  
  interface AuthFieldsProps {
    isSignIn: boolean;
    showNameField: boolean;
    showPassword: boolean;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    errors: Record<string, string>;
    setName: (val: string) => void;
    setEmail: (val: string) => void;
    setPassword: (val: string) => void;
    setConfirmPassword: (val: string) => void;
    toggleShowPassword: () => void;
  }
  
  const AuthFields = ({
    isSignIn,
    showNameField,
    showPassword,
    name,
    email,
    password,
    confirmPassword,
    errors,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
  }: AuthFieldsProps) => {
    return (
      <>
        {showNameField && (
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleShowPassword}
                  edge="end"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {showNameField && (
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        )}
      </>
    );
  };
  
  export default AuthFields;
  
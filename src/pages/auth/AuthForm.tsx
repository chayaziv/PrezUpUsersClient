import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Fade,
  Divider,
} from "@mui/material";
import {
  PersonAddAlt as PersonAddIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  HowToReg as HowToRegIcon,
  LockOutlined as LockOutlinedIcon,
  Login as LoginIcon,
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink from react-router-dom
import { Link as MuiLink } from "@mui/material"; // Import Link from MUI
import { boolean } from "zod";
type RegisterSubmit = (
  name: string,
  email: string,
  password: string
) => Promise<{ success: boolean }>;
type LoginSubmit = (
  email: string,
  password: string
) => Promise<{ success: boolean }>;

interface AuthFormProps {
  isSignIn: boolean;
  title: string;
  icon: React.ReactNode;
  submitLabel: string;
  onSubmit: RegisterSubmit | LoginSubmit;
  loading: boolean;
  error: string | null;
  linkText: string;
  linkTo: string;
  submitIcon: React.ReactNode;
  showNameField?: boolean; // רק אם זו הרשמה
}

const AuthForm = ({
  isSignIn,
  title,
  icon,
  submitLabel,
  onSubmit,
  loading,
  error,
  linkText,
  linkTo,
  submitIcon,
  showNameField = false,
}: AuthFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (showNameField && !name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!isSignIn && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      if (isSignIn) {
        const result = await (onSubmit as LoginSubmit)(email, password);
        if (!result.success) {
          setOpenSnackbar(true);
        }
      } else {
        const result = await (onSubmit as RegisterSubmit)(
          name,
          email,
          password
        );
        if (!result.success) {
          setOpenSnackbar(true);
        }
      }
    }
  };
  const handleSocialLogin = (provider: string) => {
    // Show service unavailable message
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Fade in={true} timeout={800}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar> */}

          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              width: 56,
              height: 56,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {icon}
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
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
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              endIcon={submitIcon}
            >
              {loading ? "Processing..." : submitLabel}
            </Button>
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSocialLogin("Google")}
                  startIcon={<GoogleIcon />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    borderWidth: 1.5,
                    "&:hover": {
                      borderWidth: 1.5,
                      backgroundColor: "rgba(66, 133, 244, 0.04)",
                    },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleSocialLogin("GitHub")}
                  startIcon={<GitHubIcon />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    borderWidth: 1.5,
                    "&:hover": {
                      borderWidth: 1.5,
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  GitHub
                </Button>
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={RouterLink} to={linkTo} variant="body2">
                  {linkText}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error || "An error occurred. Please try again."}
          </Alert>
        </Snackbar>
      </Container>
    </Fade>
  );
};

export default AuthForm;

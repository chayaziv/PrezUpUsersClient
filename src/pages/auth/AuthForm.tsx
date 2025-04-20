import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Link as MuiLink,
  Paper,
  Avatar,
  Divider,
  Snackbar,
  Alert,
  Fade,
} from "@mui/material";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import {
  containerStyles,
  paperStyles,
  avatarStyles,
  formStyles,
  submitButtonStyles,
  dividerStyles,
} from "../../styles/authFormStyle.ts";
import AuthFields from "./helpAUthForm/AuthFields.tsx"; // התאמת הנתיב לפי המיקום
import SocialButtons from "./helpAUthForm/SocialButtons.tsx";

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
  showNameField?: boolean;
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
      const result = isSignIn
        ? await (onSubmit as LoginSubmit)(email, password)
        : await (onSubmit as RegisterSubmit)(name, email, password);

      if (!result.success) {
        setOpenSnackbar(true);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Fade in={true} timeout={800}>
      <Container component="main" maxWidth="xs" sx={containerStyles}>
        <Paper elevation={3} sx={paperStyles}>
          <Avatar sx={avatarStyles}>{icon}</Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <AuthFields
              isSignIn={isSignIn}
              showNameField={showNameField}
              showPassword={showPassword}
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              errors={errors}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              toggleShowPassword={() => setShowPassword(!showPassword)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={submitButtonStyles}
              endIcon={submitIcon}
            >
              {loading ? "Processing..." : submitLabel}
            </Button>

            <Divider sx={dividerStyles}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <SocialButtons
              onGoogleLogin={() => handleSocialLogin("Google")}
              onGitHubLogin={() => handleSocialLogin("GitHub")}
            ></SocialButtons>

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

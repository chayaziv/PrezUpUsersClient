
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
  CircularProgress,
  Fade,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import {
  containerStyles,
  paperStyles,
  avatarStyles,
  formStyles,
  submitButtonStyles,
  dividerStyles,
} from "../../styles/authFormStyle";

import AuthFields from "./AuthFields";
import SocialButtons from "./SocialButtons";
import { useAuthForm } from "@/hooks/useAuthForm";
import { LoginSubmit, RegisterSubmit } from "@/types/authType";


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
}: AuthFormProps) => {
  const {
    fields,
    setFields,
    handleSubmit,
    handleSocialLogin,
  } = useAuthForm(isSignIn, onSubmit, error);

  return (
    <Fade in timeout={800}>
      <Container component="main" maxWidth="xs" sx={containerStyles}>
        <Paper elevation={3} sx={paperStyles}>
          <Avatar sx={avatarStyles}>{icon}</Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {title}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
            <AuthFields
              isSignIn={isSignIn}
              {...fields}
              {...setFields}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={submitButtonStyles}
              endIcon={!loading && submitIcon}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Signing...
                </>
              ) : (
                submitLabel
              )}
            </Button>

            <Divider sx={dividerStyles}>
              <Typography variant="body2" color="text.secondary">OR</Typography>
            </Divider>

            <SocialButtons
              onGoogleLogin={() => handleSocialLogin("Google")}
              onGitHubLogin={() => handleSocialLogin("GitHub")}
            />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink component={RouterLink} to={linkTo} variant="body2">
                  {linkText}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
};

export default AuthForm;

import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useAuthForm } from "@/hooks/useAuthForm";
import { LoginSubmit, RegisterSubmit } from "@/types/authType";

import {
  containerStyles,
  paperStyles,
  avatarStyles,
  formStyles,
  submitButtonStyles,
  dividerStyles,
  socialButtonStyles,
  googleButtonHover,
  githubButtonHover,
} from "../../styles/authFormStyle";
import BaseTextField from "@/components/common/BaseTextField";

const AuthFields = ({
  isSignIn,
  name,
  email,
  password,
  confirmPassword,
  showPassword,
  errors,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  toggleShowPassword,
}: any) => {
  return (
    <>
      {!isSignIn && (
        <BaseTextField
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          error={!!errors.name}
          errorText={errors.name}
        />
      )}
      <BaseTextField
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        error={!!errors.email}
        errorText={errors.email}
      />
      <BaseTextField
        id="password"
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="new-password"
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        error={!!errors.password}
        errorText={errors.password}
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
      {!isSignIn && (
        <BaseTextField
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          errorText={errors.confirmPassword}
        />
      )}
    </>
  );
};

const SocialButtons = ({ onLogin }: any) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => onLogin("Google")}
          startIcon={<GoogleIcon />}
          sx={{ ...socialButtonStyles, "&:hover": googleButtonHover }}
        >
          Google
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => onLogin("GitHub")}
          startIcon={<GitHubIcon />}
          sx={{ ...socialButtonStyles, "&:hover": githubButtonHover }}
        >
          GitHub
        </Button>
      </Grid>
    </Grid>
  );
};

const ButtonSubmit = ({ loading, submitLabel, submitIcon }: any) => (
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
);

const DividerWithText = () => (
  <Divider sx={dividerStyles}>
    <Typography variant="body2" color="text.secondary">
      OR
    </Typography>
  </Divider>
);

const LinkToPage = ({ linkTo, linkText }: any) => (
  <Grid container justifyContent="flex-end">
    <Grid item>
      <MuiLink component={RouterLink} to={linkTo} variant="body2">
        {linkText}
      </MuiLink>
    </Grid>
  </Grid>
);

const Header = ({ title, icon }: any) => (
  <>
    <Avatar sx={avatarStyles}>{icon}</Avatar>
    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
      {title}
    </Typography>
  </>
);

const Wrapper = ({ children }: any) => (
  <Fade in timeout={800}>
    <Container component="main" maxWidth="xs" sx={containerStyles}>
      <Paper elevation={3} sx={paperStyles}>
        {children}
      </Paper>
    </Container>
  </Fade>
);

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
}: any) => {
  const { fields, setFields, handleSubmit, handleSocialLogin } = useAuthForm(
    isSignIn,
    onSubmit,
    error
  );

  const { name, email, password, confirmPassword, showPassword, errors } =
    fields;

  const {
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
  } = setFields;

  return (
    <Wrapper>
      <>
        <Header title={title} icon={icon} />
        <Box component="form" onSubmit={handleSubmit} sx={formStyles}>
          <>
            <AuthFields
              isSignIn={isSignIn}
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              showPassword={showPassword}
              errors={errors}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              toggleShowPassword={toggleShowPassword}
            />
            <ButtonSubmit
              loading={loading}
              submitLabel={submitLabel}
              submitIcon={submitIcon}
            />
            <DividerWithText />
            <SocialButtons onLogin={handleSocialLogin} />
            <LinkToPage linkTo={linkTo} linkText={linkText} />
          </>
        </Box>
      </>
    </Wrapper>
  );
};

export default AuthForm;

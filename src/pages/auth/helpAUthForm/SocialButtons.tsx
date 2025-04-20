import { Button, Grid } from "@mui/material";
import { Google as GoogleIcon, GitHub as GitHubIcon } from "@mui/icons-material";

const socialButtonStyles = {
  padding: "10px",
  textTransform: "none",
};

const googleButtonHover = {
  backgroundColor: "#4285F4",
  color: "#fff",
};

const githubButtonHover = {
  backgroundColor: "#333",
  color: "#fff",
};

interface SocialButtonsProps {
  onGoogleLogin: () => void;
  onGitHubLogin: () => void;
}

const SocialButtons = ({ onGoogleLogin, onGitHubLogin }: SocialButtonsProps) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={6}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onGoogleLogin}
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
          onClick={onGitHubLogin}
          startIcon={<GitHubIcon />}
          sx={{ ...socialButtonStyles, "&:hover": githubButtonHover }}
        >
          GitHub
        </Button>
      </Grid>
    </Grid>
  );
};

export default SocialButtons;

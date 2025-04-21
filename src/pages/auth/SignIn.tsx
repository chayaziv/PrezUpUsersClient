import { useNavigate } from "react-router-dom";
import {
  LockOutlined as LockOutlinedIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import AuthForm from "./AuthForm";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleLogin, loading, error } = useAuth();

  const onSubmit = async (email: string, password: string) => {
    
    const result = await handleLogin(email, password);
    if (result.success) {
      navigate("/");
    }
    return result;
  };

  return (
    <AuthForm
      isSignIn={true}
      title="Sign In"
      icon={<LockOutlinedIcon fontSize="large" />}
      submitLabel="Sign In"
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      linkText="Don't have an account? Sign Up"
      linkTo="/auth/signup"
      submitIcon={<LoginIcon fontSize="large" />}
    />
  );
};

export default SignIn;

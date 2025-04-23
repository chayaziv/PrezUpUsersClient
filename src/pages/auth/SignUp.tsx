import { useNavigate } from "react-router-dom";
import {
  PersonAdd as PersonAddIcon,
  HowToReg as HowToRegIcon,
} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import AuthForm from "./AuthForm";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleRegister, loading, error } = useAuth();

  const onSubmit = async (name: string, email: string, password: string) => {
    const result = await handleRegister(name, email, password);
    if (result.success) {
      navigate("/");
    }
    return result;
  };

  return (
    <AuthForm
      isSignIn={false}
      title="Sign Up"
      icon={<PersonAddIcon fontSize="large" />}
      submitLabel="Sign Up"
      onSubmit={onSubmit}
      loading={loading}
      error={error}
      linkText="Already have an account? Sign In"
      linkTo="/auth/signin"
      submitIcon={<HowToRegIcon fontSize="large" />}
    />
  );
};

export default SignUp;

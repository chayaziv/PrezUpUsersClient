import { useState } from "react";

import { useSnackbar } from "@/hooks/useSnackbar";
import { LoginSubmit, RegisterSubmit } from "@/types/authType";

export const useAuthForm = (
  isSignIn: boolean,
  onSubmit: RegisterSubmit | LoginSubmit,
  error: string | null
) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { showSnackbar } = useSnackbar();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (isSignIn && !name) newErrors.name = "Name is required";
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
    if (!validateForm()) return;

    const result = isSignIn
      ? await (onSubmit as LoginSubmit)(email, password)
      : await (onSubmit as RegisterSubmit)(name, email, password);

    if (!result.success) {
      showSnackbar(error || "An error occurred. Please try again.", "error");
    }
  };

  return {
    fields: {
      name,
      email,
      password,
      confirmPassword,
      showPassword,
      errors,
    },
    setFields: {
      setName,
      setEmail,
      setPassword,
      setConfirmPassword,
      toggleShowPassword: () => setShowPassword((prev) => !prev),
    },
    handleSubmit,
    handleSocialLogin: (provider: string) =>
      showSnackbar(`${provider} login is not yet implemented`, "info"),
  };
};

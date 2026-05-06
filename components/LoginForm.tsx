"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import InputWithIcon from "./InputWithIcon";
import { Theme as CustomTheme } from "@/theme/theme";
import { useAuth } from "@/hooks/useAuth";
import { CreateAdminRequest } from "@/types/auth";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<CreateAdminRequest>({
    username: "",
    password: "",
  });

  const { handleLogin, isLoading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: 560,
        mx: "auto",
        gap: 5,
        py: 6,
        px: 3,
      }}
    >
      <Typography
        variant="h3"
        component="h4"
        sx={{
          fontWeight: 700,
          color: CustomTheme.colors.g500,
          textAlign: "center",
        }}
      >
        Welcome To Solpay
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}
      >
        <InputWithIcon
          id="login-username"
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          leftIcon={<User size={20} />}
          value={formData.username}
          onChange={handleChange}
          required
        />

        <InputWithIcon
          id="login-password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          leftIcon={<Lock size={20} />}
          value={formData.password}
          onChange={handleChange}
          required
          rightIcon={
            <IconButton
              size="small"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          }
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            bgcolor: CustomTheme.colors.v300,
            color: CustomTheme.colors.g300,
            fontWeight: 700,
            py: 1.5,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textTransform: "none",
            fontSize: "1rem",
            mt: 2,
            "&:hover": { bgcolor: CustomTheme.colors.v400 },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Log in"
          )}
        </Button>
      </Box>
    </Box>
  );
}

"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Link,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const from = "/";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setRememberMe(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: from });
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signIn("github", { callbackUrl: from });
    } catch (error) {
      toast.error("GitHub login failed");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setUserLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (res?.error) {
        setError(res.error.replace("Error:", "").trim());
        toast.error(res.error.replace("Error:", "").trim());
      } else if (res?.ok) {
        // Force session update before redirect
        const session = await getSession();
        if (session) {
          router.push(from);
          resetForm();
          toast.success("Successfully logged in!");
        } else {
          setError("Login successful but session not detected");
          toast.error("Login successful but session not detected");
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setUserLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fafafa",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}>
      <Container maxWidth='sm'>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}>
          <CardContent sx={{ p: 6 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "#000000",
                }}>
                Welcome back
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: "#6b7280",
                }}>
                Sign in to your account to continue
              </Typography>
            </Box>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Button
                variant='outlined'
                fullWidth
                startIcon={<Google />}
                onClick={handleGoogleLogin}
                sx={{
                  py: 1.5,
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  "&:hover": {
                    borderColor: "#d1d5db",
                    bgcolor: "#f9fafb",
                  },
                }}>
                Continue with Google
              </Button>
              <Button
                variant='outlined'
                fullWidth
                startIcon={<GitHub />}
                onClick={handleGithubLogin}
                sx={{
                  py: 1.5,
                  borderColor: "#e5e7eb",
                  color: "#374151",
                  "&:hover": {
                    borderColor: "#d1d5db",
                    bgcolor: "#f9fafb",
                  },
                }}>
                Continue with GitHub
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant='body2' sx={{ color: "#9ca3af", px: 2 }}>
                or continue with email
              </Typography>
            </Divider>

            <Box component='form' onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label='Email address'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  error={!!error}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label='Password'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{ color: "#6b7280" }}
                      />
                    }
                    label={
                      <Typography variant='body2' sx={{ color: "#6b7280" }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Link
                    href='/forgot-password'
                    variant='body2'
                    sx={{
                      color: "#000000",
                      textDecoration: "none",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}>
                    Forgot password?
                  </Link>
                </Box>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled={userLoading}
                  size='large'
                  sx={{
                    py: 1.5,
                    bgcolor: "#000000",
                    color: "#ffffff",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#1f2937",
                    },
                  }}>
                  {userLoading ? "Signing in..." : "Sign in"}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant='body2' sx={{ color: "#6b7280" }}>
                Don&#39;t have an account?{" "}
                <Link
                  href='/register'
                  sx={{
                    color: "#000000",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

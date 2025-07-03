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
import { registerAction } from "@/actions/auth/registerAction";

export default function RegisterPage() {
  const router = useRouter();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters long";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    if (!formData.agreeToTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      setRegisterLoading(false);
      return;
    }

    if (validateForm()) {
      try {
        // Handle registration logic here
        const { fullName, email, password, agreeToTerms, subscribeNewsletter  } = formData;
        const image = ""
        const response = await registerAction(fullName, email, password, image,  agreeToTerms, subscribeNewsletter);
        console.log("Registration attempt:", formData);
        if (response.success) {
          router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/verify-email/?email=${response?.emailHash}`);
          toast.success("Registration Successful!. Now Please Verify Your Email!");
        }
      } catch (error) {
        toast.error("Registration failed. Please try again.");
        console.error("Registration error:", error);
      }finally{
        setRegisterLoading(false);
      }
    } else {
      toast.error("Please fix the errors in the form");
      setRegisterLoading(false);
    }
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));

      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
                sx={{ fontWeight: 700, mb: 1, color: "#000000" }}>
                Create your account
              </Typography>
              <Typography variant='body1' sx={{ color: "#6b7280" }}>
                Join thousands of businesses growing with AgencyBoost
              </Typography>
            </Box>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Button
                variant='outlined'
                fullWidth
                startIcon={<Google sx={{ color: "#333333" }} />}
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
                startIcon={<GitHub sx={{ color: "#333333" }} />}
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
                or register with email
              </Typography>
            </Divider>

            <Box component='form' onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label='Full name'
                  value={formData.fullName}
                  onChange={handleInputChange("fullName")}
                  required
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label='Email address'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
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
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  required
                  error={!!errors.password}
                  helperText={errors.password}
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

                <TextField
                  fullWidth
                  label='Confirm password'
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  required
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          edge='end'>
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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

                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange("agreeToTerms")}
                        sx={{ color: "#6b7280" }}
                      />
                    }
                    label={
                      <Typography variant='body2' sx={{ color: "#6b7280" }}>
                        I agree to the{" "}
                        <Link
                          href='#'
                          sx={{
                            color: "#000000",
                            textDecoration: "none",
                            fontWeight: 500,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href='#'
                          sx={{
                            color: "#000000",
                            textDecoration: "none",
                            fontWeight: 500,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.subscribeNewsletter}
                        onChange={handleInputChange("subscribeNewsletter")}
                        sx={{ color: "#6b7280" }}
                      />
                    }
                    label={
                      <Typography variant='body2' sx={{ color: "#6b7280" }}>
                        Subscribe to our newsletter for marketing tips and
                        updates
                      </Typography>
                    }
                  />
                </Stack>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  size='large'
                  disabled={!formData.agreeToTerms || registerLoading}
                  sx={{
                    py: 1.5,
                    bgcolor: "#000000",
                    color: "#ffffff",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: "#1f2937",
                    },
                    "&:disabled": {
                      bgcolor: "#9ca3af",
                      color: "#ffffff",
                    },
                  }}>
                  {registerLoading ? "Account Creating..." : "Create account"}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant='body2' sx={{ color: "#6b7280" }}>
                Already have an account?{" "}
                <Link
                  href='/login'
                  sx={{
                    color: "#000000",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

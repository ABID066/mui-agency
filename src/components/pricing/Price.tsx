"use client"
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { Check } from '@mui/icons-material';

// Custom theme configuration (same as navbar)
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#1f2937',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b7280', // Gray
      light: '#9ca3af',
      dark: '#4b5563',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#6b7280',
    },
    grey: {
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#1d4ed8',
    }
  },
  typography: {
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '12px 24px',
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#000000',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#000000',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          fontWeight: 600,
          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#1f2937',
            boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          border: '1px solid #e5e7eb',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
  },
});

const PricingPlans = () => {
  const plans = [
    {
      title: "SEO Package",
      subtitle: "Custom",
      features: [
        "Keyword Research",
        "On-Page Optimization",
        "Link Building",
        "Content Strategy"
      ]
    },
    {
      title: "PPC Package",
      subtitle: "Custom",
      features: [
        "Campaign Setup",
        "Ad Management",
        "Performance Tracking",
        "A/B Testing"
      ]
    },
    {
      title: "Social Media Marketing",
      subtitle: "Custom",
      features: [
        "Content Creation",
        "Community Management",
        "Influencer Marketing",
        "Analytics Reporting"
      ]
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
          py: 8,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box textAlign="center" sx={{ pt: 5, mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                color: 'text.primary',
                mb: 3,
              }}
            >
              Pricing Plans
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.125rem',
              }}
            >
              Choose the perfect plan to elevate your brand's digital presence. 
              Our tailored packages cater to businesses of all sizes, ensuring optimal results and growth.
            </Typography>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={4} justifyContent="center">
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    {/* Card Header */}
                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.secondary',
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        {plan.title}
                      </Typography>
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: '2.5rem',
                          color: 'text.primary',
                          mb: 3,
                        }}
                      >
                        {plan.subtitle}
                      </Typography>

                      {/* Contact Button */}
                      <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                          py: 1.5,
                          mb: 4,
                          backgroundColor: 'grey.50',
                          borderColor: 'grey.300',
                          color: 'text.primary',
                          '&:hover': {
                            backgroundColor: 'grey.100',
                            borderColor: 'grey.400',
                          },
                        }}
                      >
                        Contact Us
                      </Button>
                    </Box>

                    {/* Features List */}
                    <List sx={{ p: 0 }}>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Paper
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: 'success.light',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0.2,
                              }}
                            >
                              <Check
                                sx={{
                                  fontSize: 12,
                                  color: 'success.main',
                                  fontWeight: 'bold',
                                }}
                              />
                            </Paper>
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            sx={{
                              '& .MuiListItemText-primary': {
                                color: 'text.primary',
                                fontWeight: 500,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Bottom CTA */}
          <Box textAlign="center" sx={{ mt: 8 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 3,
                fontSize: '1.125rem',
              }}
            >
              Need a custom solution? We're here to help you grow your business.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: 'info.main',
                '&:hover': {
                  backgroundColor: 'info.dark',
                },
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PricingPlans;
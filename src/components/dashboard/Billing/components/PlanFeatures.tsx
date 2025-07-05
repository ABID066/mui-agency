'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Check, Star, Bolt } from '@mui/icons-material';

const plans = [
  {
    name: 'Basic',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals and small teams',
    features: [
      'Up to 5 team members',
      '10GB storage',
      'Basic analytics',
      'Email support',
      'Standard templates'
    ],
    popular: false,
    current: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Best for growing businesses',
    features: [
      'Up to 25 team members',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom templates',
      'API access',
      'Advanced integrations'
    ],
    popular: true,
    current: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For large organizations',
    features: [
      'Unlimited team members',
      '1TB storage',
      'Enterprise analytics',
      '24/7 phone support',
      'Custom branding',
      'Advanced API access',
      'SSO integration',
      'Dedicated account manager'
    ],
    popular: false,
    current: false
  }
];

export default function PlanFeatures() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#ffffff',
          mb: 3,
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        Available Plans
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan, index) => (
          <Grid sx={{ xs: 12, md: 4 }} key={index}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: plan.current ? '#1e40af' : '#1e293b',
                border: plan.current ? '2px solid #3b82f6' : '1px solid #334155',
                borderRadius: 2,
                position: 'relative',
                height: '100%',
                minHeight: { xs: '450px', md: 'auto' },
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              {plan.popular && (
                <Chip
                  icon={<Star sx={{ fontSize: 16 }} />}
                  label="Most Popular"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#f59e0b',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    '& .MuiChip-icon': {
                      color: '#ffffff'
                    }
                  }}
                />
              )}

              {plan.current && (
                <Chip
                  icon={<Bolt sx={{ fontSize: 16 }} />}
                  label="Current Plan"
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: 16,
                    backgroundColor: '#059669',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    '& .MuiChip-icon': {
                      color: '#ffffff'
                    }
                  }}
                />
              )}

              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                    mb: 1
                  }}
                >
                  {plan.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', mb: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 'bold',
                      color: '#ffffff'
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#94a3b8',
                      ml: 0.5
                    }}
                  >
                    {plan.period}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#94a3b8'
                  }}
                >
                  {plan.description}
                </Typography>
              </Box>

              <List sx={{ flexGrow: 1, py: 0 }}>
                {plan.features.map((feature, featureIndex) => (
                  <ListItem key={featureIndex} sx={{ py: 0.5, px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <Check sx={{ color: '#059669', fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{
                        variant: 'body2',
                        sx: { color: '#e2e8f0' }
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant={plan.current ? "outlined" : "contained"}
                fullWidth
                disabled={plan.current}
                sx={{
                  mt: 3,
                  py: 1.5,
                  backgroundColor: plan.current ? 'transparent' : '#3b82f6',
                  borderColor: plan.current ? '#94a3b8' : '#3b82f6',
                  color: plan.current ? '#94a3b8' : '#ffffff',
                  '&:hover': {
                    backgroundColor: plan.current ? 'transparent' : '#2563eb'
                  },
                  '&:disabled': {
                    backgroundColor: 'transparent',
                    borderColor: '#94a3b8',
                    color: '#94a3b8'
                  }
                }}
              >
                {plan.current ? 'Current Plan' : 'Upgrade to ' + plan.name}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
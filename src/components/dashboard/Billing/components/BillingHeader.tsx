'use client';

import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

export default function BillingHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        mb: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        textAlign: { xs: 'center', sm: 'left' }
      }}>
       
        <Box>
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#ffffff',
              mb: 1
            }}
          >
            Plan & Billings
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#94a3b8',
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            View your subscription plan, billings information.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
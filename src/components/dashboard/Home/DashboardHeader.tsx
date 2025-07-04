'use client';

import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

interface DashboardHeaderProps {
  title?: string;
  date?: string;
}

export default function DashboardHeader({ 
  title = 'Overview', 
  date = 'Apr 15, 2023' 
}: DashboardHeaderProps) {
  return (
    <Box sx={{ mb: { xs: 2, md: 4 } }}>
      <Typography 
        variant="h4" 
        fontWeight={700} 
        sx={{ 
          color: '#ffffff', 
          mb: 1,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#94a3b8',
          fontSize: { xs: '0.875rem', md: '1rem' }
        }}
      >
        {date}
      </Typography>
    </Box>
  );
}
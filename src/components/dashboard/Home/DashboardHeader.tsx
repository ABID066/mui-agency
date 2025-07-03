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
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: '#94a3b8' }}>
        {date}
      </Typography>
    </Box>
  );
}
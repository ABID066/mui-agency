'use client';

import React from 'react';
import { Box } from '@mui/material';
import BillingHeader from './components/BillingHeader';
import CurrentPlan from './components/CurrentPlan';
import PlanFeatures from './components/PlanFeatures';
import BillingHistory from './components/BillingHistory';

export default function Billing() {
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Header */}
      <BillingHeader />

      {/* Current Plan */}
      <CurrentPlan />

      {/* Plan Features */}
      <PlanFeatures />

      {/* Billing History */}
      <BillingHistory />
    </Box>
  );
}
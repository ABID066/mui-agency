'use client';

import React from 'react';
import { Box } from '@mui/material';
import {
  DashboardHeader,
  StatsCards,
  AnalyticsCharts,
  PageDetailsTable,
  statsData,
  sessionsChartData,
  pageViewsChartData,
  pageDetailsData
} from '.';

export default function DashboardHome() {
  return (
    <Box sx={{ 
      p: 4, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      {/* Header */}
      <DashboardHeader />

      {/* Stats Cards */}
      <StatsCards stats={statsData} />

      {/* Analytics Charts */}
      <AnalyticsCharts 
        sessionsData={sessionsChartData} 
        pageViewsData={pageViewsChartData} 
      />

      {/* Page Details Table */}
      <PageDetailsTable pageDetails={pageDetailsData} />
    </Box>
  );
}
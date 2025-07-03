'use client';

import React, { useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Sidebar from '../../components/dashboard/Sidebar';
import Navbar from '../../components/dashboard/Navbar';

const drawerWidth = 280;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };



  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <Navbar drawerWidth={drawerWidth} onMenuClick={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar 
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
        isMobile={isMobile}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#0f172a',
          minHeight: '100vh',
          pt: { xs: 8, md: 8 }, // Add top padding for AppBar
          px: 3,
          py: 3
        }}
      >
        {children}
      </Box>
      
    </Box>
  );
}
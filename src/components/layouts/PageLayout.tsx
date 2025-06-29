'use client';

import { Box } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  backgroundColor?: string;
}

export default function PageLayout({ children, backgroundColor = '#fafafa' }: PageLayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: backgroundColor }}>
      <Navbar />
      <Box component="main">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
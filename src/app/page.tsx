'use client';

import { Box } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Portfolio from '../components/home/Portfolio';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';
import Footer from '../components/footer/Footer';

export default function CalcomInspiredLanding() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Navbar />
      <Box component="main">
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
        <CTA />
      </Box>
      <Footer />
    </Box>
  );
}
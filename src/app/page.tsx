import { Box } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SchedulingTemplate from '../components/home/SchedulingTemplate';
import CompanyLogos from '../components/home/CompanyLogos';
import AppointmentSteps from '../components/home/AppointmentSteps';
import Benefits from '../components/home/Benefits';
import Muchmore from '../components/home/Muchmore';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      <Navbar />
      <Box component="main" sx={{ pt: '80px' }}>
        {/* Hero Section */}
        <SchedulingTemplate />
        {/* Moving Logos Section */}
        <CompanyLogos />
        {/* Appointment Steps Section */}
        <AppointmentSteps />
        {/* Benefits Section */}
        <Benefits />
        {/* Much More Section */}
        <Muchmore />
        {/* Testimonials Section */}
        <Testimonials />
      </Box>
      <Footer />
    </Box>
  );
}
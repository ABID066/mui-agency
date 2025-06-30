import { Box } from '@mui/material';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SchedulingTemplate from '../components/home/SchedulingTemplate';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff' }}>
      <Navbar />
      <Box component="main" sx={{ pt: '80px' }}>
        <SchedulingTemplate />
      </Box>
      <Footer />
    </Box>
  );
}
'use client';

import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  Chip
} from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';

export default function Hero() {
  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 10 }, pb: 8 }}>
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Chip 
          label="✨ New Dashboard Analytics Available" 
          variant="outlined" 
          sx={{ 
            mb: 4, 
            borderColor: '#e5e7eb', 
            color: '#6b7280',
            bgcolor: 'white',
            fontWeight: 500
          }}
        />
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '5.5rem', xl: '6rem' }, 
            fontWeight: 900,
            color: 'black',
            mb: 3,
            letterSpacing: '-0.05em',
            lineHeight: 1.1,
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          Grow Your Business with{' '}
          <Box component="span" sx={{ color: '#6b7280' }}>
            AgencyBoost
          </Box>
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            color: '#6b7280', 
            mb: 6,
            maxWidth: { xs: '100%', md: '700px', xl: '800px' }, 
            mx: 'auto', 
            lineHeight: 1.6,
            fontWeight: 400,
            fontSize: { xs: '1.25rem', md: '1.5rem', xl: '1.75rem' }
          }}
        >
          We are a digital marketing agency that helps businesses grow their online presence and reach their target audience with proven strategies.
        </Typography>
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center" 
          sx={{ mb: 8 }}
        >
          <Button 
            variant="contained" 
            size="large" 
            endIcon={<ArrowForward />}
            sx={{ 
              bgcolor: 'black', 
              py: 2, 
              px: 6,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { bgcolor: '#1f2937' }
            }}
          >
            Get Started Today
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            startIcon={<PlayArrow />}
            sx={{ 
              py: 2, 
              px: 6, 
              borderColor: '#d1d5db', 
              color: 'black',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': { borderColor: 'black' }
            }}
          >
            Watch Demo
          </Button>
        </Stack>
        
        {/* Trust Indicators */}
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4, maxWidth: '800px', mx: 'auto' }}>
          <Grid xs={4} sm={4} md={4}>
             <Typography variant="h4" fontWeight="900" color="black">500+</Typography>
             <Typography variant="body2" color="#6b7280" fontWeight={500}>Active Clients</Typography>
           </Grid>
           <Grid xs={4} sm={4} md={4}>
             <Typography variant="h4" fontWeight="900" color="black">50K+</Typography>
             <Typography variant="body2" color="#6b7280" fontWeight={500}>Projects Done</Typography>
           </Grid>
           <Grid xs={4} sm={4} md={4}>
            <Typography variant="h4" fontWeight="900" color="black">99.9%</Typography>
            <Typography variant="body2" color="#6b7280" fontWeight={500}>Success Rate</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
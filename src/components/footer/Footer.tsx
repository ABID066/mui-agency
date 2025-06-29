'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Divider
} from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#111827', py: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid size={{xs: 12, md: 4}}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 900, 
                color: 'white',
                mb: 2,
                letterSpacing: '-0.025em'
              }}
            >
              AgencyBoost
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ color: '#9ca3af', lineHeight: 1.6 }}
            >
              The complete digital marketing platform for modern businesses.
            </Typography>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 2}}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: 'white', mb: 2 }}
            >
              Services
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>SEO</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>PPC</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Social Media</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Content</Typography>
            </Stack>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 2}}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: 'white', mb: 2 }}
            >
              Company
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>About</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Blog</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Careers</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Contact</Typography>
            </Stack>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 2}}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: 'white', mb: 2 }}
            >
              Resources
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Help Center</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Documentation</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Case Studies</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Guides</Typography>
            </Stack>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 2}}>
            <Typography 
              variant="subtitle1" 
              sx={{ fontWeight: 700, color: 'white', mb: 2 }}
            >
              Legal
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Privacy</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Terms</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Cookies</Typography>
              <Typography variant="body2" sx={{ color: '#9ca3af' }}>Security</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 6, borderColor: '#374151' }} />
        <Typography 
          variant="body2" 
          sx={{ color: '#9ca3af', textAlign: 'center' }}
        >
          © 2025 AgencyBoost. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
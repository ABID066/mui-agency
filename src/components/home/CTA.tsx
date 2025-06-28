'use client';

import {
  Container,
  Typography,
  Box,
  Stack,
  TextField,
  Button
} from '@mui/material';
import { ArrowForward, CheckCircle } from '@mui/icons-material';
import { useState } from 'react';

export default function CTA() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <Box sx={{ bgcolor: 'black', py: 10 }}>
      <Container maxWidth="xl">
        <Box textAlign="center">
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 900, 
              color: 'white',
              mb: 3,
              letterSpacing: '-0.025em'
            }}
          >
            Ready to Grow Your Business?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#9ca3af', 
              maxWidth: '600px', 
              mx: 'auto',
              mb: 6,
              fontWeight: 400
            }}
          >
            Contact us today for a free consultation and discover how we can help you achieve your digital marketing goals.
          </Typography>

          <Box 
            component="form" 
            onSubmit={handleEmailSubmit}
            sx={{ 
              maxWidth: 500, 
              mx: 'auto',
              mb: 4
            }}
          >
            <Stack direction="row" spacing={0} sx={{ bgcolor: 'white', borderRadius: 2, p: 1 }}>
              <TextField
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' }
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: 'black',
                  color: 'white',
                  fontWeight: 900,
                  textTransform: 'none',
                  px: 4,  // Reduced from px: 8
                  whiteSpace: 'nowrap', // Prevents text wrapping
                  minWidth: 'fit-content', // Makes button only as wide as needed
                  '&:hover': { bgcolor: '#1f2937' }
                }}
              >
                Get Started
              </Button>
            </Stack>
          </Box>

          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
            <CheckCircle sx={{ color: '#10b981', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
              Free consultation • No commitment required
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
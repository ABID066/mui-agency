'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Stack,
  Avatar,
  Rating
} from '@mui/material';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CEO, Tech Solutions',
      avatar: 'SC',
      review: 'AgencyBoost helped us increase our website traffic by 50% in just three months! Their SEO expertise is unmatched.'
    },
    {
      name: 'David Lee',
      role: 'Marketing Manager, Retail Co.',
      avatar: 'DL',
      review: 'Their PPC campaigns are highly effective and have generated a great ROI for our business. Highly recommended!'
    },
    {
      name: 'Emily Wong',
      role: 'Founder, Creative Studio',
      avatar: 'EW',
      review: 'We\'ve seen a significant improvement in our social media engagement since working with AgencyBoost. Amazing results!'
    },
    {
      name: 'Sarah Chen',
      role: 'CEO, Tech Solutions',
      avatar: 'SC',
      review: 'AgencyBoost helped us increase our website traffic by 50% in just three months! Their SEO expertise is unmatched.'
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 900, 
            color: 'black',
            mb: 3,
            letterSpacing: '-0.025em'
          }}
        >
          What Our Clients Say
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#6b7280', 
            maxWidth: '600px', 
            mx: 'auto',
            fontWeight: 400
          }}
        >
          Don't just take our word for it. Here's what our satisfied clients have to say about working with AgencyBoost.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
        {testimonials.map((testimonial, index) => (
          <Grid  size={{xs: 12, sm: 6, md: 6, lg: 3}} key={index}>
            <Card 
              elevation={0} 
              sx={{ 
                bgcolor: 'white',
                border: '1px solid #e5e7eb',
                p: 3,
                height: '100%'
              }}
            >
              <Rating value={5} readOnly sx={{ mb: 3, color: '#fbbf24' }} />
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  fontStyle: 'italic',
                  color: '#374151',
                  maxWidth: 310,
                  lineHeight: 1.6
                }}
              >
                "{testimonial.review}"
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar 
                  sx={{ 
                    bgcolor: 'black',
                    color: 'white',
                    fontWeight: 600
                  }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'black'
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ color: '#6b7280' }}
                  >
                    {testimonial.role}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Search,
  TrendingUp,
  Group,
  Edit
} from '@mui/icons-material';

export default function Services() {
  const services = [
    {
      icon: <Search sx={{ fontSize: 32 }} />,
      title: 'SEO Optimization',
      description: 'Improve your website\'s visibility in search engine results and drive organic traffic to your business.',
      iconBg: '#f3f4f6'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      title: 'PPC Advertising',
      description: 'Drive targeted traffic to your website with strategic paid advertising campaigns that deliver results.',
      iconBg: '#f3f4f6'
    },
    {
      icon: <Group sx={{ fontSize: 32 }} />,
      title: 'Social Media Marketing',
      description: 'Build a strong social media presence and engage with your audience across all major platforms.',
      iconBg: '#f3f4f6'
    },
    {
      icon: <Edit sx={{ fontSize: 32 }} />,
      title: 'Content Marketing',
      description: 'Create valuable, engaging content that attracts your ideal customers and drives conversions.',
      iconBg: '#f3f4f6'
    }
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
          Comprehensive Digital Marketing Solutions
        </Typography>
        <Typography 
            variant="h6" 
            sx={{ 
              color: '#6b7280', 
              maxWidth: { xs: '100%', md: '600px', xl: '700px' }, 
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem', xl: '1.375rem' }
            }}
        >
          We offer a wide range of digital marketing services to help businesses achieve their goals and maximize their online potential.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index} sx={{ display: 'flex' }}>
            <Card 
              elevation={0} 
              sx={{ 
                width: '100%',
                bgcolor: 'white',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Ensure all cards have the same height
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                }
              }}
            >
              <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box 
                  sx={{ 
                    width: 64, 
                    height: 64, 
                    bgcolor: service.iconBg, 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    color: 'black'
                  }}
                >
                  {service.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'black',
                    mb: 2
                  }}
                >
                  {service.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#6b7280',
                    lineHeight: 1.6,
                    flexGrow: 1, // This will make the description take up remaining space
                    minHeight: '72px', // Set a minimum height for the description
                    display: 'flex',
                    maxWidth: 200,
                    alignItems: 'center' // Vertically center text if it doesn't fill the space
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
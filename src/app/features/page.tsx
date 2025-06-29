'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Avatar,
  Chip
} from '@mui/material';
import {
  Analytics,
  Campaign,
  TrendingUp,
  Security,
  Speed,
  Support,
  IntegrationInstructions,
  AutoAwesome,
  Dashboard
} from '@mui/icons-material';
import PageLayout from '../../components/layouts/PageLayout';

const features = [
  {
    icon: <Analytics sx={{ fontSize: 40 }} />,
    title: 'Advanced Analytics',
    description: 'Get deep insights into your campaigns with real-time analytics and comprehensive reporting.',
    color: '#3b82f6',
  },
  {
    icon: <Campaign sx={{ fontSize: 40 }} />,
    title: 'Campaign Management',
    description: 'Create, manage, and optimize multiple campaigns from a single, intuitive dashboard.',
    color: '#10b981',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Performance Tracking',
    description: 'Monitor your ROI and track performance metrics that matter to your business.',
    color: '#f59e0b',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Enterprise Security',
    description: 'Bank-level security with end-to-end encryption and compliance certifications.',
    color: '#ef4444',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Lightning Fast',
    description: 'Optimized for speed with sub-second response times and 99.9% uptime guarantee.',
    color: '#8b5cf6',
  },
  {
    icon: <Support sx={{ fontSize: 40 }} />,
    title: '24/7 Support',
    description: 'Get help when you need it with our round-the-clock customer support team.',
    color: '#06b6d4',
  },
  {
    icon: <IntegrationInstructions sx={{ fontSize: 40 }} />,
    title: 'Easy Integrations',
    description: 'Connect with 100+ tools and platforms through our robust API and integrations.',
    color: '#84cc16',
  },
  {
    icon: <AutoAwesome sx={{ fontSize: 40 }} />,
    title: 'AI-Powered',
    description: 'Leverage artificial intelligence to optimize your campaigns and improve performance.',
    color: '#f97316',
  },
  {
    icon: <Dashboard sx={{ fontSize: 40 }} />,
    title: 'Custom Dashboards',
    description: 'Build personalized dashboards with drag-and-drop widgets and custom metrics.',
    color: '#ec4899',
  },
];

const benefits = [
  {
    title: 'Increase ROI',
    description: 'Our customers see an average 300% increase in ROI within the first 6 months.',
    stat: '300%',
  },
  {
    title: 'Save Time',
    description: 'Automate repetitive tasks and save up to 20 hours per week on campaign management.',
    stat: '20hrs',
  },
  {
    title: 'Better Results',
    description: 'Improve conversion rates by up to 150% with our optimization algorithms.',
    stat: '150%',
  },
];

export default function FeaturesPage() {
  return (
    <PageLayout>
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip 
              label="Features" 
              sx={{ 
                mb: 2, 
                bgcolor: '#000000', 
                color: '#ffffff',
                fontWeight: 600
              }} 
            />
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                color: '#000000',
                letterSpacing: '-0.025em'
              }}
            >
              Everything you need to succeed
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#6b7280',
                mb: 6,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400
              }}
            >
              Powerful features designed to help you grow your business, increase conversions, and maximize your marketing ROI.
            </Typography>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4} sx={{ mb: 12 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    p: 3,
                    border: '1px solid #e5e7eb',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      borderColor: feature.color,
                    }
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${feature.color}15`,
                        color: feature.color,
                        width: 64,
                        height: 64,
                        mb: 3
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 2,
                        color: '#000000'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#6b7280',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Benefits Section */}
          <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 4, p: 6, mb: 12 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center',
                fontWeight: 700,
                mb: 2,
                color: '#000000'
              }}
            >
              Proven Results
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                color: '#6b7280',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Join thousands of businesses that have transformed their marketing with our platform.
            </Typography>
            
            <Grid container spacing={4}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: '#000000',
                        mb: 1
                      }}
                    >
                      {benefit.stat}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 600,
                        mb: 2,
                        color: '#000000'
                      }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#6b7280',
                        lineHeight: 1.6
                      }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                color: '#000000'
              }}
            >
              Ready to get started?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#6b7280',
                mb: 4,
                maxWidth: '500px',
                mx: 'auto'
              }}
            >
              Join thousands of businesses already using our platform to grow their revenue.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ justifyContent: 'center' }}
            >
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  bgcolor: '#000000',
                  color: '#ffffff',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#1f2937',
                  }
                }}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  borderColor: '#000000',
                  color: '#000000',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                View Pricing
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}
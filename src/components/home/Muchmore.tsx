'use client';

import React from 'react';
import { Box, Typography, Card, CardContent, Container } from '@mui/material';
import { keyframes } from '@mui/system';
import {
  Payment,
  Videocam,
  Link,
  Security,
  Translate,
  Code,
  Apps,
  Tune
} from '@mui/icons-material';

// Animation keyframes
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const Muchmore = () => {
  const features = [
    {
      icon: <Payment sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'Accept payments',
      description: 'You can monetize your bookings through our Stripe integration.'
    },
    {
      icon: <Videocam sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'Built-in video conferencing',
      description: 'Seamless video calls integrated directly into your booking flow.'
    },
    {
      icon: <Link sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'Short booking links',
      description: 'Create memorable, short links for easy sharing and booking.'
    },
    {
      icon: <Security sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'Privacy first',
      description: 'Your data and your clients\' data are protected with enterprise-grade security.'
    },
    {
      icon: <Translate sx={{ fontSize: 32, color: '#374151' }} />,
      title: '65+ languages',
      description: 'Support for over 65 languages to serve your global audience.'
    },
    {
      icon: <Code sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'Easy embeds',
      description: 'Embed booking widgets anywhere with simple copy-paste code.'
    },
    {
      icon: <Apps sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'All your favorite apps',
      description: 'Integrate with 100+ apps including Zoom, Google Calendar, Slack, and more.'
    },
    {
      icon: <Tune sx={{ fontSize: 32, color: '#374151' }} />,
      title: 'Simple customization',
      description: 'Customize your booking page to match your brand with ease.'
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f9fafb' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              fontWeight: 700,
              color: '#111827',
              mb: 2,
              animation: `${slideUp} 0.6s ease-out`
            }}
          >
            ...and so much more!
          </Typography>
        </Box>

        {/* Feature Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: { xs: 2, sm: 2.5, md: 3 },
            justifyContent: 'center',
            justifyItems: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            animation: `${slideUp} 0.8s ease-out 0.2s both`
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: { xs: 150, md: 165 },
                width: { xs: 150, md: 165 },
                maxWidth: '100%',
                aspectRatio: '1',
                border: '1px solid #e5e7eb',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                justifySelf: 'center',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: '#d1d5db',
                  '& .default-content': {
                    opacity: 0,
                    transform: 'scale(0.9)'
                  },
                  '& .hover-content': {
                    opacity: 1,
                    transform: 'scale(1)'
                  }
                }
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2, md: 2.5 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative'
                }}
              >
                {/* Default Content (Icon + Title) */}
                <Box
                  className="default-content"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: 1,
                    transform: 'scale(1)'
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      mb: 1.5,
                      p: 1.5,
                      bgcolor: '#f3f4f6',
                      borderRadius: 2,
                      alignSelf: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Corner Dots */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        bgcolor: '#d1d5db'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        bgcolor: '#d1d5db'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        left: 4,
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        bgcolor: '#d1d5db'
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        bgcolor: '#d1d5db'
                      }}
                    />
                    
                    {React.cloneElement(feature.icon, { sx: { fontSize: 24, color: '#374151' } })}
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      fontWeight: 600,
                      color: '#374151',
                      mb: 0,
                      lineHeight: 1.2,
                      textAlign: 'center'
                    }}
                  >
                    {feature.title}
                  </Typography>
                </Box>

                {/* Hover Content */}
                <Box
                  className="hover-content"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    transform: 'scale(0.9)',
                    opacity: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: { xs: 2, md: 2.5 }
                  }}
                >
                  {/* Corner Dots */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#d1d5db'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#d1d5db'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#d1d5db'
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#d1d5db'
                    }}
                  />

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      fontWeight: 600,
                      color: '#374151',
                      mb: 1,
                      lineHeight: 1.2,
                      textAlign: 'center'
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      lineHeight: 1.4,
                      textAlign: 'center'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>

              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Muchmore;
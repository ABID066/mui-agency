'use client';
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { keyframes } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Solar system animation keyframes - all on second orbit with different starting positions
const orbitSecond1 = keyframes`
  from {
    transform: rotate(0deg) translateX(75px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(75px) rotate(-360deg);
  }
`;

const orbitSecond2 = keyframes`
  from {
    transform: rotate(120deg) translateX(75px) rotate(-120deg);
  }
  to {
    transform: rotate(480deg) translateX(75px) rotate(-480deg);
  }
`;

const orbitSecond3 = keyframes`
  from {
    transform: rotate(240deg) translateX(75px) rotate(-240deg);
  }
  to {
    transform: rotate(600deg) translateX(75px) rotate(-600deg);
  }
`;

const AppointmentSteps = () => {
  const steps = [
    {
      id: '01',
      title: 'Connect your calendar',
      description: "We'll handle all the cross-referencing, so you don't have to worry about double bookings.",
      animation: slideInLeft,
      delay: '0.2s'
    },
    {
      id: '02', 
      title: 'Set your availability',
      description: 'Want to block off weekends? Set up any buffers? We make that easy.',
      animation: fadeInUp,
      delay: '0.4s'
    },
    {
      id: '03',
      title: 'Choose how to meet',
      description: 'It could be a video chat, phone call, or a walk in the park!',
      animation: slideInRight,
      delay: '0.6s'
    }
  ];

  return (
    <Box sx={{ 
      py: 8, 
      px: 3,
      maxWidth: '1200px',
      mx: 'auto',
      textAlign: 'center'
    }}>
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 2,
          fontWeight: 700,
          color: '#1a1a1a',
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        With us, appointment scheduling is easy
      </Typography>
      
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 6,
          color: '#666',
          fontWeight: 400,
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.6
        }}
      >
        Effortless scheduling for business and individuals, powerful solutions for fast-growing modern companies.
      </Typography>

      <Box sx={{ mt: 6 }}>
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          bgcolor: '#000',
          color: '#fff',
          px: 2,
          py: 1,
          borderRadius: '15px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: '#333',
            transform: 'translateY(-2px)'
          }
        }}>
          Get Started <ArrowForwardIosIcon sx={{ ml: 2, fontSize: '12px' }} />
        </Box>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        mt: 6
      }}>
        {steps.map((step) => (
          <Card 
            key={step.id}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              animation: `${step.animation} 0.8s ease-out ${step.delay} both`,
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                textAlign: 'left',
                mb: 3
              }}>
                <Typography 
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#9ca3af',
                    mr: 2,
                    mt: 0.5
                  }}
                >
                  {step.id}
                </Typography>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 600,
                      color: '#1a1a1a',
                      mb: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    sx={{
                      color: '#6b7280',
                      lineHeight: 1.6,
                      fontSize: '0.95rem'
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
              
              {/* Visual representation based on step */}
              <Box sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: '12px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {step.id === '01' && (
                  <Box sx={{ 
                    position: 'relative',
                    width: '160px',
                    height: '160px',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {/* Central Sun - Cal.com */}
                    <Box sx={{
                      
                    }}>
                      <Typography sx={{ 
                        color: '#1a1a1a', 
                        fontSize: '15px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: 1,
                        border: 1,
                        bgcolor: 'whitesmoke',
                        px: 2,
                        borderColor: '#e5e7eb',
                        borderRadius: 10,
                        py: 1,
                        
                      }}>
                        Cal.com
                      </Typography>
                    </Box>
                    
                    {/* Orbital paths - larger and more visible circles */}
                    <Box sx={{
                      position: 'absolute',
                      width: '120px',
                      height: '120px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '50%',
                      opacity: 0.8
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      width: '150px',
                      height: '150px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '50%',
                      opacity: 0.8
                    }} />
                    <Box sx={{
                      position: 'absolute',
                      width: '180px',
                      height: '180px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '50%',
                      opacity: 0.8
                    }} />
                    
                    {/* Orbiting Calendar Icons - all on second circle (150px diameter = 75px radius) */}
                    <Box sx={{
                      position: 'absolute',
                      width: 28,
                      height: 28,
                      bgcolor: '#f1f4f5',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `${orbitSecond1} 10s linear infinite`,
                      transformOrigin: 'center',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                    }}>
                      <span style={{ color: '#fff', fontSize: '14px' }}>📅</span>
                    </Box>
                    
                    <Box sx={{
                      position: 'absolute',
                      width: 28,
                      height: 28,
                      bgcolor: '#f1f4f5',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `${orbitSecond2} 10s linear infinite`,
                      transformOrigin: 'center',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                    }}>
                      <span style={{ color: '#fff', fontSize: '14px' }}>🗓️</span>
                    </Box>
                    
                    <Box sx={{
                      position: 'absolute',
                      width: 28,
                      height: 28,
                      bgcolor: '#f1f4f5',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `${orbitSecond3} 10s linear infinite`,
                      transformOrigin: 'center',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                    }}>
                      <span style={{ color: '#fff', fontSize: '14px' }}>📆</span>
                    </Box>
                  </Box>
                )}
                
                {step.id === '02' && (
                  <Box sx={{ width: '100%' }}>
                    {[
                      { day: 'Mon', start: '8:30 am', end: '5:00 pm', enabled: true },
                      { day: 'Tue', start: '9:00 am', end: '6:30 pm', enabled: false },
                      { day: 'Wed', start: '10:00 am', end: '7:00 pm', enabled: true }
                    ].map((schedule) => (
                      <Box key={schedule.day} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                        p: 1.5,
                        bgcolor: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 500, minWidth: '30px' }}>
                          {schedule.day}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: 'center' }}>
                          <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>{schedule.start}</Typography>
                          <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>-</Typography>
                          <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>{schedule.end}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontSize: '12px', color: '#6b7280' }}>+</Typography>
                          <Box sx={{
                            width: 12,
                            height: 12,
                            bgcolor: '#e5e7eb',
                            borderRadius: '2px'
                          }} />
                          <Box sx={{
                            width: 32,
                            height: 18,
                            bgcolor: schedule.enabled ? '#10b981' : '#e5e7eb',
                            borderRadius: '9px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            '&::after': {
                              content: '""',
                              position: 'absolute',
                              width: 14,
                              height: 14,
                              bgcolor: '#fff',
                              borderRadius: '50%',
                              top: 2,
                              left: schedule.enabled ? 16 : 2,
                              transition: 'left 0.2s',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }
                          }} />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
                
                {step.id === '03' && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    {/* Two user avatars */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 1 }}>
                      <Box sx={{
                        width: 50,
                        height: 50,
                        bgcolor: '#f3f4f6',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #e5e7eb'
                      }}>
                        <Box sx={{
                          width: 28,
                          height: 28,
                          bgcolor: '#6b7280',
                          borderRadius: '50%',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 20,
                            height: 10,
                            bgcolor: '#6b7280',
                            borderRadius: '12px 12px 0 0'
                          }
                        }} />
                      </Box>
                      <Box sx={{
                        width: 60,
                        height: 60,
                        bgcolor: '#f3f4f6',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #e5e7eb'
                      }}>
                        <Box sx={{
                          width: 32,
                          height: 32,
                          bgcolor: '#6b7280',
                          borderRadius: '50%',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -8,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 24,
                            height: 12,
                            bgcolor: '#6b7280',
                            borderRadius: '12px 12px 0 0'
                          }
                        }} />
                      </Box>
                    </Box>
                    
                    {/* Meeting options icons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                      <Box sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#1f2937',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#fff', fontSize: '14px' }}>📹</span>
                      </Box>
                      <Box sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#1f2937',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#fff', fontSize: '14px' }}>⚡</span>
                      </Box>
                      <Box sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#1f2937',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#fff', fontSize: '14px' }}>💬</span>
                      </Box>
                      <Box sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#1f2937',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#fff', fontSize: '14px' }}>📞</span>
                      </Box>
                      <Box sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#1f2937',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#fff', fontSize: '14px' }}>📺</span>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AppointmentSteps;
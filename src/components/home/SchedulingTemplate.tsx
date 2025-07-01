'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Chip, 
  Grid,
  Container
} from '@mui/material';
import CompanyLogos from './CompanyLogos';
import { 
  Google as GoogleIcon, 
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

const timeSlots = ['15m', '30m', '45m', '1h'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Dynamic appointment data based on time selection
type AppointmentData = {
  doctor: string;
  initials: string;
  specialty: string;
  description: string;
  location: string;
  timezone: string;
  bgColor: string;
};

const appointmentData: Record<number, AppointmentData> = {
  0: { // 15m
    doctor: 'Dr. Emily Chen',
    initials: 'EC',
    specialty: 'Quick Consultation',
    description: 'Brief medical consultation for minor concerns and follow-ups.',
    location: '15 Main Street, Boston',
    timezone: 'America/New_York',
    bgColor: '#3b82f6'
  },
  1: { // 30m
    doctor: 'Dr. Michael Rodriguez',
    initials: 'MR',
    specialty: 'General Checkup',
    description: 'Comprehensive health assessment and routine medical examination.',
    location: '42 Oak Avenue, Seattle',
    timezone: 'America/Los_Angeles',
    bgColor: '#10b981'
  },
  2: { // 45m
    doctor: 'Dr. Sarah Johnson',
    initials: 'SJ',
    specialty: 'Specialist Consultation',
    description: 'Detailed consultation with specialist for complex medical conditions.',
    location: '88 Pine Road, Denver',
    timezone: 'America/Denver',
    bgColor: '#f59e0b'
  },
  3: { // 1h
    doctor: 'Dr. David Kim',
    initials: 'DK',
    specialty: 'Comprehensive Exam',
    description: 'Complete medical evaluation including diagnostics and treatment planning.',
    location: '156 Cedar Lane, Miami',
    timezone: 'America/Miami',
    bgColor: '#8b5cf6'
  }
};

export default function MedicalSchedulingTemplate() {
  const [selectedTime, setSelectedTime] = useState(3); // 1h selected
  const [currentMonth, setCurrentMonth] = useState(4); // May
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(27);
  const [animationCounter, setAnimationCounter] = useState(0);
  const [highlightedDates, setHighlightedDates] = useState<number[]>([19, 20, 21, 22, 23, 26, 28, 29, 30]);

  // Animation effect for changing values (from first code)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCounter(prev => prev + 1);
      
      // Change time slot every 3 seconds
      if (animationCounter % 3 === 0) {
        setSelectedTime(prev => (prev + 1) % timeSlots.length);
      }
      
      // Change selected date every 2 seconds
      if (animationCounter % 2 === 0) {
        setSelectedDate(prev => {
          const dates = [15, 16, 20, 21, 22, 27, 28];
          const currentIndex = dates.indexOf(prev);
          return dates[(currentIndex + 1) % dates.length];
        });
        
        // Update highlighted dates based on selected date
        setHighlightedDates(prev => {
          const allHighlightSets = [
            [6, 10, 16, 17, 20, 21, 22, 23, 24], // for date 15
            [8, 9, 10, 13, 14, 15],  // for date 16
            [21, 22, 23, 24, 27], // for date 20
            [8, 12, 19, 26, 27],     // for date 21
            [27,28, 30, 21, 23],     // for date 22
            [19, 20, 21, 22, 23, ],      // for date 27
            [26, 28, 29, 30, 27]      // for date 28
          ];
          const currentDateIndex = [15, 16, 20, 21, 22, 27, 28].indexOf(selectedDate);
          return allHighlightSets[currentDateIndex] || prev;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [animationCounter, selectedDate]);

  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#ffffff'
    }}>
      

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Section */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ maxWidth: '500px' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '40px', md: '56px' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: '#111827',
                  mb: 4,
                  letterSpacing: '-0.025em'
                }}
              >
                The better way to schedule your meetings
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '18px',
                  color: '#6b7280',
                  lineHeight: 1.6,
                  mb: 6,
                  maxWidth: '460px'
                }}
              >
                A fully customizable scheduling software for individuals, businesses taking calls and developers building scheduling platforms where users meet users.
              </Typography>
              
              <Box sx={{ mb: 4, maxWidth: '320px' }}>
                <Button
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  sx={{
                    bgcolor: '#1f2937',
                    color: '#fff',
                    py: 1,
                    px: 4,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    mb: 2,
                    width: '100%',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#111827',
                      boxShadow: 'none'
                    }
                  }}
                >
                  Sign up with Google
                </Button>
                
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: '16px' }} />}
                  sx={{
                    color: '#6b7280',
                    fontSize: '16px',
                    fontWeight: 400,
                    textTransform: 'none',
                    py: 1,
                    px: 4,
                    mb: 2,
                    width: '100%',
                    borderRadius: '12px',
                    borderColor: '#e5e7eb',
                    bgcolor: '#f9fafb',
                    '&:hover': {
                      bgcolor: '#f3f4f6',
                      borderColor: '#d1d5db',
                      color: '#374151'
                    }
                  }}
                >
                  Sign up with email
                </Button>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#9ca3af',
                    fontSize: '14px',
                    textAlign: 'left'
                  }}
                >
                  No credit card required
                </Typography>
              </Box>
              
              
            </Box>
          </Grid>
          
          {/* Right Section - Medical Appointment Card and Calendar */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 0,
              maxWidth: '600px',
              mx: 'auto',
              //boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              borderRadius: '10px',
              border: 1,
              borderColor: '#e5e7eb',
              overflow: 'hidden'
            }}>
              {/* Medical Appointment Card */}
              <Card 
                sx={{ 
                  flex: 1,
                  boxShadow: 'none',
                  borderRadius: 0,
                  bgcolor: '#fff',
                  //border: 1,
                  //borderColor: '#e5e7eb'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48,
                        bgcolor: appointmentData[selectedTime].bgColor,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>
                        {appointmentData[selectedTime].initials}
                      </Typography>
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ 
                        fontSize: '14px', 
                        color: '#9ca3af', 
                        mb: 0.5,
                        fontWeight: 400,
                        transition: 'all 0.3s ease'
                      }}>
                        {appointmentData[selectedTime].doctor}
                      </Typography>
                      <Typography sx={{ 
                        fontSize: '20px', 
                        fontWeight: 700, 
                        color: '#111827',
                        lineHeight: 1.2,
                        transition: 'all 0.3s ease'
                      }}>
                        {appointmentData[selectedTime].specialty}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ 
                    fontSize: '14px', 
                    color: '#6b7280', 
                    lineHeight: 1.5,
                    mb: 4,
                    transition: 'all 0.3s ease'
                  }}>
                    {appointmentData[selectedTime].description}
                  </Typography>
                  
                  {/* Time Selection */}
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                      {timeSlots.map((time, index) => (
                        <Chip
                          key={time}
                          label={time}
                          size="medium"
                          sx={{
                            bgcolor: selectedTime === index ? '#111827' : '#f9fafb',
                            color: selectedTime === index ? '#fff' : '#6b7280',
                            fontWeight: 500,
                            fontSize: '14px',
                            height: '32px',
                            px: 1,
                            transition: 'all 0.2s ease',
                            border: 'none',
                            '&:hover': {
                              bgcolor: selectedTime === index ? '#111827' : '#f3f4f6'
                            }
                          }}
                          onClick={() => setSelectedTime(index)}
                        />
                      ))}
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <LocationIcon sx={{ color: '#6b7280', fontSize: '18px' }} />
                    <Typography sx={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      fontWeight: 500,
                      transition: 'all 0.3s ease'
                    }}>
                      {appointmentData[selectedTime].location}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon sx={{ color: '#6b7280', fontSize: '18px' }} />
                    <Typography sx={{ 
                      fontSize: '14px', 
                      color: '#6b7280', 
                      fontWeight: 500,
                      transition: 'all 0.3s ease'
                    }}>
                      {appointmentData[selectedTime].timezone}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
              
              {/* Calendar Card */}
              <Card 
                sx={{ 
                  flex: 1,
                  boxShadow: 'none',
                  borderRadius: 0,
                  //bgcolor: '#f9fafb',
                  borderLeft: 1,
                  borderColor: '#e5e7eb'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mb: 3 
                  }}>
                    <Typography sx={{ 
                      fontSize: '18px', 
                      fontWeight: 700,
                      color: '#111827'
                    }}>
                      {months[currentMonth]} {currentYear}
                    </Typography>
                  </Box>
                  
                  {/* Calendar Header */}
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(7, 1fr)', 
                    gap: 1, 
                    mb: 2 
                  }}>
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                      <Box key={day} sx={{ textAlign: 'center', py: 1 }}>
                        <Typography sx={{ 
                          fontSize: '12px', 
                          color: '#6b7280', 
                          fontWeight: 600,
                          px: 1
                        }}>
                          {day}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  {/* Calendar Days */}
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(7, 1fr)', 
                    gap: 1
                  }}>
                    {generateCalendarDays().map((day, index) => (
                      <Box key={index} sx={{ textAlign: 'center',  }}>
                        {day && (
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '7px',
                              bgcolor: selectedDate === day ? '#111827' : 
                                      highlightedDates.includes(day) ? '#e5e7eb' : 'transparent',
                              color: selectedDate === day ? '#fff' : '#374151',
                              fontSize: '14px',
                              fontWeight: selectedDate === day ? 600 : 
                                        highlightedDates.includes(day) ? 500 : 400,
                              transition: 'all 0.3s ease',
                              mx: 'auto',
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: selectedDate === day ? '#111827' : '#e5e7eb'
                              }
                            }}
                            onClick={() => setSelectedDate(day)}
                          >
                            {day}
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
              
            </Box>
            {/* Trust indicators */}
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'flex-start', mt: 8 }}>
                {/* Trustpilot */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'left', 
                  gap: 1,
                  px: 2,
                  py: 1
                }}>
                  <Typography sx={{ color: '#00B67A', fontSize: '30px', lineHeight: 1 }}>★★★★★</Typography>
                  <Typography sx={{ fontSize: '15px', color: '#111827', fontWeight: 600, textAlign: 'left' }}>
                    Trustpilot
                  </Typography>
                </Box>
                
                {/* ProductHunt */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'left', 
                  gap: 1,
                  px: 2,
                  py: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'left', gap: 0.5 }}>
                    <Typography sx={{ color: '#FFA500', fontSize: '30px', lineHeight: 1 }}>★★★★★</Typography>
                    
                  </Box>
                  <Typography sx={{ fontSize: '15px', color: '#111827', fontWeight: 600, textAlign: 'center' }}>
                    <Box sx={{ 
                      bgcolor: '#FF6154', 
                      color: '#fff', 
                      width: 21, 
                      height: 21, 
                      borderRadius: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      ml: 0.5
                    }}>
                      P
                    </Box>
                  </Typography>
                </Box>
                
                {/* Google Reviews */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'left', 
                  gap: 1,
                  px: 2,
                  py: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'left', gap: 0.5 }}>
                    <Typography sx={{ color: '#FF4444', fontSize: '30px', lineHeight: 1 }}>★★★★★</Typography>
                    
                  </Box>
                  <Typography sx={{ fontSize: '12px', color: '#111827', fontWeight: 600, textAlign: 'center' }}>
                    <Box sx={{ 
                      bgcolor: '#4285f4', 
                      color: '#fff', 
                      width: 21, 
                      height: 21, 
                      borderRadius: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      ml: 0.5
                    }}>
                      G
                    </Box>
                  </Typography>
                </Box>
              </Box>
          </Grid>
        </Grid>
      </Container>
      
      

    </Box>
  );
}
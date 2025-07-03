"use client"

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Avatar, Select, MenuItem, FormControl, InputLabel, Switch } from '@mui/material';
import { keyframes } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Animation keyframes
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

const Benefits = () => {
  // Animated form values
  const [formData, setFormData] = useState({
    minimumNotice: '2 days',
    bufferBefore: '0 mins',
    bufferAfter: '30 mins',
    timeSlotInterval: '1 hour'
  });

  // State for booking card data
  const [bookingData, setBookingData] = useState({
    name: 'Bailey Pumfleet',
    meetingType: 'Business meeting',
    description: 'Want to talk strategy, partnerships, or the bigger picture of scheduling infrastructure? Let\'s discuss how Cal.com fits into your business goals.',
    platform: 'Zoom',
    location: 'North America/California',
    url: 'bailey',
    selectedDuration: 1 // Index of selected duration (0: 15m, 1: 30m, 2: 45m, 3: 1h)
  });

  // State for calendar data
  const [calendarData, setCalendarData] = useState([
    { time: '11 AM - 12 PM', event: 'Coffee', day: 0, color: '#c084fc' },
    { time: '12 PM - 1 PM', event: 'Lunch date', day: 0, color: '#c084fc' },
    { time: '1 PM - 3 PM', event: 'Design conference', day: 1, color: '#6b7280' },
    { time: '12 PM - 2 PM', event: 'Design conference', day: 2, color: '#6b7280' },
    { time: '11:30 AM - 1 PM', event: 'Hiring call', day: 3, color: '#fca5a5' },
    { time: '11 AM - 2:30 PM', event: 'Company meeting', day: 4, color: '#7dd3fc' }
  ]);
  
  // State for calendar overlay toggle
  const [overlayEnabled, setOverlayEnabled] = useState(true);
  
  // State for time format
  const [timeFormat, setTimeFormat] = useState('12h');

  // State for notification cards
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New booking confirmed', time: "Just now", type: 'success', visible: true },
    { id: 2, message: 'Meeting starting now', time: "Just now", type: 'info', visible: false },
    { id: 3, message: 'Reminder: Call in 5 mins', time: "5 mins", type: 'warning', visible: false },
    
  ]);

  // Form data animation
  useEffect(() => {
    const formValues = [
      { minimumNotice: '2 days', bufferBefore: '0 mins', bufferAfter: '30 mins', timeSlotInterval: '1 hour' },
      { minimumNotice: '1 hour', bufferBefore: '15 mins', bufferAfter: '15 mins', timeSlotInterval: '5 mins' },
      { minimumNotice: '4 hours', bufferBefore: '5 mins', bufferAfter: '10 mins', timeSlotInterval: '30 mins' },
      { minimumNotice: '1 day', bufferBefore: '10 mins', bufferAfter: '5 mins', timeSlotInterval: '15 mins' }
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % formValues.length;
      setFormData(formValues[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Booking data animation
  useEffect(() => {
    const bookingProfiles = [
       {
         name: 'Bailey Pumfleet',
         meetingType: 'Business meeting',
         description: 'Want to talk strategy, partnerships, or the bigger picture of scheduling infrastructure? Let\'s discuss how Cal.com fits into your business goals.',
         platform: 'Zoom',
         location: 'North America/California',
         url: 'bailey',
         selectedDuration: 1 // 30m selected
       },
       {
         name: 'Cédric van Revesteijn',
         meetingType: 'Partnerships & Collaborations',
         description: 'Are you an agency, influencer, SaaS founder, or business looking to collaborate with Cal.com? Let\'s chat!',
         platform: 'Cal Video',
         location: 'Europe/Amsterdam',
         url: 'cedric',
         selectedDuration: 0 // 15m selected
       },
       {
         name: 'Sarah Mitchell',
         meetingType: 'Product Demo',
         description: 'Get a personalized walkthrough of Cal.com features and see how it can streamline your scheduling workflow.',
         platform: 'Google Meet',
         location: 'North America/New York',
         url: 'sarah',
         selectedDuration: 3 // 1h selected
       }
     ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % bookingProfiles.length;
      setBookingData(bookingProfiles[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Calendar data animation
  useEffect(() => {
    const calendarSets = [
      [
        { time: '11 AM - 12 PM', event: 'Coffee', day: 0, color: '#c084fc' },
        { time: '12 PM - 1 PM', event: 'Lunch date', day: 0, color: '#c084fc' },
        { time: '1 PM - 3 PM', event: 'Design conference', day: 1, color: '#6b7280' },
        { time: '12 PM - 2 PM', event: 'Design conference', day: 2, color: '#6b7280' },
        { time: '11:30 AM - 1 PM', event: 'Hiring call', day: 3, color: '#fca5a5' },
        { time: '11 AM - 2:30 PM', event: 'Company meeting', day: 4, color: '#7dd3fc' }
      ],
      [
        { time: '9 AM - 10 AM', event: 'Morning standup', day: 0, color: '#86efac' },
        { time: '2 PM - 3 PM', event: 'Client review', day: 1, color: '#fbbf24' },
        { time: '10 AM - 11 AM', event: 'Team sync', day: 2, color: '#60a5fa' },
        { time: '3 PM - 4 PM', event: 'Product demo', day: 3, color: '#f472b6' },
        { time: '1 PM - 2 PM', event: 'Strategy meeting', day: 4, color: '#a78bfa' }
      ],
      []
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % calendarSets.length;
      setCalendarData(calendarSets[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Notification animation
  useEffect(() => {
    const notificationMessages = [
      { message: 'New booking confirmed', time: "Just now", type: 'success' },
      { message: 'Meeting starting now', time: "Just now", type: 'info' },
      { message: 'Reminder: Call in 5 mins', time: "5 mins", type: 'warning' },
      { message: 'Calendar updated', time: "Just now", type: 'info' },
      { message: 'Payment received', time: "Just now", type: 'success' }
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      setNotifications(prev => 
        prev.map((notif, idx) => ({
          ...notif,
          message: idx === 0 ? notificationMessages[currentIndex].message : notif.message,
          type: idx === 0 ? notificationMessages[currentIndex].type : notif.type,
          time: idx === 0 ? notificationMessages[currentIndex].time : notif.time,
          visible: idx === 0
        }))
      );
      currentIndex = (currentIndex + 1) % notificationMessages.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const benefitsData = [
    {
      title: 'Avoid meeting overload',
      description: 'Only get booked when you want to. Set daily, weekly or monthly limits and add buffers around your events to allow you to focus or take a break.'
    },
    {
      title: 'Stand out with a custom booking link',
      description: 'Customize your booking link so it\'s short and easy to remember for your bookers. No more long, complicated links one can easily forget.'
    },
    {
      title: 'Streamline your bookers\' experience',
      description: 'Let your bookers overlay their calendar, receive booking confirmations via text or email, get events added to their calendar, and allow them to reschedule with ease.'
    },
    {
      title: 'Reduce no-shows with automated meeting reminders',
      description: 'Easily send sms or meeting reminder emails about bookings, and send automated follow-ups to gather any relevant information before the meeting.'
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
      <Box sx={{ mb: 2, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ 
          width: 8, 
          height: 8, 
          bgcolor: '#000', 
          borderRadius: '50%' 
        }} />
        <Typography sx={{ 
          fontSize: '14px', 
          fontWeight: 500,
          color: '#666'
        }}>
          Benefits
        </Typography>
      </Box>
      
      <Typography 
        variant="h3" 
        sx={{ 
          mb: 2,
          fontWeight: 700,
          color: '#1a1a1a',
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}
      >
        Your all-purpose scheduling app
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
        Discover a variety of our advanced features. Unlimited and free for individuals.
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
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 2,
        mt: 6
      }}>
        {benefitsData.map((benefit, index) => (
          <Card 
            key={index}
            sx={{
              p: 3,
              height: { xs: '600px', md: '500px' }, // Increased mobile height from 500px to 600px
              border: '1px solid #e5e7eb',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Typography 
                variant="h6" 
                sx={{
                  fontWeight: 600,
                  color: '#1a1a1a',
                  mb: 2,
                  fontSize: '1.1rem',
                  textAlign: 'left'
                }}
              >
                {benefit.title}
              </Typography>
              <Typography 
                sx={{
                  color: '#6b7280',
                  lineHeight: 1.6,
                  fontSize: '1rem',
                  textAlign: 'left',
                  mb: 3
                }}
              >
                {benefit.description}
              </Typography>
              
              {/* Animated content for each card */}
              <Box sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: '12px',
                minHeight: '128px', // Reduced from 150px by 15% (150 * 0.85 = 127.5px ≈ 128px)
                //bgcolor: '#f9fafb',
                border: '1px solid #e5e7eb'
              }}>
                {/* Card 1: Live Form Simulation */}
                {index === 0 && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: 2, textAlign: 'left' }}>
                      Notice and buffers
                    </Typography>
                    
                    {/* Minimum notice field */}
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                       <Typography sx={{ fontSize: '14px', color: '#374151', textAlign: "left", fontWeight: 500 }}>Minimum notice</Typography>
                       <Box sx={{ 
                         border: '1px solid #d1d5db', 
                         borderRadius: '10px', 
                         bgcolor: '#fff',
                         minHeight: '40px',
                         display: 'flex',
                         alignItems: 'center',
                         px: 2,
                         transition: 'all 0.3s ease'
                       }}>
                         <Typography sx={{ fontSize: '16px', color: '#111827', fontWeight: 400 }}>
                           {formData.minimumNotice}
                         </Typography>
                         <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                           <Typography sx={{ fontSize: '12px', color: '#6b7280' }}><ExpandMoreIcon/></Typography>
                         </Box>
                       </Box>
                     </Box>

                    {/* Buffer fields row */}
                     <Box sx={{ display: 'flex', gap: 2 }}>
                       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                         <Typography sx={{ fontSize: '14px', color: '#374151',textAlign: "left", fontWeight: 500 }}>Buffer before event</Typography>
                         <Box sx={{ 
                           border: '1px solid #d1d5db', 
                           borderRadius: '10px', 
                           bgcolor: '#fff',
                           minHeight: '40px',
                           display: 'flex',
                           alignItems: 'center',
                           px: 2,
                           transition: 'all 0.3s ease'
                         }}>
                           <Typography sx={{ fontSize: '16px', color: '#111827', fontWeight: 400 }}>
                             {formData.bufferBefore}
                           </Typography>
                           <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                             <Typography sx={{ fontSize: '12px', color: '#6b7280' }}><ExpandMoreIcon/></Typography>
                           </Box>
                         </Box>
                       </Box>
                       
                       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                         <Typography sx={{ fontSize: '14px', color: '#374151', textAlign: "left",fontWeight: 500 }}>Buffer after event</Typography>
                         <Box sx={{ 
                           border: '1px solid #d1d5db', 
                           borderRadius: '10px', 
                           bgcolor: '#fff',
                           minHeight: '40px',
                           display: 'flex',
                           alignItems: 'center',
                           px: 2,
                           transition: 'all 0.3s ease'
                         }}>
                           <Typography sx={{ fontSize: '16px', color: '#111827', fontWeight: 400 }}>
                             {formData.bufferAfter}
                           </Typography>
                           <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                             <Typography sx={{ fontSize: '12px', color: '#6b7280' }}><ExpandMoreIcon/></Typography>
                           </Box>
                         </Box>
                       </Box>
                     </Box>

                    {/* Time-slot intervals field */}
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                       <Typography sx={{ fontSize: '14px', color: '#374151', textAlign: "left",fontWeight: 500 }}>Time-slot intervals</Typography>
                       <Box sx={{ 
                         border: '1px solid #d1d5db', 
                         borderRadius: '10px', 
                         bgcolor: '#fff',
                         minHeight: '40px',
                         display: 'flex',
                         alignItems: 'center',
                         px: 2,
                         transition: 'all 0.3s ease'
                       }}>
                         <Typography sx={{ fontSize: '16px', color: '#111827', fontWeight: 400 }}>
                           {formData.timeSlotInterval}
                         </Typography>
                         <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
                           <Typography sx={{ fontSize: '12px', color: '#6b7280' }}><ExpandMoreIcon/></Typography>
                         </Box>
                       </Box>
                     </Box>
                  </Box>
                )}

                {/* Card 2: Custom Booking Link */}
                {index === 1 && (
                  <Box sx={{ position: 'relative', height: '100%' }}>
                    {/* URL Bar */}
                    <Box sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1, 
                      bgcolor: '#f8f9fa',
                      px: 3,
                      py: 1,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#1f2937',
                      border: '1px solid #e9ecef',
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 2,
                      minWidth: '150px'
                    }}>
                      cal.com/{bookingData.url}
                    </Box>
                    
                    {/* Main Content Box */}
                    <Box sx={{ 
                      bgcolor: '#fff', 
                      p: 3, 
                      pt: 4,
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      textAlign: 'left',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 1,
                      mt: 2
                    }}>
                      
                      {/* Profile Section */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: bookingData.name === 'Bailey Pumfleet' ? '#6366f1' : 
                                     bookingData.name === 'Cédric van Revesteijn' ? '#10b981' : '#f59e0b',
                            fontSize: '16px',
                            fontWeight: 600
                          }}
                        >
                          {bookingData.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        <Box>
                          <Typography sx={{ fontSize: '13px', color: '#6b7280', mb: 0.5 }}>
                            {bookingData.name}
                          </Typography>
                          <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>
                            {bookingData.meetingType}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Description */}
                      <Typography sx={{ 
                        fontSize: '13px', 
                        color: '#6b7280', 
                        mb: 3,
                        lineHeight: 1.5,
                        textAlign: 'left'
                      }}>
                        {bookingData.description}
                      </Typography>
                      
                      {/* Duration Options */}
                       <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                         {['15m', '30m', '45m', '1h'].map((time, idx) => (
                           <Box key={time} sx={{
                             px: 2.5,
                             py: 1,
                             borderRadius: '6px',
                             fontSize: '13px',
                             fontWeight: 500,
                             bgcolor: idx === bookingData.selectedDuration ? '#1f2937' : '#f8f9fa',
                             color: idx === bookingData.selectedDuration ? '#fff' : '#6b7280',
                             border: idx === bookingData.selectedDuration ? 'none' : '1px solid #e9ecef',
                             cursor: 'pointer',
                             transition: 'all 0.3s ease'
                           }}>
                             {time}
                           </Box>
                         ))}
                       </Box>
                      
                      {/* Platform and Location */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ 
                            width: 20, 
                            height: 20, 
                            bgcolor: bookingData.platform === 'Zoom' ? '#2d8cff' : 
                                     bookingData.platform === 'Cal Video' ? '#1f2937' : '#4285f4',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: '#fff',
                            fontWeight: 600
                          }}>
                            {bookingData.platform === 'Zoom' ? '📹' : 
                             bookingData.platform === 'Cal Video' ? '📹' : '📹'}
                          </Box>
                          <Typography sx={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                            {bookingData.platform}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ 
                            width: 20, 
                            height: 20, 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px'
                          }}>
                            🌍
                          </Box>
                          <Typography sx={{ fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>
                            {bookingData.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* Card 3: Calendar Overlay */}
                {index === 2 && (
                  <Box>
                    
                      {/* Toggle Section */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        mb: 1,
                        gap: 2
                      }}>
                        <Switch 
                          checked={overlayEnabled}
                          onChange={(e) => setOverlayEnabled(e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#1f2937',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#1f2937',
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#1f2937' }}>
                          Overlay my calendar
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                          <Box 
                            onClick={() => setTimeFormat('12h')}
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 500,
                              bgcolor: timeFormat === '12h' ? '#1f2937' : '#f8f9fa',
                              color: timeFormat === '12h' ? '#fff' : '#6b7280',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            12h
                          </Box>
                          <Box 
                            onClick={() => setTimeFormat('24h')}
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 500,
                              bgcolor: timeFormat === '24h' ? '#1f2937' : '#f8f9fa',
                              color: timeFormat === '24h' ? '#fff' : '#6b7280',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            24h
                          </Box>
                        </Box>
                      </Box>
                      
                      {/* Calendar Grid */}
                      <Box sx={{ 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}>
                        {/* Header */}
                        <Box sx={{ 
                          display: 'grid',
                          gridTemplateColumns: 'repeat(5, 1fr)',
                          bgcolor: '#f8fafc',
                          borderBottom: '1px solid #e5e7eb'
                        }}>
                          {['Wed 06', 'Thu 07', 'Fri 08', 'Sat 09', 'Sun 10'].map((day, idx) => (
                            <Box key={day} sx={{ 
                              p: 2, 
                              textAlign: 'center', 
                              fontSize: '13px', 
                              fontWeight: 600,
                              color: '#374151',
                              borderRight: idx < 4 ? '1px solid #e5e7eb' : 'none'
                            }}>
                              {day}
                            </Box>
                          ))}
                        </Box>
                        
                        {/* Calendar Body */}
                        <Box sx={{ 
                          display: 'grid',
                          gridTemplateColumns: 'repeat(5, 1fr)',
                          minHeight: '200px',
                          position: 'relative'
                        }}>
                          {/* Grid Lines */}
                          {[0, 1, 2, 3, 4].map((colIdx) => (
                            <Box key={colIdx} sx={{
                              borderRight: colIdx < 4 ? '1px solid #e5e7eb' : 'none',
                              minHeight: '200px'
                            }} />
                          ))}
                          
                          {/* Events */}
                          {overlayEnabled && calendarData.map((item, idx) => (
                            <Box 
                              key={`${item.time}-${idx}`}
                              sx={{
                                position: 'absolute',
                                left: `${item.day * 20}%`,
                                top: `${20 + (idx % 3) * 50}px`,
                                width: '18%',
                                p: 1,
                                m: '2px',
                                bgcolor: item.color,
                                borderRadius: '6px',
                                animation: `${slideUp} 0.6s ease-out`,
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                  transform: 'scale(1.02)',
                                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <Typography sx={{ 
                                fontSize: '10px', 
                                fontWeight: 600,
                                color: '#fff',
                                mb: 0.5
                              }}>
                                {item.event}
                              </Typography>
                              <Typography sx={{ 
                                fontSize: '9px', 
                                color: 'rgba(255,255,255,0.9)'
                              }}>
                                {item.time}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    
                  </Box>
                )}

                {/* Card 4: Notification Cards */}
                {index === 3 && (
                  <Box sx={{ position: 'relative', height: '60px' }}>
                    {notifications.map((notification, idx) => (
                      <Box 
                        key={notification.id}
                        sx={{
                          position: 'absolute',
                          top: `${idx * 10}px`,
                          left: `${idx * 5}px`,
                          right: `${idx * 5}px`,
                          bgcolor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          p: 2,
                          zIndex: notifications.length - idx,
                          opacity: notification.visible ? 1 : 0.7,
                          transform: notification.visible ? 'scale(1)' : 'scale(0.95)',
                          transition: 'all 0.3s ease',
                          animation: notification.visible ? `${fadeInOut} 2.5s ease-in-out` : 'none'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: "black",
                            fontSize: '14px'
                          }}>
                            Cal
                          </Avatar>
                          <Box sx={{ flex: 1, textAlign: 'left' }}>
                            <Typography sx={{ 
                              fontSize: '12px', 
                              fontWeight: 600,
                              color: 'black',
                            }}>
                            Booking {notification.type === 'success' ? 'confirmed' : 
                                      notification.type === 'warning' ? 'reminder' : 'updated'}
                            </Typography>
                            <Typography sx={{ fontSize: '11px', color: '#6b7280' }}>
                              {notification.message}
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: '10px', color: '#9ca3af' }}>
                            {notification.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
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

export default Benefits;
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  avatarColor?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "Just gave it a go and it&apos;s definitely the easiest meeting I&apos;ve ever scheduled!",
    avatar: "SJ",
    avatarColor: "#8B5CF6"
  },
  {
    id: 2,
    name: "Aria Minaei",
    role: "CEO",
    company: "TheatreJS",
    content: "Just gave it a go and it&apos;s definitely the easiest meeting I&apos;ve ever scheduled!",
    avatar: "AM",
    avatarColor: "#EF4444"
  },
  {
    id: 3,
    name: "Ant Wilson",
    role: "Co-Founder & CTO",
    company: "Supabase",
    content: "I finally made the move to Cal.com after I couldn&apos;t find how to edit events in the Calendly dashboard.",
    avatar: "AW",
    avatarColor: "#10B981"
  },
  {
    id: 4,
    name: "Flo Merian",
    role: "Product Designer",
    company: "Mintlify",
    content: "More elegant than Calendly, more open than SavvyCal, Cal.com just works and it feels just right.",
    avatar: "FM",
    avatarColor: "#F59E0B"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager",
    company: "ScaleUp Solutions",
    content: "The scheduling automation has saved us countless hours. Our team productivity has increased by 40%.",
    avatar: "LT",
    avatarColor: "#6366F1"
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Aria Minaei (middle)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-rotate testimonials every 2 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleTestimonialClick = (index: number) => {
    if (index === activeIndex) return;
    
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 5 seconds of manual interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const getVisibleTestimonials = () => {
    if (isMobile) {
      // On mobile, show only the active testimonial
      return [activeIndex];
    }
    
    // On desktop, show 3 testimonials: prev, current, next
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (activeIndex + 1) % testimonials.length;
    
    return [prevIndex, activeIndex, nextIndex];
  };

  const getTestimonialStyle = (index: number, position: 'prev' | 'active' | 'next') => {
    const isActive = position === 'active';
    
    return {
      opacity: isActive ? 1 : 0.3,
      transform: `scale(${isActive ? 1 : 0.8})`,
      zIndex: isActive ? 10 : 1,
      transition: 'all 0.4s ease-in-out',
      cursor: isActive ? 'default' : 'pointer',
      maxWidth: isActive ? '380px' : '300px',
      minHeight: '220px',
      '&:hover': {
        opacity: isActive ? 1 : 0.6,
        transform: isActive ? 'scale(1.02)' : 'scale(0.85)',
      }
    };
  };

  const visibleIndices = getVisibleTestimonials();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
            animation: `${fadeIn} 0.8s ease-out`
          }}
        >
          <Typography
            sx={{
              color: '#6B7280',
              fontWeight: 500,
              letterSpacing: 0.5,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              fontSize: '0.875rem'
            }}
          >
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              👥
            </Box>
            Testimonials
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#111827',
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.025em'
            }}
          >
            Don&apos;t just take our word for it
          </Typography>
          <Typography
            sx={{
              color: '#6B7280',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.125rem' }
            }}
          >
            Our users are our best ambassadors. Discover why we&apos;re the top choice for scheduling meetings.
          </Typography>
        </Box>

        {/* Testimonials Carousel */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: { xs: 0, md: 2 },
            px: { xs: 2, md: 4 },
            minHeight: '280px',
            mb: 4
          }}
        >
          {visibleIndices.map((testimonialIndex, displayIndex) => {
            const testimonial = testimonials[testimonialIndex];
            const position = isMobile ? 'active' : 
              displayIndex === 0 ? 'prev' : 
              displayIndex === 1 ? 'active' : 'next';

            return (
              <Card
                key={`${testimonial.id}-${displayIndex}`}
                onClick={() => handleTestimonialClick(testimonialIndex)}
                sx={{
                  ...getTestimonialStyle(testimonialIndex, position),
                  borderRadius: 2,
                  boxShadow: position === 'active' 
                    ? '0 10px 25px rgba(0, 0, 0, 0.1)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E5E7EB',
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    textAlign: 'left'
                  }}
                >
                  {/* Content */}
                  <Typography
                    sx={{
                      color: '#111827',
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: position === 'active' ? '1.125rem' : '1rem',
                      fontWeight: 500,
                      flex: 1,
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}
                  >
                    &ldquo;{testimonial.content}&rdquo;
                  </Typography>

                  {/* Author Info */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 2,
                      mt: 'auto'
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: testimonial.avatarColor || '#6366F1',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#ffffff'
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    
                    <Box>
                      <Typography
                        sx={{
                          color: '#111827',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          lineHeight: 1.2,
                          mb: 0.5
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#6B7280',
                          fontSize: '0.75rem',
                          lineHeight: 1.2
                        }}
                      >
                        {testimonial.role}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        
      </Container>
    </Box>
  );
};

export default TestimonialsCarousel;
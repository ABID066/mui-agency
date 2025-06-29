'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

export default function Portfolio() {
  const projects = [
    {
      title: 'Project Alpha',
      description: 'A successful SEO campaign that increased organic traffic by 200% for a local business.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Project Beta',
      description: 'A high-converting PPC campaign that generated 300% ROI for an e-commerce store.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Project Gamma',
      description: 'An engaging social media strategy that grew followers by 500% for a growing brand.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Project Alpha',
      description: 'A successful SEO campaign that increased organic traffic by 200% for a local business.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
  ];

  return (
    <Box sx={{ bgcolor: 'white', py: 10 }}>
      <Container maxWidth="xl">
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem', xl: '4rem' },
              fontWeight: 900, 
              color: 'black',
              mb: 3,
              letterSpacing: '-0.025em',
              maxWidth: '1000px',
              mx: 'auto'
            }}
          >
            Our Success Stories
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
            Take a look at some of our recent projects and the results we&#39;ve achieved for our clients.
            Don&#39;t just take our word for it. Here&#39;s what our satisfied clients have to say about working with AgencyBoost.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
          {projects.map((project, index) => (
            <Grid size={{xs: 12, sm: 6, md: 6, lg: 3}} key={index}>
              <Card 
                elevation={0} 
                sx={{ 
                  bgcolor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                  },
                  Width: {xm: 1, md: 200, lg: 200 },
                }}
              >
                <Box
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover'
                  }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700, 
                      color: 'black',
                      mb: 2
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#6b7280',
                      mb: 3,
                      maxWidth: 1200,
                      lineHeight: 1.6
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Button
                    endIcon={<ArrowForward />}
                    sx={{
                      color: 'black',
                      fontWeight: 600,
                      textTransform: 'none',
                      p: 0,
                      '&:hover': { bgcolor: 'transparent' }
                    }}
                  >
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
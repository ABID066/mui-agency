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
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Article,
  VideoLibrary,
  School,
  Download,
  Forum,
  Help,
  Code,
  Book,
  PlayArrow,
  GetApp,
  QuestionAnswer,
  Support
} from '@mui/icons-material';
import PageLayout from '../../components/layouts/PageLayout';

const resourceCategories = [
  {
    icon: <Article sx={{ fontSize: 40 }} />,
    title: 'Blog & Articles',
    description: 'Stay updated with the latest marketing trends, tips, and best practices.',
    color: '#3b82f6',
    items: [
      '50+ Marketing Guides',
      'Weekly Industry Updates',
      'Case Studies',
      'Expert Insights'
    ]
  },
  {
    icon: <VideoLibrary sx={{ fontSize: 40 }} />,
    title: 'Video Tutorials',
    description: 'Learn how to use our platform with step-by-step video guides.',
    color: '#ef4444',
    items: [
      'Getting Started Series',
      'Advanced Features',
      'Webinar Recordings',
      'Product Demos'
    ]
  },
  {
    icon: <School sx={{ fontSize: 40 }} />,
    title: 'Learning Center',
    description: 'Comprehensive courses to master digital marketing and our platform.',
    color: '#10b981',
    items: [
      'Certification Programs',
      'Interactive Courses',
      'Skill Assessments',
      'Learning Paths'
    ]
  },
  {
    icon: <Download sx={{ fontSize: 40 }} />,
    title: 'Downloads',
    description: 'Free templates, guides, and tools to accelerate your marketing efforts.',
    color: '#f59e0b',
    items: [
      'Campaign Templates',
      'Strategy Guides',
      'Checklists',
      'Design Assets'
    ]
  },
  {
    icon: <Forum sx={{ fontSize: 40 }} />,
    title: 'Community',
    description: 'Connect with other marketers and share experiences in our community.',
    color: '#8b5cf6',
    items: [
      'Discussion Forums',
      'User Groups',
      'Success Stories',
      'Networking Events'
    ]
  },
  {
    icon: <Help sx={{ fontSize: 40 }} />,
    title: 'Help Center',
    description: 'Find answers to common questions and get technical support.',
    color: '#06b6d4',
    items: [
      'FAQ Database',
      'Troubleshooting',
      'API Documentation',
      'Contact Support'
    ]
  }
];

const popularResources = [
  {
    type: 'Guide',
    title: 'Complete Digital Marketing Strategy Guide',
    description: 'A comprehensive 50-page guide covering all aspects of digital marketing.',
    icon: <Book />,
    color: '#3b82f6'
  },
  {
    type: 'Video',
    title: 'Platform Onboarding Series',
    description: '10-part video series to get you started with our platform.',
    icon: <PlayArrow />,
    color: '#ef4444'
  },
  {
    type: 'Template',
    title: 'Campaign Planning Template',
    description: 'Ready-to-use template for planning your marketing campaigns.',
    icon: <GetApp />,
    color: '#10b981'
  },
  {
    type: 'Webinar',
    title: 'Advanced Analytics Workshop',
    description: 'Learn how to leverage analytics for better campaign performance.',
    icon: <School />,
    color: '#f59e0b'
  }
];

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: <QuestionAnswer />,
    available: '24/7'
  },
  {
    title: 'Email Support',
    description: 'Send us detailed questions via email',
    icon: <Support />,
    available: 'Within 2 hours'
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with our experts',
    icon: <Help />,
    available: 'Business hours'
  },
  {
    title: 'API Documentation',
    description: 'Complete technical documentation',
    icon: <Code />,
    available: 'Always updated'
  }
];

export default function ResourcesPage() {
  return (
    <PageLayout>
      <Box sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Chip 
              label="Resources" 
              sx={{ 
                mb: 2, 
                bgcolor: '#000000', 
                color: '#ffffff',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }} 
            />
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 2,
                color: '#000000',
                letterSpacing: '-0.025em',
                px: { xs: 2, sm: 0 }
              }}
            >
              Everything you need to succeed
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                color: '#6b7280',
                mb: 6,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
                px: { xs: 2, sm: 1, md: 0 }
              }}
            >
              Access our comprehensive library of guides, tutorials, templates, and support resources to maximize your marketing success.
            </Typography>
          </Box>

          {/* Resource Categories */}
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }} 
            sx={{ mb: { xs: 8, md: 12 } }}
            justifyContent="center"
          >
            {resourceCategories.map((category, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card 
                  sx={{ 
                    height: { xs: '380px', sm: '420px', md: '450px' },
                    width: '100%',
                    p: { xs: 2, sm: 3 },
                    border: '1px solid #e5e7eb',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: { xs: 'translateY(-4px)', md: 'translateY(-8px)' },
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      borderColor: category.color,
                    }
                  }}
                >
                  <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${category.color}15`,
                        color: category.color,
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                        mb: 3,
                        '& svg': {
                          fontSize: { xs: 32, sm: 40 }
                        }
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        fontWeight: 600,
                        mb: 2,
                        color: '#000000',
                        minHeight: { xs: '30px', sm: '36px' }
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        color: '#6b7280',
                        lineHeight: 1.6,
                        mb: 3,
                        flex: '0 0 auto',
                        minHeight: { xs: '60px', sm: '72px' },
                        display: '-webkit-box',
                        WebkitLineClamp: { xs: 3, sm: 3 },
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {category.description}
                    </Typography>
                    <Box sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                      <List dense sx={{ flex: '1 1 auto' }}>
                        {category.items.map((item, itemIndex) => (
                          <ListItem key={itemIndex} sx={{ px: 0, py: 0.25 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <Box 
                                sx={{ 
                                  width: 6, 
                                  height: 6, 
                                  borderRadius: '50%', 
                                  bgcolor: category.color 
                                }} 
                              />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item}
                              primaryTypographyProps={{
                                variant: 'body2',
                                sx: { 
                                  color: '#6b7280',
                                  fontSize: { xs: '0.85rem', sm: '0.875rem' }
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Popular Resources */}
          <Box sx={{ mb: { xs: 8, md: 12 } }}>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                color: '#000000',
                px: { xs: 2, sm: 0 }
              }}
            >
              Popular Resources
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: '#6b7280',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
                px: { xs: 2, sm: 1, md: 0 }
              }}
            >
              Start with these highly-rated resources that have helped thousands of marketers.
            </Typography>
            
            <Grid 
              container 
              spacing={{ xs: 2, sm: 3 }} 
              justifyContent="center"
            >
              {popularResources.map((resource, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card 
                    sx={{ 
                      p: { xs: 2, sm: 3 },
                      border: '1px solid #e5e7eb',
                      borderRadius: 2,
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={3} 
                      alignItems={{ xs: 'center', sm: 'flex-start' }}
                      textAlign={{ xs: 'center', sm: 'left' }}
                      sx={{ height: '100%' }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: `${resource.color}15`,
                          color: resource.color,
                          width: 48,
                          height: 48,
                          flexShrink: 0
                        }}
                      >
                        {resource.icon}
                      </Avatar>
                      <Box sx={{ 
                        flexGrow: 1, 
                        minWidth: 0, 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column' 
                      }}>
                        <Chip 
                          label={resource.type} 
                          size="small" 
                          sx={{ 
                            mb: 1,
                            bgcolor: `${resource.color}15`,
                            color: resource.color,
                            fontWeight: 600,
                            alignSelf: { xs: 'center', sm: 'flex-start' }
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontSize: { xs: '1.125rem', sm: '1.25rem' },
                            fontWeight: 600,
                            mb: 1,
                            color: '#000000',
                            minHeight: { xs: '54px', sm: '60px' },
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 2, sm: 2 },
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {resource.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: { xs: '0.85rem', sm: '0.875rem' },
                            color: '#6b7280',
                            lineHeight: 1.5,
                            flex: '1 1 auto',
                            display: '-webkit-box',
                            WebkitLineClamp: { xs: 4, sm: 3 },
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {resource.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Support Section */}
          <Box sx={{ 
            bgcolor: '#f8f9fa', 
            borderRadius: 4, 
            p: { xs: 3, sm: 4, md: 6 }
          }}>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                color: '#000000',
                px: { xs: 2, sm: 0 }
              }}
            >
              Need Help?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: '#6b7280',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
                px: { xs: 2, sm: 1, md: 0 }
              }}
            >
              Our support team is here to help you succeed. Choose the option that works best for you.
            </Typography>
            
            <Grid 
              container 
              spacing={{ xs: 2, sm: 3 }} 
              justifyContent="center"
            >
              {supportOptions.map((option, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    height: { xs: '200px', sm: '220px', md: '200px' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box>
                      <Avatar 
                        sx={{ 
                          bgcolor: '#000000',
                          color: '#ffffff',
                          width: { xs: 48, sm: 56 },
                          height: { xs: 48, sm: 56 },
                          mx: 'auto',
                          mb: 2
                        }}
                      >
                        {option.icon}
                      </Avatar>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: { xs: '1.125rem', sm: '1.25rem' },
                          fontWeight: 600,
                          mb: 1,
                          color: '#000000',
                          minHeight: { xs: '28px', sm: '30px' }
                        }}
                      >
                        {option.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: { xs: '0.85rem', sm: '0.875rem' },
                          color: '#6b7280',
                          mb: 2,
                          px: { xs: 1, sm: 0 },
                          minHeight: { xs: '60px', sm: '50px' },
                          display: '-webkit-box',
                          WebkitLineClamp: { xs: 3, sm: 2 },
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {option.description}
                      </Typography>
                    </Box>
                    <Chip 
                      label={option.available}
                      size="small"
                      sx={{ 
                        bgcolor: '#10b981',
                        color: '#ffffff',
                        fontWeight: 600,
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                        alignSelf: 'center'
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ textAlign: 'center' }}>
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  bgcolor: '#000000',
                  color: '#ffffff',
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  '&:hover': {
                    bgcolor: '#1f2937',
                  }
                }}
              >
                Contact Support
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack
} from '@mui/material';
import { Check, Star } from '@mui/icons-material';
import PageLayout from '../../components/layouts/PageLayout';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 5 campaigns',
      'Basic analytics',
      'Email support',
      '1 user account',
      'Social media integration',
    ],
    popular: false,
    buttonText: 'Get Started',
    buttonVariant: 'outlined' as const,
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 25 campaigns',
      'Advanced analytics',
      'Priority support',
      '5 user accounts',
      'Social media integration',
      'A/B testing',
      'Custom reporting',
    ],
    popular: true,
    buttonText: 'Start Free Trial',
    buttonVariant: 'contained' as const,
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For large organizations with advanced needs',
    features: [
      'Unlimited campaigns',
      'Enterprise analytics',
      '24/7 phone support',
      'Unlimited users',
      'All integrations',
      'Advanced A/B testing',
      'Custom reporting',
      'Dedicated account manager',
      'API access',
    ],
    popular: false,
    buttonText: 'Contact Sales',
    buttonVariant: 'outlined' as const,
  },
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial for the Professional plan. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise customers.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all our plans. No questions asked.'
  }
];

export default function Pricing() {
  return (
    <PageLayout>
      <Box sx={{pt:"180px", py: { xs: 6, sm: 8, lg: 10 } }}>
        <Container maxWidth="lg">
          {/* Header Section */}
          <Box sx={{
            pt: "100px",  
            textAlign: 'center', 
            mb: { xs: 6, sm: 8, lg: 10 },
            px: { xs: 2, sm: 0 }
          }}>
            <Chip 
              label="Pricing" 
              sx={{ 
                mb: { xs: 2, sm: 3 }, 
                bgcolor: '#000000', 
                color: '#ffffff',
                fontWeight: 600,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }} 
            />
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                mb: { xs: 2, sm: 3 },
                color: '#000000',
                letterSpacing: '-0.025em',
                lineHeight: { xs: 1.2, sm: 1.1 }
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                color: '#6b7280',
                mb: { xs: 4, sm: 6 },
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
                px: { xs: 1, sm: 0 }
              }}
            >
              Choose the perfect plan for your business. Upgrade or downgrade at any time with no hidden fees.
            </Typography>
          </Box>

          {/* Pricing Cards */}
          <Grid container spacing={{ xs: 3, sm: 4 }} sx={{ mb: { xs: 8, sm: 10, lg: 12 } }}>
            {pricingPlans.map((plan, index) => (
              <Grid size={{xs: 12, sm: 6, lg: 4}} key={index}>
                <Box sx={{ position: 'relative', height: '100%' }}>
                  {/* Popular Badge - Fixed positioning */}
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: '#000000',
                        color: '#ffffff',
                        fontWeight: 600,
                        zIndex: 10,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        height: { xs: 28, sm: 32 }
                      }}
                      icon={<Star sx={{ color: '#ffffff !important', fontSize: { xs: 16, sm: 18 } }} />}
                    />
                  )}
                  
                  <Card 
                    sx={{ 
                      height: '100%',
                      width: "100%",
                      
                      
                      p: { xs: 3, sm: 4 },
                      border: '1px solid #e5e7eb',
                      borderRadius: { xs: 2, sm: 3 },
                      position: 'relative',
                      transition: 'all 0.3s ease-in-out',
                      mt:  2 , // Add margin top for popular card
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        borderColor: plan.popular ? '#000000' : '#6b7280',
                      },
                      ...(plan.popular && {
                        borderColor: '#000000',
                        borderWidth: 2,
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                      })
                    }}
                  >
                    <CardContent sx={{ 
                      p: 0, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      height: '100%',
                      
                      textAlign: { xs: 'center', sm: 'left' }
                    }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                          fontWeight: 600,
                          mb: { xs: 1, sm: 1.5 }, 
                          color: '#000000'
                        }}
                      >
                        {plan.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          mb: { xs: 3, sm: 4 }, 
                          color: '#6b7280',
                          width: { xs: '100%', sm: '80%' },
                          lineHeight: 1.6
                        }}
                      >
                        {plan.description}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'baseline', 
                        mb: { xs: 3, sm: 4 },
                        justifyContent: { xs: 'center', sm: 'flex-start' }
                      }}>
                        <Typography 
                          variant="h2" 
                          sx={{ 
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                            fontWeight: 700,
                            color: '#000000'
                          }}
                        >
                          {plan.price}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            ml: 1, 
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            color: '#6b7280',
                            fontWeight: 400
                          }}
                        >
                          {plan.period}
                        </Typography>
                      </Box>

                      <List sx={{ 
                        mb: { xs: 3, sm: 4 }, 
                        flexGrow: 1,
                        '& .MuiListItem-root': {
                          justifyContent: { xs: 'center', sm: 'flex-start' }
                        }
                      }}>
                        {plan.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ 
                            px: 0, 
                            py: { xs: 0.25, sm: 0.5 },
                            textAlign: { xs: 'center', sm: 'left' }
                          }}>
                            <ListItemIcon sx={{ 
                              minWidth: { xs: 28, sm: 32 },
                              justifyContent: { xs: 'center', sm: 'flex-start' }
                            }}>
                              <Check sx={{ 
                                color: '#10b981', 
                                fontSize: { xs: 18, sm: 20 } 
                              }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              primaryTypographyProps={{
                                variant: 'body1',
                                sx: { 
                                  fontSize: { xs: '0.875rem', sm: '1rem' },
                                  color: '#000000',
                                  lineHeight: 1.6
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Button
                        variant={plan.buttonVariant}
                        fullWidth
                        size="large"
                        sx={{
                          mt: 'auto',
                          py: { xs: 1.25, sm: 1.5 },
                          borderRadius: { xs: 1.5, sm: 2 },
                          fontWeight: 600,
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          ...(plan.buttonVariant === 'contained' && {
                            bgcolor: '#000000',
                            color: '#ffffff',
                            '&:hover': {
                              bgcolor: '#1f2937',
                            }
                          }),
                          ...(plan.buttonVariant === 'outlined' && {
                            borderColor: '#000000',
                            color: '#000000',
                            '&:hover': {
                              borderColor: '#000000',
                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                          })
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* FAQ Section */}
          <Box sx={{ 
            bgcolor: '#f8f9fa', 
            borderRadius: { xs: 3, sm: 4 }, 
            p: { xs: 4, sm: 6 }, 
            mb: { xs: 8, sm: 10, lg: 12 }
          }}>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700,
                mb: { xs: 2, sm: 3 },
                color: '#000000'
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: '#6b7280',
                mb: { xs: 4, sm: 6 },
                maxWidth: '600px',
                mx: 'auto',
                px: { xs: 2, sm: 0 }
              }}
            >
              Everything you need to know about our pricing and plans.
            </Typography>
            
            <Grid container spacing={{ xs: 3, sm: 4 }}>
              {faqs.map((faq, index) => (
                <Grid size={{xs: 12, md: 6}} key={index}>
                  <Box 
                    sx={{ 
                      p: { xs: 3, sm: 4 },
                      bgcolor: '#ffffff',
                      borderRadius: { xs: 2, sm: 3 },
                      border: '1px solid #e5e7eb',
                      height: '100%',
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                        mb: { xs: 2, sm: 2.5 }, 
                        color: '#000000',
                        fontWeight: 600
                      }}
                    >
                      {faq.question}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        color: '#6b7280',
                        lineHeight: 1.6
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box sx={{ textAlign: 'center', px: { xs: 2, sm: 0 } }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700,
                mb: { xs: 2, sm: 3 },
                color: '#000000'
              }}
            >
              Ready to get started?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                color: '#6b7280',
                mb: { xs: 4, sm: 5 },
                maxWidth: '500px',
                mx: 'auto'
              }}
            >
              Join thousands of businesses already using our platform to grow their revenue.
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 2, sm: 3 }} 
              sx={{ 
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button 
                variant="contained" 
                size="large"
                sx={{
                  bgcolor: '#000000',
                  color: '#ffffff',
                  px: { xs: 6, sm: 8 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: { xs: 1.5, sm: 2 },
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: '100%', sm: 'auto' },
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
                  px: { xs: 6, sm: 8 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: { xs: 1.5, sm: 2 },
                  fontWeight: 600,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  minWidth: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                Contact Sales
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}
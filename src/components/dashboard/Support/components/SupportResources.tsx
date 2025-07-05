'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Grid
} from '@mui/material';
import {
  ExpandMore,
  Help,
  Book,
  Phone,
  Email,
  Chat,
  VideoCall
} from '@mui/icons-material';
import { FAQ } from './utils';

interface SupportResourcesProps {
  faqs: FAQ[];
  onContactSupport: () => void;
  onOpenDocumentation: () => void;
  onStartLiveChat: () => void;
  onScheduleCall: () => void;
}

export default function SupportResources({
  faqs,
  onContactSupport,
  onOpenDocumentation,
  onStartLiveChat,
  onScheduleCall
}: SupportResourcesProps) {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: { xs: 1, sm: 2, md: 3 },
        width: '100%',
        maxWidth: { xs: 'calc(100vw - 32px)', sm: '100%' },
        boxSizing: 'border-box'
      }}>
        {/* Quick Actions */}
        <Paper sx={{ 
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          borderRadius: 2,
          p: { xs: 1, sm: 2, md: 3 },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Quick Actions
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: { xs: 0.75, sm: 1 },
            width: '100%',
            maxWidth: '100%'
          }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Chat />}
              onClick={onStartLiveChat}
              sx={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '6px 12px', sm: '8px 16px' },
                minHeight: { xs: '36px', sm: '40px' },
                '&:hover': {
                  borderColor: '#2563eb',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)'
                }
              }}
            >
              Start Live Chat
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<VideoCall />}
              onClick={onScheduleCall}
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '6px 12px', sm: '8px 16px' },
                minHeight: { xs: '36px', sm: '40px' },
                '&:hover': {
                  borderColor: '#059669',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)'
                }
              }}
            >
              Schedule Call
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Email />}
              onClick={onContactSupport}
              sx={{
                borderColor: '#f59e0b',
                color: '#f59e0b',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '6px 12px', sm: '8px 16px' },
                minHeight: { xs: '36px', sm: '40px' },
                '&:hover': {
                  borderColor: '#d97706',
                  backgroundColor: 'rgba(245, 158, 11, 0.1)'
                }
              }}
            >
              Email Support
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Book />}
              onClick={onOpenDocumentation}
              sx={{
                borderColor: '#8b5cf6',
                color: '#8b5cf6',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '6px 12px', sm: '8px 16px' },
                minHeight: { xs: '36px', sm: '40px' },
                '&:hover': {
                  borderColor: '#7c3aed',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)'
                }
              }}
            >
              Documentation
            </Button>
          </Box>
        </Paper>

        {/* Contact Information */}
        <Paper sx={{ 
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          borderRadius: 2,
          p: { xs: 1, sm: 2, md: 3 },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 2,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Contact Information
          </Typography>
          <List sx={{ 
            p: 0,
            width: '100%',
            maxWidth: '100%'
          }}>
            <ListItem sx={{ 
              px: 0, 
              py: { xs: 0.5, sm: 1 },
              width: '100%',
              maxWidth: '100%'
            }}>
              <ListItemIcon sx={{ 
                minWidth: { xs: 32, sm: 36 }
              }}>
                <Phone sx={{ 
                  color: '#3b82f6', 
                  fontSize: { xs: 18, sm: 20 }
                }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ 
                    color: '#ffffff',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    +1 (555) 123-4567
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    24/7 Support Hotline
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ 
              px: 0, 
              py: { xs: 0.5, sm: 1 },
              width: '100%',
              maxWidth: '100%'
            }}>
              <ListItemIcon sx={{ 
                minWidth: { xs: 32, sm: 36 }
              }}>
                <Email sx={{ 
                  color: '#10b981', 
                  fontSize: { xs: 18, sm: 20 }
                }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ 
                    color: '#ffffff',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    support@company.com
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    Email Support
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ 
              px: 0, 
              py: { xs: 0.5, sm: 1 },
              width: '100%',
              maxWidth: '100%'
            }}>
              <ListItemIcon sx={{ 
                minWidth: { xs: 32, sm: 36 }
              }}>
                <Chat sx={{ 
                  color: '#f59e0b', 
                  fontSize: { xs: 18, sm: 20 }
                }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ 
                    color: '#ffffff',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    Live Chat
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    Mon-Fri 9AM-6PM EST
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* FAQ Section */}
        <Paper sx={{ 
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '100%'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Help sx={{ color: '#3b82f6', mr: 1 }} />
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                color: '#ffffff',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Frequently Asked Questions
            </Typography>
          </Box>
          <Box>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                  width: '100%',
                  maxWidth: '100%',
                  '&:before': {
                    display: 'none'
                  },
                  '&.Mui-expanded': {
                    margin: 0
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: 20, sm: 24 }
                  }} />}
                  sx={{
                    px: 0,
                    minHeight: { xs: 40, sm: 48 },
                    '&.Mui-expanded': {
                      minHeight: { xs: 40, sm: 48 }
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: { xs: '8px 0', sm: '12px 0' },
                      width: '100%',
                      maxWidth: '100%',
                      '&.Mui-expanded': {
                        margin: { xs: '8px 0', sm: '12px 0' }
                      }
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={500} sx={{ 
                    color: '#ffffff',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ 
                  px: 0, 
                  pt: 0,
                  width: '100%',
                  maxWidth: '100%'
                }}>
                  <Typography variant="body2" sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    lineHeight: 1.5
                  }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
                {index < faqs.length - 1 && (
                  <Divider sx={{ borderColor: '#334155', my: 1 }} />
                )}
              </Accordion>
            ))}
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
}
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Quick Actions */}
        <Paper sx={{ 
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          borderRadius: 2,
          p: 3
        }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 2 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Chat />}
              onClick={onStartLiveChat}
              fullWidth
              sx={{
                borderColor: '#475569',
                color: '#ffffff',
                '&:hover': {
                  borderColor: '#64748b',
                  backgroundColor: '#334155'
                }
              }}
            >
              Start Live Chat
            </Button>
            <Button
              variant="outlined"
              startIcon={<VideoCall />}
              onClick={onScheduleCall}
              fullWidth
              sx={{
                borderColor: '#475569',
                color: '#ffffff',
                '&:hover': {
                  borderColor: '#64748b',
                  backgroundColor: '#334155'
                }
              }}
            >
              Schedule Call
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
              onClick={onContactSupport}
              fullWidth
              sx={{
                borderColor: '#475569',
                color: '#ffffff',
                '&:hover': {
                  borderColor: '#64748b',
                  backgroundColor: '#334155'
                }
              }}
            >
              Email Support
            </Button>
            <Button
              variant="outlined"
              startIcon={<Book />}
              onClick={onOpenDocumentation}
              fullWidth
              sx={{
                borderColor: '#475569',
                color: '#ffffff',
                '&:hover': {
                  borderColor: '#64748b',
                  backgroundColor: '#334155'
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
          p: 3
        }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 2 }}>
            Contact Information
          </Typography>
          <List sx={{ p: 0 }}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Phone sx={{ color: '#3b82f6', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    +1 (555) 123-4567
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    24/7 Support Hotline
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Email sx={{ color: '#10b981', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    support@company.com
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Email Support
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Chat sx={{ color: '#f59e0b', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Live Chat
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
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
          p: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Help sx={{ color: '#3b82f6', mr: 1 }} />
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
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
                  '&:before': {
                    display: 'none'
                  },
                  '&.Mui-expanded': {
                    margin: 0
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: '#94a3b8' }} />}
                  sx={{
                    px: 0,
                    minHeight: 48,
                    '&.Mui-expanded': {
                      minHeight: 48
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: '12px 0',
                      '&.Mui-expanded': {
                        margin: '12px 0'
                      }
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0 }}>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
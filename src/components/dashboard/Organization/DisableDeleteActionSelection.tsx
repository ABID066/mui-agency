'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Warning,
  Delete,
  Block,
  CheckCircle
} from '@mui/icons-material';

interface ActionSelectionProps {
  onActionSelect: (action: 'disable' | 'delete') => void;
}

export default function ActionSelection({ onActionSelect }: ActionSelectionProps) {
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      color: '#ffffff' 
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          Disable or Delete Organization
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Choose an action for your organization
        </Typography>
      </Box>

      {/* Action Selection */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 4 }, 
        maxWidth: 800 
      }}>
        {/* Disable Option */}
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1,
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: '#f59e0b',
            transform: 'translateY(-2px)'
          }
        }} onClick={() => onActionSelect('disable')}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <Block sx={{ 
                color: '#f59e0b', 
                fontSize: { xs: '1.75rem', sm: '2rem' }
              }} />
              <Typography 
                variant="h5" 
                fontWeight={600} 
                sx={{ 
                  color: '#ffffff',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Disable Organization
              </Typography>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#94a3b8', 
                mb: 3,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Temporarily suspend your organization while preserving all data.
            </Typography>
            
            <List sx={{ py: { xs: 1, sm: 0 } }}>
              <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                <ListItemIcon sx={{ minWidth: { xs: '32px', sm: '40px' } }}>
                  <CheckCircle sx={{ 
                    color: '#10b981', 
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Data preserved for 30 days"
                  primaryTypographyProps={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                <ListItemIcon sx={{ minWidth: { xs: '32px', sm: '40px' } }}>
                  <CheckCircle sx={{ 
                    color: '#10b981', 
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Can be reactivated anytime"
                  primaryTypographyProps={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                <ListItemIcon sx={{ minWidth: { xs: '32px', sm: '40px' } }}>
                  <CheckCircle sx={{ 
                    color: '#10b981', 
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Members notified automatically"
                  primaryTypographyProps={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                />
              </ListItem>
            </List>
            
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: '#f59e0b',
                '&:hover': {
                  backgroundColor: '#d97706'
                }
              }}
            >
              Choose Disable
            </Button>
          </CardContent>
        </Card>

        {/* Delete Option */}
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1,
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: '#ef4444',
            transform: 'translateY(-2px)'
          }
        }} onClick={() => onActionSelect('delete')}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <Delete sx={{ 
                color: '#ef4444', 
                fontSize: { xs: '1.75rem', sm: '2rem' }
              }} />
              <Typography 
                variant="h5" 
                fontWeight={600} 
                sx={{ 
                  color: '#ffffff',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Delete Organization
              </Typography>
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#94a3b8', 
                mb: 3,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Permanently delete your organization and all associated data.
            </Typography>
            
            <List sx={{ py: { xs: 1, sm: 0 } }}>
              <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                <ListItemIcon sx={{ minWidth: { xs: '32px', sm: '40px' } }}>
                  <Warning sx={{ 
                    color: '#ef4444', 
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="All data permanently deleted"
                  primaryTypographyProps={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                <ListItemIcon sx={{ minWidth: { xs: '32px', sm: '40px' } }}>
                  <Warning sx={{ 
                    color: '#ef4444', 
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="Cannot be undone or recovered"
                  primaryTypographyProps={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                />
              </ListItem>
              <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 1 } }}>
                <ListItemIcon sx={{ minWidth: { xs: '32px', sm: '40px' } }}>
                  <Warning sx={{ 
                    color: '#ef4444', 
                    fontSize: { xs: '1rem', sm: '1.2rem' }
                  }} />
                </ListItemIcon>
                <ListItemText 
                  primary="All subscriptions cancelled"
                  primaryTypographyProps={{ 
                    color: '#ffffff', 
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                />
              </ListItem>
            </List>
            
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: '#ef4444',
                '&:hover': {
                  backgroundColor: '#dc2626'
                }
              }}
            >
              Choose Delete
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
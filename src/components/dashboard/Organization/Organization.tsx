'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider
} from '@mui/material';
import {
  Business,
  People,
  Settings,
  Add,
  SwapHoriz
} from '@mui/icons-material';

export default function Organization() {
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      color: '#ffffff',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
            wordBreak: 'break-word'
          }}
        >
          Organization Management
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Manage your organizations, teams, and settings
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ width: '100%', maxWidth: '100%' }}>
          <Card sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            width: '100%',
            maxWidth: '100%',
            '&:hover': {
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                    Active Organizations
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                    3
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: '#334155', color: '#94a3b8' }}>
                  <Business />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ width: '100%', maxWidth: '100%' }}>
          <Card sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            width: '100%',
            maxWidth: '100%',
            '&:hover': {
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                    Total Members
                  </Typography>
                  <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                    24
                  </Typography>
                </Box>
                <Avatar sx={{ backgroundColor: '#334155', color: '#94a3b8' }}>
                  <People />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Current Organization */}
      <Card sx={{ 
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        mb: { xs: 3, md: 4 },
        width: '100%',
        maxWidth: '100%'
      }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            justifyContent: 'space-between', 
            mb: 3,
            gap: { xs: 2, sm: 0 }
          }}>
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                color: '#ffffff',
                fontSize: { xs: '1.125rem', md: '1.25rem' }
              }}
            >
              Current Organization
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 2 },
              width: { xs: '100%', sm: 'auto' }
            }}>
              <Button
                variant="outlined"
                startIcon={<SwapHoriz />}
                sx={{
                  borderColor: '#475569',
                  color: '#ffffff',
                  width: { xs: '100%', sm: 'auto' },
                  fontSize: { xs: '0.875rem', md: '0.875rem' },
                  '&:hover': {
                    borderColor: '#94a3b8',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Switch
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  backgroundColor: '#3b82f6',
                  width: { xs: '100%', sm: 'auto' },
                  fontSize: { xs: '0.875rem', md: '0.875rem' },
                  '&:hover': {
                    backgroundColor: '#2563eb'
                  }
                }}
              >
                Create New
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' }, 
            gap: { xs: 2, sm: 3 },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Avatar sx={{ 
              width: { xs: 50, sm: 60 }, 
              height: { xs: 50, sm: 60 }, 
              backgroundColor: '#3b82f6', 
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}>
              AB
            </Avatar>
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                sx={{ 
                  color: '#ffffff',
                  fontSize: { xs: '1.125rem', md: '1.25rem' },
                  wordBreak: 'break-word'
                }}
              >
                AgencyBoost Inc.
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#94a3b8', 
                  mb: 1,
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
              >
                Primary Organization
              </Typography>
              <Chip
                label="Owner"
                size="small"
                sx={{
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontWeight: 500,
                  fontSize: { xs: '0.6875rem', md: '0.75rem' }
                }}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card sx={{ 
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        width: '100%',
        maxWidth: '100%'
      }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 3,
              fontSize: { xs: '1.125rem', md: '1.25rem' }
            }}
          >
            Recent Activity
          </Typography>
          
          <List>
            <ListItem sx={{ 
              px: 0,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 0 }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ 
                  backgroundColor: '#334155', 
                  color: '#94a3b8',
                  width: { xs: 35, sm: 40 },
                  height: { xs: 35, sm: 40 }
                }}>
                  <People sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="New member added"
                secondary="John Doe joined AgencyBoost Inc."
                primaryTypographyProps={{ 
                  color: '#ffffff',
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
                secondaryTypographyProps={{ 
                  color: '#94a3b8',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
                sx={{ flex: 1, minWidth: 0 }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94a3b8',
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  alignSelf: { xs: 'flex-end', sm: 'center' }
                }}
              >
                2 hours ago
              </Typography>
            </ListItem>
            
            <Divider sx={{ backgroundColor: '#334155', my: 1 }} />
            
            <ListItem sx={{ 
              px: 0,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 0 }
            }}>
              <ListItemAvatar>
                <Avatar sx={{ 
                  backgroundColor: '#334155', 
                  color: '#94a3b8',
                  width: { xs: 35, sm: 40 },
                  height: { xs: 35, sm: 40 }
                }}>
                  <Settings sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Organization settings updated"
                secondary="Billing information was modified"
                primaryTypographyProps={{ 
                  color: '#ffffff',
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
                secondaryTypographyProps={{ 
                  color: '#94a3b8',
                  fontSize: { xs: '0.75rem', md: '0.875rem' }
                }}
                sx={{ flex: 1, minWidth: 0 }}
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94a3b8',
                  fontSize: { xs: '0.6875rem', md: '0.75rem' },
                  whiteSpace: { xs: 'normal', sm: 'nowrap' },
                  alignSelf: { xs: 'flex-end', sm: 'center' }
                }}
              >
                1 day ago
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
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
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Organization Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage your organizations, teams, and settings
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
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
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
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
        mb: 4
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
              Current Organization
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<SwapHoriz />}
                sx={{
                  borderColor: '#475569',
                  color: '#ffffff',
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
                  '&:hover': {
                    backgroundColor: '#2563eb'
                  }
                }}
              >
                Create New
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar sx={{ width: 60, height: 60, backgroundColor: '#3b82f6', fontSize: '1.5rem' }}>
              AB
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                AgencyBoost Inc.
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                Primary Organization
              </Typography>
              <Chip
                label="Owner"
                size="small"
                sx={{
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  fontWeight: 500
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
        boxShadow: 'none'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
            Recent Activity
          </Typography>
          
          <List>
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#334155', color: '#94a3b8' }}>
                  <People />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="New member added"
                secondary="John Doe joined AgencyBoost Inc."
                primaryTypographyProps={{ color: '#ffffff' }}
                secondaryTypographyProps={{ color: '#94a3b8' }}
              />
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                2 hours ago
              </Typography>
            </ListItem>
            
            <Divider sx={{ backgroundColor: '#334155', my: 1 }} />
            
            <ListItem sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: '#334155', color: '#94a3b8' }}>
                  <Settings />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Organization settings updated"
                secondary="Billing information was modified"
                primaryTypographyProps={{ color: '#ffffff' }}
                secondaryTypographyProps={{ color: '#94a3b8' }}
              />
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                1 day ago
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
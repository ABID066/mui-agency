'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Avatar
} from '@mui/material';
import {
  Support as SupportIcon,
  PriorityHigh,
  Schedule,
  CheckCircle
} from '@mui/icons-material';

export default function SupportStats() {
  const stats = defaultSupportStats;
  return (
    <Grid 
      container 
      spacing={{ xs: 2, sm: 3 }} 
      sx={{ 
        mb: { xs: 3, sm: 4 },
        width: '100%',
        maxWidth: '100%',
        margin: 0
      }}
    >
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ 
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none',
              width: '100%',
              maxWidth: '100%',
              '&:hover': {
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)'
              }
            }}>
              <CardContent sx={{
                padding: { xs: '12px', sm: '16px' },
                '&:last-child': {
                  paddingBottom: { xs: '12px', sm: '16px' }
                }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  width: '100%',
                  maxWidth: '100%'
                }}>
                  <Box sx={{
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden'
                  }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#94a3b8', 
                        mb: 1,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      fontWeight={700} 
                      sx={{ 
                        color: '#ffffff',
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ 
                    backgroundColor: '#475569', 
                    color: '#94a3b8',
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 },
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    ml: 1
                  }}>
                    <IconComponent sx={{ fontSize: 'inherit' }} />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

const defaultSupportStats = [
  { title: 'Open Tickets', value: '23', icon: SupportIcon },
  { title: 'In Progress', value: '8', icon: Schedule },
  { title: 'Resolved Today', value: '12', icon: CheckCircle },
  { title: 'Avg Response Time', value: '2.5h', icon: PriorityHigh }
];
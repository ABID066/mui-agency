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
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ 
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ backgroundColor: '#475569', color: '#94a3b8' }}>
                    <IconComponent />
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
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
import { defaultUserStats } from './utils';

export default function UserStats() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {defaultUserStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
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
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ backgroundColor: '#334155', color: '#94a3b8' }}>
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
'use client';

import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Analytics,
  Event
} from '@mui/icons-material';

interface StatItem {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType;
  subtitle: string;
}

interface StatsCardsProps {
  stats: StatItem[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => {
        
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card sx={{ 
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#334155',
                borderColor: '#475569'
              }
            }}>
              <CardContent>
                <Box>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mr: 1 }}>
                      {stat.value}
                    </Typography>
                    {stat.change && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {stat.trend === 'up' ? (
                          <TrendingUp sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />
                        ) : (
                          <TrendingDown sx={{ fontSize: 16, color: '#ef4444', mr: 0.5 }} />
                        )}
                        <Typography variant="body2" sx={{ color: stat.trend === 'up' ? '#10b981' : '#ef4444' }}>
                          {stat.change}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    {stat.subtitle}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

// Export the stats data
export const statsData: StatItem[] = [
  { title: 'Users', value: '325', change: '+26%', trend: 'up', icon: People, subtitle: 'Last 30 days' },
  { title: 'Conversions', value: '325', change: '-8%', trend: 'down', icon: Analytics, subtitle: 'Last 30 days' },
  { title: 'Event count', value: '200K', change: '+3%', trend: 'up', icon: Event, subtitle: 'Last 30 days' },
];
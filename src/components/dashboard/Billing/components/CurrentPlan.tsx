'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CheckCircle, Upgrade } from '@mui/icons-material';

export default function CurrentPlan() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        mb: 4,
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        borderRadius: 2,
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 0 }
      }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              Subscription Plan
            </Typography>
            <Chip
              icon={<CheckCircle sx={{ fontSize: 16 }} />}
              label="Pro"
              sx={{
                backgroundColor: '#059669',
                color: '#ffffff',
                fontWeight: 'bold',
                '& .MuiChip-icon': {
                  color: '#ffffff'
                }
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#94a3b8',
                mb: 0.5
              }}
            >
              Billed monthly, next billing date
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold'
              }}
            >
              2025/07/27
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle sx={{ color: '#059669', fontSize: 20 }} />
            <Typography
              variant="body2"
              sx={{ color: '#94a3b8' }}
            >
              Subscribed and Active
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          startIcon={<Upgrade />}
          sx={{
            borderColor: '#3b82f6',
            color: '#3b82f6',
            '&:hover': {
              borderColor: '#2563eb',
              backgroundColor: 'rgba(59, 130, 246, 0.1)'
            },
            minWidth: { xs: '100%', md: 'auto' },
            py: 1.5,
            px: 3
          }}
        >
          View Plans & Features
        </Button>
      </Box>
    </Paper>
  );
}
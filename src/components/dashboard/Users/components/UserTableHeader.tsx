'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import {
  FilterList,
  PersonAdd
} from '@mui/icons-material';

interface UserTableHeaderProps {
  onAddUser: () => void;
}

export default function UserTableHeader({ onAddUser }: UserTableHeaderProps) {
  return (
    <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' }, 
        justifyContent: 'space-between', 
        gap: { xs: 2, sm: 0 },
        mb: 3 
      }}>
        <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', textAlign: { xs: 'center', sm: 'left' } }}>
          All Users
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2 
        }}>
          <Button
          variant="outlined"
          startIcon={<FilterList />}
          sx={{
            borderColor: '#475569',
            color: '#ffffff',
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              borderColor: '#64748b',
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        >
          Filter
        </Button>
        
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={onAddUser}
          sx={{
            backgroundColor: '#3b82f6',
            width: { xs: '100%', sm: 'auto' },
            '&:hover': {
              backgroundColor: '#2563eb'
            }
          }}
        >
          Add User
        </Button>
        </Box>
      </Box>
    </Box>
  );
}
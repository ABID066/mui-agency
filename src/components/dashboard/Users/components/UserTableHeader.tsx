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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
          All Users
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              borderColor: '#475569',
              color: '#ffffff',
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
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
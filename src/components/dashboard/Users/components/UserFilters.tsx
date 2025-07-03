'use client';

import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface UserFiltersProps {
  searchTerm: string;
  statusFilter: string;
  roleFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
}

export default function UserFilters({
  searchTerm,
  statusFilter,
  roleFilter,
  onSearchChange,
  onStatusFilterChange,
  onRoleFilterChange
}: UserFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        placeholder="Search users..."
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#6b7280' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#0f172a',
            color: '#ffffff',
            '& fieldset': {
              borderColor: '#475569',
            },
            '&:hover fieldset': {
              borderColor: '#64748b',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94a3b8'
          },
          '& .MuiInputBase-input': {
            color: '#ffffff'
          }
        }}
      />
      <FormControl 
        size="small" 
        sx={{ 
          minWidth: 120, 
          '& .MuiInputLabel-root': { color: '#94a3b8' }, 
          '& .MuiOutlinedInput-root': { 
            color: '#ffffff', 
            '& fieldset': { borderColor: '#475569' }, 
            '&:hover fieldset': { borderColor: '#64748b' }, 
            '&.Mui-focused fieldset': { borderColor: '#3b82f6' } 
          } 
        }}
      >
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => onStatusFilterChange(e.target.value)}
          sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#94a3b8' } }}
          MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', border: '1px solid #334155' } } }}
        >
          <MenuItem sx={{ color: '#ffffff' }} value="all">All Status</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="active">Active</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="inactive">Inactive</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="pending">Pending</MenuItem>
        </Select>
      </FormControl>
      <FormControl 
        size="small" 
        sx={{ 
          minWidth: 120, 
          '& .MuiInputLabel-root': { color: '#94a3b8' }, 
          '& .MuiOutlinedInput-root': { 
            color: '#ffffff', 
            '& fieldset': { borderColor: '#475569' }, 
            '&:hover fieldset': { borderColor: '#64748b' }, 
            '&.Mui-focused fieldset': { borderColor: '#3b82f6' } 
          } 
        }}
      >
        <InputLabel>Role</InputLabel>
        <Select
          value={roleFilter}
          label="Role"
          onChange={(e) => onRoleFilterChange(e.target.value)}
          sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#94a3b8' } }}
          MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', border: '1px solid #334155' } } }}
        >
          <MenuItem sx={{ color: '#ffffff' }} value="all">All Roles</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="admin">Admin</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="manager">Manager</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="developer">Developer</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="designer">Designer</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="analyst">Analyst</MenuItem>
          <MenuItem sx={{ color: '#ffffff' }} value="support">Support</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
'use client';

import React from 'react';
import {
  Menu,
  MenuItem
} from '@mui/material';

interface UserActionMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export default function UserActionMenu({ anchorEl, open, onClose }: UserActionMenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <MenuItem onClick={onClose} sx={{ color: '#ffffff' }}>View Profile</MenuItem>
      <MenuItem onClick={onClose} sx={{ color: '#ffffff' }}>Edit User</MenuItem>
      <MenuItem onClick={onClose} sx={{ color: '#ffffff' }}>Change Role</MenuItem>
      <MenuItem onClick={onClose} sx={{ color: '#ffffff' }}>Reset Password</MenuItem>
      <MenuItem onClick={onClose} sx={{ color: '#ffffff' }}>Deactivate</MenuItem>
      <MenuItem onClick={onClose} sx={{ color: '#ef4444' }}>Delete User</MenuItem>
    </Menu>
  );
}
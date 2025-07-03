'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddUserDialog({ open, onClose }: AddUserDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      PaperProps={{ sx: { backgroundColor: '#1e293b', color: '#ffffff' } }}
    >
      <DialogTitle sx={{ color: '#ffffff' }}>Add New User</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#64748b' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#64748b' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Phone Number"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  '& fieldset': { borderColor: '#475569' },
                  '&:hover fieldset': { borderColor: '#64748b' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                },
                '& .MuiInputLabel-root': { color: '#94a3b8' }
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl 
              fullWidth 
              sx={{ 
                '& .MuiInputLabel-root': { color: '#94a3b8' }, 
                '& .MuiOutlinedInput-root': { 
                  color: '#ffffff', 
                  '& fieldset': { borderColor: '#475569' }, 
                  '&:hover fieldset': { borderColor: '#64748b' }, 
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' } 
                } 
              }}
            >
              <InputLabel>Department</InputLabel>
              <Select 
                label="Department" 
                sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#ffffff' } }} 
                MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', border: '1px solid #334155' } } }}
              >
                <MenuItem sx={{ color: '#ffffff' }} value="engineering">Engineering</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="design">Design</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="operations">Operations</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="analytics">Analytics</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="support">Support</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl 
              fullWidth 
              sx={{ 
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
                label="Role" 
                sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#ffffff' } }} 
                MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', border: '1px solid #334155' } } }}
              >
                <MenuItem sx={{ color: '#ffffff' }} value="developer">Developer</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="designer">Designer</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="analyst">Analyst</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="support">Support</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="manager">Manager</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl 
              fullWidth 
              sx={{ 
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
                label="Status" 
                defaultValue="active" 
                sx={{ color: '#ffffff', '& .MuiSvgIcon-root': { color: '#ffffff' } }} 
                MenuProps={{ PaperProps: { sx: { backgroundColor: '#1e293b', border: '1px solid #334155' } } }}
              >
                <MenuItem sx={{ color: '#ffffff' }} value="active">Active</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="inactive">Inactive</MenuItem>
                <MenuItem sx={{ color: '#ffffff' }} value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch 
                  defaultChecked 
                  sx={{ 
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#3b82f6' }, 
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#3b82f6' } 
                  }} 
                />
              }
              label="Send welcome email to user"
              sx={{ color: '#ffffff' }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControlLabel
              control={
                <Switch 
                  sx={{ 
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#3b82f6' }, 
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#3b82f6' } 
                  }} 
                />
              }
              label="Grant admin privileges"
              sx={{ color: '#ffffff' }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#94a3b8' }}>
          Cancel
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained"
          sx={{
            backgroundColor: '#3b82f6',
            '&:hover': {
              backgroundColor: '#2563eb'
            }
          }}
        >
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}
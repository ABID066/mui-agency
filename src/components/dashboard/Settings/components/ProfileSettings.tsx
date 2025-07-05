'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Upload,
  Delete
} from '@mui/icons-material';

interface ProfileData {
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  avatar: string;
  lastLogin: string;
  accountCreated: string;
}

interface ProfileSettingsProps {
  profile: ProfileData;
  onProfileChange: (field: string, value: string) => void;
  onSaveProfile: () => void;
  onCancelProfile: () => void;
  onUploadAvatar: () => void;
  onRemoveAvatar: () => void;
}

export default function ProfileSettings({
  profile,
  onProfileChange,
  onSaveProfile,
  onCancelProfile,
  onUploadAvatar,
  onRemoveAvatar
}: ProfileSettingsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
            Profile Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Full Name"
                fullWidth
                value={profile.name}
                onChange={(e) => onProfileChange('name', e.target.value)}
                variant="outlined"
                sx={{
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
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email Address"
                fullWidth
                value={profile.email}
                onChange={(e) => onProfileChange('email', e.target.value)}
                variant="outlined"
                type="email"
                sx={{
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
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone Number"
                fullWidth
                value={profile.phone}
                onChange={(e) => onProfileChange('phone', e.target.value)}
                variant="outlined"
                sx={{
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
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Department"
                fullWidth
                value={profile.department}
                onChange={(e) => onProfileChange('department', e.target.value)}
                variant="outlined"
                sx={{
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
                  }
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                '& .MuiButton-root': {
                  width: isMobile ? '100%' : 'auto'
                }
              }}>
                <Button
                  variant="contained"
                  onClick={onSaveProfile}
                  sx={{
                    backgroundColor: '#3b82f6',
                    '&:hover': {
                      backgroundColor: '#2563eb'
                    }
                  }}
                >
                  Save Changes
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={onCancelProfile}
                  sx={{ color: '#94a3b8', borderColor: '#475569', '&:hover': { borderColor: '#64748b' } }}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Profile Picture */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
            Profile Picture
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                backgroundColor: '#334155',
                color: '#94a3b8',
                fontSize: '2rem'
              }}
            >
              {profile.avatar}
            </Avatar>
            <Box sx={{ 
              display: 'flex', 
              gap: 1,
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : 'auto'
            }}>
              <Button
                variant="outlined"
                size={isMobile ? 'medium' : 'small'}
                startIcon={<Upload />}
                onClick={onUploadAvatar}
                sx={{ 
                  color: '#94a3b8', 
                  borderColor: '#475569', 
                  '&:hover': { borderColor: '#64748b' },
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                Upload
              </Button>
              <Button
                variant="outlined"
                size={isMobile ? 'medium' : 'small'}
                startIcon={<Delete />}
                onClick={onRemoveAvatar}
                sx={{ 
                  color: '#dc2626', 
                  borderColor: '#fca5a5',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
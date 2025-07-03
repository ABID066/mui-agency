'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Security,
  Smartphone,
  VpnKey,
  Key,
  Edit,
  Delete,
  Add
} from '@mui/icons-material';

interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: boolean;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'inactive';
}

interface SecuritySettingsProps {
  security: SecurityData;
  apiKeys: ApiKey[];
  onSecurityChange: (field: string, value: string | boolean) => void;
  onChangePassword: () => void;
  onEnable2FA: () => void;
  onDisable2FA: () => void;
  onGenerateApiKey: () => void;
  onEditApiKey: (id: string) => void;
  onDeleteApiKey: (id: string) => void;
}

export default function SecuritySettings({
  security,
  apiKeys,
  onSecurityChange,
  onChangePassword,
  onEnable2FA,
  onDisable2FA,
  onGenerateApiKey,
  onEditApiKey,
  onDeleteApiKey
}: SecuritySettingsProps) {
  return (
    <Box sx={{p: 3 }}>
      <Grid container spacing={4}>
        {/* Password Change */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <VpnKey sx={{ color: '#3b82f6' }} />
            Change Password
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={security.currentPassword}
                onChange={(e) => onSecurityChange('currentPassword', e.target.value)}
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
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={security.newPassword}
                onChange={(e) => onSecurityChange('newPassword', e.target.value)}
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
              <TextField
                label="Confirm New Password"
                type="password"
                fullWidth
                value={security.confirmPassword}
                onChange={(e) => onSecurityChange('confirmPassword', e.target.value)}
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
              <Button
                variant="contained"
                onClick={onChangePassword}
                sx={{
                  backgroundColor: '#3b82f6',
                  '&:hover': {
                    backgroundColor: '#2563eb'
                  }
                }}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
          
          {/* Last changed info */}
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 2 }}>
            Last changed: 2024-01-15
          </Typography>
        </Grid>

        {/* Security Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security sx={{ color: '#3b82f6' }} />
            Security Preferences
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Two-Factor Authentication */}
            <Box sx={{ p: 3, backgroundColor: '#0f172a', borderRadius: 2, border: '1px solid #475569' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Smartphone sx={{ color: '#3b82f6' }} />
                  <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Two-Factor Authentication
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={security.twoFactorEnabled}
                      onChange={(e) => onSecurityChange('twoFactorEnabled', e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#3b82f6',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#3b82f6',
                        },
                      }}
                    />
                  }
                  label=""
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                Add an extra layer of security to your account with two-factor authentication.
              </Typography>
              {security.twoFactorEnabled ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onDisable2FA}
                  sx={{ color: '#dc2626', borderColor: '#fca5a5' }}
                >
                  Disable 2FA
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onEnable2FA}
                  sx={{ color: '#94a3b8', borderColor: '#475569', '&:hover': { borderColor: '#64748b' } }}
                >
                  Setup 2FA
                </Button>
              )}
            </Box>

            {/* Login Alerts */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Login Alerts
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Get notified when someone logs into your account
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={security.loginAlerts}
                    onChange={(e) => onSecurityChange('loginAlerts', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6',
                      },
                    }}
                  />
                }
                label=""
              />
            </Box>

            {/* Session Timeout */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Auto Session Timeout
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Automatically log out after 30 minutes of inactivity
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={security.sessionTimeout}
                    onChange={(e) => onSecurityChange('sessionTimeout', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6',
                      },
                    }}
                  />
                }
                label=""
              />
            </Box>
          </Box>
        </Grid>
        
        {/* API Keys Section */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Key sx={{ color: '#3b82f6' }} />
            API Keys
          </Typography>
          
          <TableContainer 
            component={Paper} 
            sx={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #475569',
              borderRadius: 2
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>Name</TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>Key</TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>Created</TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>Last Used</TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>Status</TableCell>
                  <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell sx={{ color: '#ffffff', borderBottom: '1px solid #475569' }}>
                      {apiKey.name}
                    </TableCell>
                    <TableCell sx={{ color: '#ffffff', borderBottom: '1px solid #475569' }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {apiKey.key}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>
                      {apiKey.created}
                    </TableCell>
                    <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #475569' }}>
                      {apiKey.lastUsed}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                      <Chip
                        label={apiKey.status}
                        size="small"
                        sx={{
                          backgroundColor: apiKey.status === 'active' ? '#16a34a' : '#6b7280',
                          color: '#ffffff',
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEditApiKey(apiKey.id)}
                            sx={{ color: '#3b82f6' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDeleteApiKey(apiKey.id)}
                            sx={{ color: '#dc2626' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={onGenerateApiKey}
            sx={{
              mt: 2,
              color: '#94a3b8',
              borderColor: '#475569',
              '&:hover': {
                borderColor: '#64748b',
                backgroundColor: 'rgba(59, 130, 246, 0.1)'
              }
            }}
          >
            Generate New API Key
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
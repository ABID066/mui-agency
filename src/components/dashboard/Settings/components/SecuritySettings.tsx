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
  Tooltip,
  useTheme,
  useMediaQuery
} from '@mui/material';
//import Grid from '@mui/material/Grid2';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{
      p: { xs: 2, sm: 3, md: 3 },
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Grid container spacing={4}>
        {/* Password Change */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}
          >
            <VpnKey sx={{ color: '#3b82f6', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
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
                    fontSize: { xs: '0.875rem', md: '1rem' },
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
                    color: '#94a3b8',
                    fontSize: { xs: '0.875rem', md: '1rem' }
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
                  },
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  padding: { xs: '8px 16px', md: '10px 20px' },
                  width: { xs: '100%', sm: 'auto' }
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
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}
          >
            <Security sx={{ color: '#3b82f6', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
            Security Preferences
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Two-Factor Authentication */}
            <Box sx={{ 
              p: { xs: 2, sm: 3 }, 
              backgroundColor: '#0f172a', 
              borderRadius: 2, 
              border: '1px solid #475569',
              width: '100%',
              maxWidth: '100%'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Smartphone sx={{ color: '#3b82f6', fontSize: { xs: '1.125rem', md: '1.25rem' } }} />
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
                    }}
                  >
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
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#94a3b8', 
                  mb: 2,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                Add an extra layer of security to your account with two-factor authentication.
              </Typography>
              {security.twoFactorEnabled ? (
                <Button
                  variant="outlined"
                  onClick={onDisable2FA}
                  sx={{ 
                    color: '#dc2626', 
                    borderColor: '#fca5a5',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    width: { xs: '100%', sm: 'auto' },
                    padding: { xs: '8px 16px', sm: '6px 12px' }
                  }}
                >
                  Disable 2FA
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={onEnable2FA}
                  sx={{ 
                    color: '#94a3b8', 
                    borderColor: '#475569', 
                    '&:hover': { borderColor: '#64748b' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    width: { xs: '100%', sm: 'auto' },
                    padding: { xs: '8px 16px', sm: '6px 12px' }
                  }}
                >
                  Setup 2FA
                </Button>
              )}
            </Box>

            {/* Login Alerts */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
              width: '100%'
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
                  }}
                >
                  Login Alerts
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
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
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
              width: '100%'
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
                  }}
                >
                  Auto Session Timeout
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
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
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 3, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}
          >
            <Key sx={{ color: '#3b82f6', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
            API Keys
          </Typography>
          
          <TableContainer 
            component={Paper} 
            sx={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #475569',
              borderRadius: 2,
              width: '100%',
              maxWidth: '100%',
              overflow: 'auto'
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ 
                    color: '#94a3b8', 
                    borderBottom: '1px solid #475569',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '8px 4px', sm: '16px' }
                  }}>Name</TableCell>
                  <TableCell sx={{ 
                    color: '#94a3b8', 
                    borderBottom: '1px solid #475569',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '8px 4px', sm: '16px' },
                    display: { xs: 'none', sm: 'table-cell' }
                  }}>Key</TableCell>
                  <TableCell sx={{ 
                    color: '#94a3b8', 
                    borderBottom: '1px solid #475569',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '8px 4px', sm: '16px' },
                    display: { xs: 'none', md: 'table-cell' }
                  }}>Created</TableCell>
                  <TableCell sx={{ 
                    color: '#94a3b8', 
                    borderBottom: '1px solid #475569',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '8px 4px', sm: '16px' },
                    display: { xs: 'none', md: 'table-cell' }
                  }}>Last Used</TableCell>
                  <TableCell sx={{ 
                    color: '#94a3b8', 
                    borderBottom: '1px solid #475569',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '8px 4px', sm: '16px' }
                  }}>Status</TableCell>
                  <TableCell sx={{ 
                    color: '#94a3b8', 
                    borderBottom: '1px solid #475569',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    padding: { xs: '8px 4px', sm: '16px' }
                  }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell sx={{ 
                      color: '#ffffff', 
                      borderBottom: '1px solid #475569',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      padding: { xs: '8px 4px', sm: '16px' }
                    }}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                          {apiKey.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontFamily: 'monospace',
                            color: '#94a3b8',
                            display: { xs: 'block', sm: 'none' },
                            fontSize: '0.625rem'
                          }}
                        >
                          {apiKey.key}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#ffffff', 
                      borderBottom: '1px solid #475569',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      padding: { xs: '8px 4px', sm: '16px' },
                      display: { xs: 'none', sm: 'table-cell' }
                    }}>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: { sm: '0.75rem', md: '0.875rem' } }}>
                        {apiKey.key}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#94a3b8', 
                      borderBottom: '1px solid #475569',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      padding: { xs: '8px 4px', sm: '16px' },
                      display: { xs: 'none', md: 'table-cell' }
                    }}>
                      {apiKey.created}
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#94a3b8', 
                      borderBottom: '1px solid #475569',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      padding: { xs: '8px 4px', sm: '16px' },
                      display: { xs: 'none', md: 'table-cell' }
                    }}>
                      {apiKey.lastUsed}
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: '1px solid #475569',
                      padding: { xs: '8px 4px', sm: '16px' }
                    }}>
                      <Chip
                        label={apiKey.status}
                        size="small"
                        sx={{
                          backgroundColor: apiKey.status === 'active' ? '#16a34a' : '#6b7280',
                          color: '#ffffff',
                          fontSize: { xs: '0.625rem', sm: '0.75rem' },
                          height: { xs: '20px', sm: '24px' }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ 
                      borderBottom: '1px solid #475569',
                      padding: { xs: '8px 4px', sm: '16px' }
                    }}>
                      <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 } }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => onEditApiKey(apiKey.id)}
                            sx={{ 
                              color: '#3b82f6',
                              padding: { xs: '4px', sm: '8px' }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => onDeleteApiKey(apiKey.id)}
                            sx={{ 
                              color: '#dc2626',
                              padding: { xs: '4px', sm: '8px' }
                            }}
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
              },
              fontSize: { xs: '0.875rem', md: '1rem' },
              padding: { xs: '8px 16px', md: '10px 20px' },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Generate New API Key
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
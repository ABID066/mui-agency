'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Settings,
  Security,
  Notifications,
  Business,
  Warning,
  Delete,
  Block
} from '@mui/icons-material';

interface OrgSettings {
  name: string;
  description: string;
  website: string;
  industry: string;
  size: string;
  timezone: string;
  language: string;
  theme: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactor: boolean;
    ssoEnabled: boolean;
    passwordPolicy: string;
  };
  privacy: {
    dataRetention: string;
    analytics: boolean;
    thirdPartySharing: boolean;
  };
}

const initialSettings: OrgSettings = {
  name: 'AgencyBoost',
  description: 'A leading digital marketing agency focused on growth and innovation.',
  website: 'https://agencyboost.com',
  industry: 'Marketing & Advertising',
  size: '50-100 employees',
  timezone: 'UTC-5 (Eastern Time)',
  language: 'English',
  theme: 'Dark',
  notifications: {
    email: true,
    push: true,
    sms: false
  },
  security: {
    twoFactor: true,
    ssoEnabled: false,
    passwordPolicy: 'Strong'
  },
  privacy: {
    dataRetention: '2 years',
    analytics: true,
    thirdPartySharing: false
  }
};

export default function OrgSettings() {
  const [settings, setSettings] = useState<OrgSettings>(initialSettings);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (section: keyof OrgSettings, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    setHasChanges(false);
  };

  const handleResetSettings = () => {
    setSettings(initialSettings);
    setHasChanges(false);
  };

  const handleDisableOrg = async () => {
    if (confirmText !== 'DISABLE') return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowDisableDialog(false);
    setConfirmText('');
  };

  const handleDeleteOrg = async () => {
    if (confirmText !== 'DELETE PERMANENTLY') return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowDeleteDialog(false);
    setConfirmText('');
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Organization Settings
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage your organization preferences and configurations
        </Typography>
      </Box>

      {/* Save Changes Alert */}
      {hasChanges && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            backgroundColor: '#1e293b',
            border: '1px solid #3b82f6',
            color: '#ffffff',
            '& .MuiAlert-icon': {
              color: '#3b82f6'
            }
          }}
          action={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                onClick={handleResetSettings}
                sx={{ color: '#94a3b8' }}
              >
                Reset
              </Button>
              <Button 
                size="small" 
                variant="contained"
                onClick={handleSaveSettings}
                disabled={saving}
                sx={{
                  backgroundColor: '#3b82f6',
                  '&:hover': {
                    backgroundColor: '#2563eb'
                  }
                }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          }
        >
          You have unsaved changes
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Basic Information */}
        <Grid  sx={{  xs:12, md:6}}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Business sx={{ color: '#3b82f6' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                  Basic Information
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                  label="Organization Name"
                  value={settings.name}
                  onChange={(e) => handleSettingChange('name', '', e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
                
                <TextField
                  label="Description"
                  value={settings.description}
                  onChange={(e) => handleSettingChange('description', '', e.target.value)}
                  multiline
                  rows={3}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
                
                <TextField
                  label="Website"
                  value={settings.website}
                  onChange={(e) => handleSettingChange('website', '', e.target.value)}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& fieldset': {
                        borderColor: '#334155'
                      },
                      '&:hover fieldset': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#94a3b8'
                    }
                  }}
                />
                
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#94a3b8' }}>Industry</InputLabel>
                  <Select
                    value={settings.industry}
                    onChange={(e) => handleSettingChange('industry', '', e.target.value)}
                    sx={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                  >
                    <MenuItem value="Marketing & Advertising">Marketing & Advertising</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Healthcare">Healthcare</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Preferences */}
        <Grid  sx={{xs:12, md:6}} >
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Settings sx={{ color: '#3b82f6' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                  Preferences
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#94a3b8' }}>Organization Size</InputLabel>
                  <Select
                    value={settings.size}
                    onChange={(e) => handleSettingChange('size', '', e.target.value)}
                    sx={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                  >
                    <MenuItem value="1-10 employees">1-10 employees</MenuItem>
                    <MenuItem value="11-50 employees">11-50 employees</MenuItem>
                    <MenuItem value="50-100 employees">50-100 employees</MenuItem>
                    <MenuItem value="100-500 employees">100-500 employees</MenuItem>
                    <MenuItem value="500+ employees">500+ employees</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#94a3b8' }}>Timezone</InputLabel>
                  <Select
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', '', e.target.value)}
                    sx={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                  >
                    <MenuItem value="UTC-8 (Pacific Time)">UTC-8 (Pacific Time)</MenuItem>
                    <MenuItem value="UTC-7 (Mountain Time)">UTC-7 (Mountain Time)</MenuItem>
                    <MenuItem value="UTC-6 (Central Time)">UTC-6 (Central Time)</MenuItem>
                    <MenuItem value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</MenuItem>
                    <MenuItem value="UTC+0 (GMT)">UTC+0 (GMT)</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#94a3b8' }}>Language</InputLabel>
                  <Select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', '', e.target.value)}
                    sx={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Spanish</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    <MenuItem value="German">German</MenuItem>
                    <MenuItem value="Chinese">Chinese</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#94a3b8' }}>Theme</InputLabel>
                  <Select
                    value={settings.theme}
                    onChange={(e) => handleSettingChange('theme', '', e.target.value)}
                    sx={{
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6'
                      }
                    }}
                  >
                    <MenuItem value="Light">Light</MenuItem>
                    <MenuItem value="Dark">Dark</MenuItem>
                    <MenuItem value="Auto">Auto</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid sx={{xs:12, md:6}}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Notifications sx={{ color: '#3b82f6' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                  Notifications
                </Typography>
              </Box>
              
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6'
                      }
                    }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Push Notifications"
                    secondary="Receive push notifications in browser"
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                  <Switch
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6'
                      }
                    }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="SMS Notifications"
                    secondary="Receive notifications via SMS"
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                  <Switch
                    checked={settings.notifications.sms}
                    onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6'
                      }
                    }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid sx={{xs:12, md:6}}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Security sx={{ color: '#3b82f6' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                  Security
                </Typography>
              </Box>
              
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Two-Factor Authentication"
                    secondary="Require 2FA for all members"
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                  <Switch
                    checked={settings.security.twoFactor}
                    onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6'
                      }
                    }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Single Sign-On (SSO)"
                    secondary="Enable SSO authentication"
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                  <Switch
                    checked={settings.security.ssoEnabled}
                    onChange={(e) => handleSettingChange('security', 'ssoEnabled', e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#3b82f6'
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#3b82f6'
                      }
                    }}
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemText 
                    primary="Password Policy"
                    secondary="Set password requirements"
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#94a3b8' }}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.security.passwordPolicy}
                      onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
                      sx={{
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#334155'
                        }
                      }}
                    >
                      <MenuItem value="Basic">Basic</MenuItem>
                      <MenuItem value="Strong">Strong</MenuItem>
                      <MenuItem value="Very Strong">Very Strong</MenuItem>
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Danger Zone */}
        <Grid sx={{xs:12}}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #ef4444',
            boxShadow: 'none'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Warning sx={{ color: '#ef4444' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ef4444' }}>
                  Danger Zone
                </Typography>
              </Box>
              
              <Alert 
                severity="warning" 
                sx={{ 
                  mb: 3,
                  backgroundColor: '#1e293b',
                  border: '1px solid #f59e0b',
                  color: '#ffffff',
                  '& .MuiAlert-icon': {
                    color: '#f59e0b'
                  }
                }}
              >
                These actions are irreversible. Please proceed with caution.
              </Alert>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<Block />}
                  onClick={() => setShowDisableDialog(true)}
                  sx={{
                    borderColor: '#f59e0b',
                    color: '#f59e0b',
                    '&:hover': {
                      borderColor: '#d97706',
                      backgroundColor: 'rgba(245, 158, 11, 0.1)'
                    }
                  }}
                >
                  Disable Organization
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Delete />}
                  onClick={() => setShowDeleteDialog(true)}
                  sx={{
                    borderColor: '#ef4444',
                    color: '#ef4444',
                    '&:hover': {
                      borderColor: '#dc2626',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }
                  }}
                >
                  Delete Organization
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Disable Organization Dialog */}
      <Dialog
        open={showDisableDialog}
        onClose={() => setShowDisableDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Block sx={{ color: '#f59e0b' }} />
          Disable Organization
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
            Disabling your organization will:
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <Warning sx={{ color: '#f59e0b', fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Suspend all member access"
                primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <Warning sx={{ color: '#f59e0b', fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Pause all active subscriptions"
                primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <Warning sx={{ color: '#f59e0b', fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Preserve data for 30 days"
                primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
              />
            </ListItem>
          </List>
          
          <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
            Type <strong>DISABLE</strong> to confirm:
          </Typography>
          <TextField
            fullWidth
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DISABLE"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0f172a',
                color: '#ffffff',
                '& fieldset': {
                  borderColor: '#334155'
                },
                '&:hover fieldset': {
                  borderColor: '#475569'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#f59e0b'
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowDisableDialog(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleDisableOrg}
            disabled={confirmText !== 'DISABLE'}
            variant="contained"
            sx={{
              backgroundColor: '#f59e0b',
              '&:hover': {
                backgroundColor: '#d97706'
              },
              '&:disabled': {
                backgroundColor: '#374151',
                color: '#6b7280'
              }
            }}
          >
            Disable Organization
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Organization Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Delete sx={{ color: '#ef4444' }} />
          Delete Organization
        </DialogTitle>
        <DialogContent>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              backgroundColor: '#1e293b',
              border: '1px solid #ef4444',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ef4444'
              }
            }}
          >
            This action is permanent and cannot be undone!
          </Alert>
          
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
            Deleting your organization will:
          </Typography>
          <List sx={{ mb: 3 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <Delete sx={{ color: '#ef4444', fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Permanently delete all data"
                primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <Delete sx={{ color: '#ef4444', fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Remove all members immediately"
                primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon>
                <Delete sx={{ color: '#ef4444', fontSize: '1rem' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Cancel all subscriptions"
                primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
              />
            </ListItem>
          </List>
          
          <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
            Type <strong>DELETE PERMANENTLY</strong> to confirm:
          </Typography>
          <TextField
            fullWidth
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE PERMANENTLY"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0f172a',
                color: '#ffffff',
                '& fieldset': {
                  borderColor: '#334155'
                },
                '&:hover fieldset': {
                  borderColor: '#475569'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ef4444'
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowDeleteDialog(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteOrg}
            disabled={confirmText !== 'DELETE PERMANENTLY'}
            variant="contained"
            sx={{
              backgroundColor: '#ef4444',
              '&:hover': {
                backgroundColor: '#dc2626'
              },
              '&:disabled': {
                backgroundColor: '#374151',
                color: '#6b7280'
              }
            }}
          >
            Delete Permanently
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
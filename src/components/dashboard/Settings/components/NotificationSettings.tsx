'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Notifications,
  Email,
  PhoneIphone
} from '@mui/icons-material';

interface NotificationData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  weeklyReports: boolean;
  systemUpdates: boolean;
  taskReminders: boolean;
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
}

interface NotificationSettingsProps {
  notifications: NotificationData;
  onNotificationChange: (field: string, value: boolean | string) => void;
  onSaveNotifications: () => void;
  onTestNotification: () => void;
}

export default function NotificationSettings({
  notifications,
  onNotificationChange,
  onSaveNotifications,
  onTestNotification
}: NotificationSettingsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box sx={{ 
      p: { xs: 0.5, sm: 2, md: 3 }, 
      width: '100%',
      maxWidth: { xs: 'calc(100vw - 16px)', sm: '100%' },
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Grid container spacing={4}>
        {/* General Notifications */}
        <Grid  sx={{  xs: 12, md:6 }} >
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
            }}>
            <Notifications sx={{ color: '#3b82f6' }} />
            General Notifications
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
            {/* Email Notifications */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: '#94a3b8', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                    Email Notifications
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94a3b8',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                    Receive notifications via email
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={(e) => onNotificationChange('emailNotifications', e.target.checked)}
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

            {/* Push Notifications */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIphone sx={{ color: '#94a3b8', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                    Push Notifications
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94a3b8',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                    Receive push notifications on your device
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.pushNotifications}
                    onChange={(e) => onNotificationChange('pushNotifications', e.target.checked)}
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

            {/* SMS Notifications */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIphone sx={{ color: '#94a3b8', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                    SMS Notifications
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94a3b8',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                    Receive important alerts via SMS
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.smsNotifications}
                    onChange={(e) => onNotificationChange('smsNotifications', e.target.checked)}
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

        {/* Specific Notifications */}
        <Grid  sx={{  xs: 12, md:6 }} >
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 3,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}>
            Notification Types
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
            {/* Security Alerts */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                  Security Alerts
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                  Important security-related notifications
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.securityAlerts}
                    onChange={(e) => onNotificationChange('securityAlerts', e.target.checked)}
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

            {/* Task Reminders */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                  Task Reminders
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                  Reminders for upcoming tasks and deadlines
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.taskReminders}
                    onChange={(e) => onNotificationChange('taskReminders', e.target.checked)}
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

            {/* Weekly Reports */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                  Weekly Reports
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                  Weekly summary of your activity
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.weeklyReports}
                    onChange={(e) => onNotificationChange('weeklyReports', e.target.checked)}
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

            {/* System Updates */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                  System Updates
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                  Notifications about system maintenance and updates
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.systemUpdates}
                    onChange={(e) => onNotificationChange('systemUpdates', e.target.checked)}
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

            {/* Marketing Emails */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                  Marketing Emails
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}>
                  Promotional emails and product updates
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.marketingEmails}
                    onChange={(e) => onNotificationChange('marketingEmails', e.target.checked)}
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

        {/* Actions */}
        <Grid  sx={{  xs: 12 }} >
          <Divider sx={{ my: 2, borderColor: '#475569' }} />
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            justifyContent: { xs: 'stretch', sm: 'flex-end' },
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              variant="outlined"
              onClick={onTestNotification}
              sx={{ 
                color: '#94a3b8', 
                borderColor: '#475569', 
                '&:hover': { borderColor: '#64748b' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Send Test Notification
            </Button>
            <Button
              variant="contained"
              onClick={onSaveNotifications}
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: '#2563eb'
                },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  Divider
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
  return (
    <Box sx={{p: 3 }}>
      <Grid container spacing={4}>
        {/* General Notifications */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notifications sx={{ color: '#3b82f6' }} />
            General Notifications
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Email Notifications */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: '#94a3b8' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Email Notifications
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIphone sx={{ color: '#94a3b8' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Push Notifications
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  SMS Notifications
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Receive important alerts via SMS
                </Typography>
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
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
            Notification Types
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Security Alerts */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Security Alerts
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Task Reminders
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Weekly Reports
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  System Updates
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Marketing Emails
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2, borderColor: '#475569' }} />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={onTestNotification}
              sx={{ color: '#94a3b8', borderColor: '#475569', '&:hover': { borderColor: '#64748b' } }}
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
                }
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
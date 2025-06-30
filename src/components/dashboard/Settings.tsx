'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Alert,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  
  Person,
  Security,
  Notifications,
  Palette,
  
  Storage,
  Edit,
  Delete,
  Add,
  Visibility,
  VisibilityOff,
  Download,
  Upload,
  
} from '@mui/icons-material';

// Sample data
const userProfile = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Administrator',
  department: 'IT Department',
  phone: '+1 (555) 123-4567',
  avatar: 'JD',
  lastLogin: '2024-02-15 10:30 AM',
  accountCreated: '2023-01-15'
};

const securitySettings = {
  twoFactorEnabled: true,
  passwordLastChanged: '2024-01-15',
  loginNotifications: true,
  sessionTimeout: 30
};

const notificationSettings = {
  emailNotifications: true,
  pushNotifications: false,
  smsNotifications: true,
  weeklyReports: true,
  securityAlerts: true,
  systemUpdates: false
};

const systemSettings = {
  theme: 'light',
  language: 'en',
  timezone: 'UTC-5',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD'
};

const storageData = {
  used: 2.4,
  total: 10,
  percentage: 24
};

const apiKeys = [
  {
    id: '1',
    name: 'Production API',
    key: 'pk_live_51H...****',
    created: '2024-01-15',
    lastUsed: '2024-02-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Development API',
    key: 'pk_test_51H...****',
    created: '2024-02-01',
    lastUsed: '2024-02-14',
    status: 'active'
  },
  {
    id: '3',
    name: 'Staging API',
    key: 'pk_stage_51H...****',
    created: '2024-01-20',
    lastUsed: '2024-02-10',
    status: 'inactive'
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [profile, setProfile] = useState(userProfile);
  const [security, setSecurity] = useState(securitySettings);
  const [notifications, setNotifications] = useState(notificationSettings);
  const [system, setSystem] = useState(systemSettings);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: boolean | number) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleSystemChange = (field: string, value: string) => {
    setSystem(prev => ({ ...prev, [field]: value }));
  };

  const openConfirmDialog = (type: string) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 1 }}>
          Settings
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Settings Tabs */}
      <Paper sx={{ 
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
        borderRadius: 2
      }}>
        <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              px: 3,
              '& .MuiTab-root': {
                color: '#6b7280',
                '&.Mui-selected': {
                  color: '#000000'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#000000'
              }
            }}
          >
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<Security />} label="Security" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Palette />} label="Appearance" />
            <Tab icon={<Storage />} label="Data & Storage" />
          </Tabs>
        </Box>

        {/* Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3 }}>
            <Grid container spacing={4}>
              {/* Profile Information */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  Profile Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Full Name"
                      fullWidth
                      value={profile.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Email Address"
                      fullWidth
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      variant="outlined"
                      type="email"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Phone Number"
                      fullWidth
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Department"
                      fullWidth
                      value={profile.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#000000',
                          '&:hover': {
                            backgroundColor: '#374151'
                          }
                        }}
                      >
                        Save Changes
                      </Button>
                      <Button variant="outlined" sx={{ color: '#6b7280', borderColor: '#d1d5db' }}>
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Profile Picture */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  Profile Picture
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      fontSize: '2rem'
                    }}
                  >
                    {profile.avatar}
                  </Avatar>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Upload />}
                      sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                    >
                      Upload
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Delete />}
                      sx={{ color: '#dc2626', borderColor: '#fca5a5' }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3 }}>
            <Grid container spacing={4}>
              {/* Password */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  Password
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Current Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#000000',
                      '&:hover': {
                        backgroundColor: '#374151'
                      }
                    }}
                  >
                    Update Password
                  </Button>
                  <Typography variant="caption" sx={{ color: '#6b7280' }}>
                    Last changed: {security.passwordLastChanged}
                  </Typography>
                </Box>
              </Grid>

              {/* Two-Factor Authentication */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  Two-Factor Authentication
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Alert severity={security.twoFactorEnabled ? 'success' : 'warning'}>
                    Two-factor authentication is {security.twoFactorEnabled ? 'enabled' : 'disabled'}
                  </Alert>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={security.twoFactorEnabled}
                        onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                      />
                    }
                    label="Enable Two-Factor Authentication"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={security.loginNotifications}
                        onChange={(e) => handleSecurityChange('loginNotifications', e.target.checked)}
                      />
                    }
                    label="Login Notifications"
                  />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                      Session Timeout (minutes)
                    </Typography>
                    <TextField
                      type="number"
                      value={security.sessionTimeout}
                      onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
                      variant="outlined"
                      size="small"
                      sx={{ width: 120 }}
                    />
                  </Box>
                </Box>
              </Grid>

              {/* API Keys */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  API Keys
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Key</TableCell>
                        <TableCell>Created</TableCell>
                        <TableCell>Last Used</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiKeys.map((key) => (
                        <TableRow key={key.id}>
                          <TableCell>{key.name}</TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {key.key}
                            </Typography>
                          </TableCell>
                          <TableCell>{key.created}</TableCell>
                          <TableCell>{key.lastUsed}</TableCell>
                          <TableCell>
                            <Chip
                              label={key.status}
                              size="small"
                              color={key.status === 'active' ? 'success' : 'default'}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton size="small" sx={{ color: '#6b7280' }}>
                                <Edit />
                              </IconButton>
                              <IconButton size="small" sx={{ color: '#dc2626' }}>
                                <Delete />
                              </IconButton>
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
                  sx={{ mt: 2, color: '#6b7280', borderColor: '#d1d5db' }}
                >
                  Generate New API Key
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
              Notification Preferences
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Receive notifications via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.emailNotifications}
                        onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Receive browser push notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.pushNotifications}
                        onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="SMS Notifications"
                      secondary="Receive notifications via SMS"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.smsNotifications}
                        onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Weekly Reports"
                      secondary="Receive weekly summary reports"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.weeklyReports}
                        onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Security Alerts"
                      secondary="Receive security-related notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.securityAlerts}
                        onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="System Updates"
                      secondary="Receive system update notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.systemUpdates}
                        onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Appearance Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
              Appearance & Localization
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={system.theme}
                    label="Theme"
                    onChange={(e) => handleSystemChange('theme', e.target.value)}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="auto">Auto</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={system.language}
                    label="Language"
                    onChange={(e) => handleSystemChange('language', e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={system.timezone}
                    label="Timezone"
                    onChange={(e) => handleSystemChange('timezone', e.target.value)}
                  >
                    <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                    <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                    <MenuItem value="UTC+0">UTC</MenuItem>
                    <MenuItem value="UTC+1">Central European Time (UTC+1)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Date Format</InputLabel>
                  <Select
                    value={system.dateFormat}
                    label="Date Format"
                    onChange={(e) => handleSystemChange('dateFormat', e.target.value)}
                  >
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Data & Storage Tab */}
        <TabPanel value={tabValue} index={4}>
          <Box sx={{ px: 3 }}>
            <Grid container spacing={4}>
              {/* Storage Usage */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  Storage Usage
                </Typography>
                <Card sx={{ border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body1" fontWeight={500}>
                        {storageData.used} GB of {storageData.total} GB used
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        {storageData.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={storageData.percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#f3f4f6',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: storageData.percentage > 80 ? '#dc2626' : '#000000'
                        }
                      }}
                    />
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                      >
                        Manage Storage
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                      >
                        Upgrade Plan
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Data Export */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                  Data Export
                </Typography>
                <Card sx={{ border: '1px solid #e5e7eb', boxShadow: 'none' }}>
                  <CardContent>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                      Export your data in various formats
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        fullWidth
                        sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                      >
                        Export as CSV
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        fullWidth
                        sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                      >
                        Export as JSON
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        fullWidth
                        sx={{ color: '#6b7280', borderColor: '#d1d5db' }}
                      >
                        Export as PDF
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Danger Zone */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#dc2626', mb: 3 }}>
                  Danger Zone
                </Typography>
                <Card sx={{ border: '1px solid #fca5a5', boxShadow: 'none' }}>
                  <CardContent>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      These actions are irreversible. Please proceed with caution.
                    </Alert>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            Clear All Data
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            Remove all your data from our servers
                          </Typography>
                        </Box>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => openConfirmDialog('clearData')}
                        >
                          Clear Data
                        </Button>
                      </Box>
                      <Divider />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            Delete Account
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6b7280' }}>
                            Permanently delete your account and all associated data
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => openConfirmDialog('deleteAccount')}
                        >
                          Delete Account
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {dialogType === 'clearData' ? 'Clear All Data' : 'Delete Account'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {dialogType === 'clearData'
              ? 'Are you sure you want to clear all your data? This action cannot be undone.'
              : 'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#6b7280' }}>
            Cancel
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            color="error"
            variant="contained"
          >
            {dialogType === 'clearData' ? 'Clear Data' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Palette,
 Storage
} from '@mui/icons-material';

// Import modular components
import ProfileSettings from './components/ProfileSettings';
import SecuritySettings from './components/SecuritySettings';
import NotificationSettings from './components/NotificationSettings';
import AppearanceSettings from './components/AppearanceSettings';
//import DataStorageSettings from './components/DataStorageSettings';

// Initial state data
const initialProfile = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Senior Developer',
  department: 'Engineering',
  phone: '+1 (555) 123-4567',
  avatar: 'JD',
  lastLogin: '2024-01-15 14:30',
  accountCreated: '2023-06-15'
};

const initialSecurity = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: true,
  loginAlerts: true,
  sessionTimeout: false
};

const initialNotifications = {
  emailNotifications: true,
  pushNotifications: false,
  smsNotifications: true,
  marketingEmails: false,
  securityAlerts: true,
  weeklyReports: true,
  systemUpdates: true,
  taskReminders: true,
  quietHours: false,
  quietStart: '22:00',
  quietEnd: '08:00'
};

const initialAppearance = {
  theme: 'dark' as 'light' | 'dark' | 'auto',
  language: 'en',
  fontSize: 'medium' as 'small' | 'medium' | 'large',
  compactMode: false,
  animations: true,
  highContrast: false,
  colorScheme: 'blue' as 'blue' | 'green' | 'purple' | 'orange',
  timezone: 'UTC-8',
  dateFormat: 'MM/DD/YYYY'
};

const initialStorage = {
  usedStorage: 2.4 * 1024 * 1024 * 1024,
  totalStorage: 10 * 1024 * 1024 * 1024,
  autoBackup: true,
  cloudSync: false,
  dataRetention: 365,
  compressionEnabled: true
};

const apiKeys = [
  {
    id: '1',
    name: 'Production API',
    key: 'pk_live_51H...****',
    created: '2024-01-15',
    lastUsed: '2024-02-15',
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Development API',
    key: 'pk_test_51H...****',
    created: '2024-02-01',
    lastUsed: '2024-02-14',
    status: 'active' as const
  },
  {
    id: '3',
    name: 'Staging API',
    key: 'pk_stage_51H...****',
    created: '2024-01-20',
    lastUsed: '2024-02-10',
    status: 'inactive' as const
  }
];



export default function Settings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  
  // State management for each section
  const [profile, setProfile] = useState(initialProfile);
  const [security, setSecurity] = useState(initialSecurity);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [appearance, setAppearance] = useState(initialAppearance);
  const [storage, setStorage] = useState(initialStorage);

  

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Profile handlers
  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // TODO: Implement API call to save profile
    console.log('Saving profile:', profile);
  };

  const handleCancelProfile = () => {
    setProfile(initialProfile);
  };

  const handleUploadAvatar = () => {
    // TODO: Implement avatar upload
    console.log('Upload avatar');
  };

  const handleRemoveAvatar = () => {
    // TODO: Implement avatar removal
    console.log('Remove avatar');
  };

  // Security handlers
  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurity(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = () => {
    // TODO: Implement password change API call
    console.log('Changing password:', { 
      current: security.currentPassword, 
      new: security.newPassword 
    });
  };

  const handleEnable2FA = () => {
    // TODO: Implement 2FA setup
    console.log('Enable 2FA');
  };

  const handleDisable2FA = () => {
    // TODO: Implement 2FA disable
    console.log('Disable 2FA');
  };

  // API Key handlers
  const handleGenerateApiKey = () => {
    // TODO: Implement API key generation
    console.log('Generate new API key');
  };

  const handleEditApiKey = (id: string) => {
    // TODO: Implement API key editing
    console.log('Edit API key:', id);
  };

  const handleDeleteApiKey = (id: string) => {
    // TODO: Implement API key deletion
    console.log('Delete API key:', id);
  };

  // Notification handlers
  const handleNotificationChange = (field: string, value: boolean | string) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveNotifications = () => {
    // TODO: Implement API call to save notification preferences
    console.log('Saving notifications:', notifications);
  };

  const handleTestNotification = () => {
    // TODO: Implement test notification
    console.log('Send test notification');
  };

  // Appearance handlers
  const handleAppearanceChange = (field: string, value: string | boolean) => {
    setAppearance(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAppearance = () => {
    // TODO: Implement API call to save appearance settings
    console.log('Saving appearance:', appearance);
  };

  const handleResetToDefaults = () => {
    setAppearance(initialAppearance);
  };



  // Storage handlers
  const handleStorageChange = (field: string, value: boolean | number) => {
    setStorage(prev => ({ ...prev, [field]: value }));
  };

  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Export data');
  };

  const handleImportData = () => {
    // TODO: Implement data import
    console.log('Import data');
  };

  const handleClearCache = () => {
    // TODO: Implement cache clearing
    console.log('Clear cache');
  };

  const handleDeleteAllData = () => {
    // TODO: Implement data deletion with confirmation
    console.log('Delete all data');
  };

  const handleCreateBackup = () => {
    // TODO: Implement backup creation
    console.log('Create backup');
  };

  const handleRestoreBackup = () => {
    // TODO: Implement backup restoration
    console.log('Restore backup');
  };



  return (
    <Box sx={{ 
      p: { xs: 0.5, sm: 2, md: 4 }, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      color: '#ffffff',
      width: '100%',
      maxWidth: { xs: 'calc(100vw - 8px)', sm: '100%' },
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          Settings
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Settings Tabs */}
      <Paper sx={{ 
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        borderRadius: 2,
        width: '100%',
        maxWidth: { xs: 'calc(100vw - 8px)', sm: '100%' },
        overflow: 'hidden',
        boxSizing: 'border-box',
        mx: { xs: 0, sm: 'auto' }
      }}>
        <Box sx={{ borderBottom: '1px solid #334155' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            allowScrollButtonsMobile
            sx={{
              px: { xs: 0.5, sm: 2, md: 3 },
              '& .MuiTab-root': {
                color: '#94a3b8',
                minWidth: { xs: 'auto', md: 160 },
                fontSize: { xs: '0.7rem', sm: '0.875rem', md: '1rem' },
                padding: { xs: '4px 6px', sm: '12px 16px' },
                '&.Mui-selected': {
                  color: '#ffffff'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#3b82f6'
              },
              '& .MuiTabs-scrollButtons': {
                color: '#94a3b8'
              }
            }}
          >
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<Security />} label="Security" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Palette />} label="Appearance" />
            {/*<Tab icon={<Storage />} label="Data & Storage" />*/}
          </Tabs>
        </Box>

        {/* Profile Tab */}
        {activeTab === 0 && (
          <ProfileSettings
            profile={profile}
            onProfileChange={handleProfileChange}
            onSaveProfile={handleSaveProfile}
            onCancelProfile={handleCancelProfile}
            onUploadAvatar={handleUploadAvatar}
            onRemoveAvatar={handleRemoveAvatar}
          />
        )}

        {/* Security Tab */}
        {activeTab === 1 && (
          <SecuritySettings
            security={security}
            apiKeys={apiKeys}
            onSecurityChange={handleSecurityChange}
            onChangePassword={handleChangePassword}
            onEnable2FA={handleEnable2FA}
            onDisable2FA={handleDisable2FA}
            onGenerateApiKey={handleGenerateApiKey}
            onEditApiKey={handleEditApiKey}
            onDeleteApiKey={handleDeleteApiKey}
          />
        )}

        {/* Notifications Tab */}
        {activeTab === 2 && (
          <NotificationSettings
            notifications={notifications}
            onNotificationChange={handleNotificationChange}
            onSaveNotifications={handleSaveNotifications}
            onTestNotification={handleTestNotification}
          />
        )}

        {/* Appearance Tab */}
        {activeTab === 3 && (
          <AppearanceSettings
            appearance={appearance}
            onAppearanceChange={handleAppearanceChange}
            onSaveAppearance={handleSaveAppearance}
            onResetToDefaults={handleResetToDefaults}
          />
        )}

        {/* Data & Storage Tab 
        {activeTab === 4 && (
          <DataStorageSettings
            storage={storage}
            onStorageChange={handleStorageChange}
            onExportData={handleExportData}
            onImportData={handleImportData}
            onClearCache={handleClearCache}
            onDeleteAllData={handleDeleteAllData}
            onCreateBackup={handleCreateBackup}
            onRestoreBackup={handleRestoreBackup}
          />
        )}*/}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>
          Confirm Action
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#94a3b8' }}>
            Are you sure you want to proceed with this action? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            color="error"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
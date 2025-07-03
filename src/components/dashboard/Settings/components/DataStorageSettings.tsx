'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  LinearProgress,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Alert,
  Divider
} from '@mui/material';
import {
  Storage,
  Download,
  Delete,
  CloudSync,
  Backup,
  Warning
} from '@mui/icons-material';

interface StorageData {
  usedStorage: number;
  totalStorage: number;
  autoBackup: boolean;
  cloudSync: boolean;
  dataRetention: number;
  compressionEnabled: boolean;
}

interface DataStorageSettingsProps {
  storage: StorageData;
  onStorageChange: (field: string, value: boolean | number) => void;
  onExportData: () => void;
  onImportData: () => void;
  onClearCache: () => void;
  onDeleteAllData: () => void;
  onCreateBackup: () => void;
  onRestoreBackup: () => void;
}

export default function DataStorageSettings({
  storage,
  onStorageChange,
  onExportData,
  onImportData,
  onClearCache,
  onDeleteAllData,
  onCreateBackup,
  onRestoreBackup
}: DataStorageSettingsProps) {
  const storagePercentage = (storage.usedStorage / storage.totalStorage) * 100;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{p: 3 }}>
      <Grid container spacing={4}>
        {/* Storage Overview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Storage sx={{ color: '#3b82f6' }} />
            Storage Overview
          </Typography>
          
          {/* Storage Usage */}
          <Card sx={{ backgroundColor: '#0f172a', border: '1px solid #475569', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Storage Usage
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  {formatBytes(storage.usedStorage)} / {formatBytes(storage.totalStorage)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={storagePercentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#334155',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: storagePercentage > 80 ? '#dc2626' : storagePercentage > 60 ? '#f59e0b' : '#10b981',
                    borderRadius: 4
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1, display: 'block' }}>
                {storagePercentage.toFixed(1)}% used
              </Typography>
            </CardContent>
          </Card>

          {/* Storage Settings */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Auto Backup */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Backup sx={{ color: '#94a3b8' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Auto Backup
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Automatically backup your data daily
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={storage.autoBackup}
                    onChange={(e) => onStorageChange('autoBackup', e.target.checked)}
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

            {/* Cloud Sync */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudSync sx={{ color: '#94a3b8' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Cloud Synchronization
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Sync your data across all devices
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={storage.cloudSync}
                    onChange={(e) => onStorageChange('cloudSync', e.target.checked)}
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

            {/* Data Compression */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Data Compression
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Compress data to save storage space
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={storage.compressionEnabled}
                    onChange={(e) => onStorageChange('compressionEnabled', e.target.checked)}
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

        {/* Data Management */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
            Data Management
          </Typography>
          
          {/* Export/Import */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 2 }}>
              Export & Import
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  onClick={onExportData}
                  sx={{ color: '#94a3b8', borderColor: '#475569', '&:hover': { borderColor: '#64748b' } }}
                >
                  Export Data
                </Button>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudSync />}
                  onClick={onImportData}
                  sx={{ color: '#94a3b8', borderColor: '#475569', '&:hover': { borderColor: '#64748b' } }}
                >
                  Import Data
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Backup & Restore */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 2 }}>
              Backup & Restore
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Backup />}
                  onClick={onCreateBackup}
                  sx={{
                    backgroundColor: '#10b981',
                    '&:hover': {
                      backgroundColor: '#059669'
                    }
                  }}
                >
                  Create Backup
                </Button>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudSync />}
                  onClick={onRestoreBackup}
                  sx={{ color: '#94a3b8', borderColor: '#475569', '&:hover': { borderColor: '#64748b' } }}
                >
                  Restore Backup
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Maintenance */}
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 2 }}>
              Maintenance
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={onClearCache}
                  sx={{ color: '#f59e0b', borderColor: '#f59e0b', '&:hover': { borderColor: '#d97706' } }}
                >
                  Clear Cache
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Danger Zone */}
        <Grid size={{ xs: 12 }}>
          <Divider sx={{ my: 2, borderColor: '#475569' }} />
          <Alert 
            severity="warning" 
            icon={<Warning />}
            sx={{ 
              backgroundColor: '#451a03', 
              border: '1px solid #f59e0b',
              color: '#fbbf24',
              mb: 3,
              '& .MuiAlert-icon': {
                color: '#f59e0b'
              }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Danger Zone
            </Typography>
            <Typography variant="body2">
              These actions are irreversible. Please proceed with caution.
            </Typography>
          </Alert>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Delete />}
              onClick={onDeleteAllData}
              sx={{
                backgroundColor: '#dc2626',
                '&:hover': {
                  backgroundColor: '#b91c1c'
                }
              }}
            >
              Delete All Data
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
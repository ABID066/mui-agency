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
  Divider,
  useTheme,
  useMediaQuery
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const storagePercentage = (storage.usedStorage / storage.totalStorage) * 100;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ 
      p: { xs: 0.5, sm: 2, md: 3 },
      width: '100%',
      maxWidth: { xs: 'calc(100vw - 16px)', sm: '100%' },
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <Grid container spacing={4}>
        {/* Storage Overview */}
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
            <Storage sx={{ color: '#3b82f6', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
            Storage Overview
          </Typography>
          
          {/* Storage Usage */}
          <Card sx={{ 
            backgroundColor: '#0f172a', 
            border: '1px solid #475569', 
            mb: 3,
            width: '100%',
            maxWidth: '100%'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: { xs: 'flex-start', sm: 'center' }, 
                mb: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 }
              }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#ffffff', 
                    fontWeight: 600,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  Storage Usage
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
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
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#94a3b8', 
                  mt: 1, 
                  display: 'block',
                  fontSize: { xs: '0.625rem', sm: '0.75rem' }
                }}
              >
                {storagePercentage.toFixed(1)}% used
              </Typography>
            </CardContent>
          </Card>

          {/* Storage Settings */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
            {/* Auto Backup */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Backup sx={{ color: '#94a3b8', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Auto Backup
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94a3b8',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
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
            <Box sx={{ 
              display: 'flex', 
              alignItems: { xs: 'flex-start', sm: 'center' }, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudSync sx={{ color: '#94a3b8', fontSize: { xs: '1.25rem', md: '1.5rem' } }} />
                <Box>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#ffffff', 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}
                  >
                    Cloud Synchronization
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#94a3b8',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
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
                  }}
                >
                  Data Compression
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
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
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: 3,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}
          >
            Data Management
          </Typography>
          
          {/* Export/Import */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Export & Import
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Download />}
                  onClick={onExportData}
                  sx={{ 
                    color: '#94a3b8', 
                    borderColor: '#475569', 
                    '&:hover': { borderColor: '#64748b' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  Export Data
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudSync />}
                  onClick={onImportData}
                  sx={{ 
                    color: '#94a3b8', 
                    borderColor: '#475569', 
                    '&:hover': { borderColor: '#64748b' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  Import Data
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Backup & Restore */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Backup & Restore
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Backup />}
                  onClick={onCreateBackup}
                  sx={{
                    backgroundColor: '#10b981',
                    '&:hover': {
                      backgroundColor: '#059669'
                    },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  Create Backup
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<CloudSync />}
                  onClick={onRestoreBackup}
                  sx={{ 
                    color: '#94a3b8', 
                    borderColor: '#475569', 
                    '&:hover': { borderColor: '#64748b' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  Restore Backup
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Maintenance */}
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Maintenance
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Delete />}
                  onClick={onClearCache}
                  sx={{ 
                    color: '#f59e0b', 
                    borderColor: '#f59e0b', 
                    '&:hover': { borderColor: '#d97706' },
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 }
                  }}
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
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                mb: 1,
                fontSize: { xs: '1rem', sm: '1.125rem' }
              }}
            >
              Danger Zone
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              These actions are irreversible. Please proceed with caution.
            </Typography>
          </Alert>
          
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              variant="contained"
              startIcon={<Delete />}
              onClick={onDeleteAllData}
              sx={{
                backgroundColor: '#dc2626',
                '&:hover': {
                  backgroundColor: '#b91c1c'
                },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                py: { xs: 1, sm: 1.5 },
                width: { xs: '100%', sm: 'auto' }
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
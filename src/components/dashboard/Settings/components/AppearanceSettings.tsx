'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Switch,
  Button,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Palette,
  Visibility,
  DarkMode,
  LightMode,
  SettingsBrightness
} from '@mui/icons-material';

interface AppearanceData {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  animations: boolean;
  highContrast: boolean;
  colorScheme: 'blue' | 'green' | 'purple' | 'orange';
}

interface AppearanceSettingsProps {
  appearance: AppearanceData;
  onAppearanceChange: (field: string, value: string | boolean) => void;
  onSaveAppearance: () => void;
  onResetToDefaults: () => void;
}

export default function AppearanceSettings({
  appearance,
  onAppearanceChange,
  onSaveAppearance,
  onResetToDefaults
}: AppearanceSettingsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const themeOptions = [
    { value: 'light', label: 'Light', icon: <LightMode /> },
    { value: 'dark', label: 'Dark', icon: <DarkMode /> },
    { value: 'auto', label: 'Auto', icon: <SettingsBrightness /> }
  ];

  const colorSchemes = [
    { value: 'blue', label: 'Blue', color: '#3b82f6' },
    { value: 'green', label: 'Green', color: '#10b981' },
    { value: 'purple', label: 'Purple', color: '#8b5cf6' },
    { value: 'orange', label: 'Orange', color: '#f59e0b' }
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Grid container spacing={4}>
        {/* Theme Selection */}
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
            }}>
            <Palette sx={{ color: '#3b82f6' }} />
            Theme & Colors
          </Typography>
          
          {/* Theme Mode */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 2,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
              Theme Mode
            </Typography>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              {themeOptions.map((option) => (
                <Grid size={{ xs: 4 }} key={option.value}>
                  <Card
                    sx={{
                      backgroundColor: appearance.theme === option.value ? '#1e40af' : '#0f172a',
                      border: `2px solid ${appearance.theme === option.value ? '#3b82f6' : '#475569'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#3b82f6'
                      }
                    }}
                    onClick={() => onAppearanceChange('theme', option.value)}
                  >
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      py: { xs: 1, sm: 2 },
                      px: { xs: 1, sm: 2 }
                    }}>
                      <Box sx={{ color: '#ffffff', mb: 1 }}>
                        {option.icon}
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#ffffff',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                        {option.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Color Scheme
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 2 }}>
              Color Scheme
            </Typography>
            <Grid container spacing={2}>
              {colorSchemes.map((scheme) => (
                <Grid size={{ xs: 3 }} key={scheme.value}>
                  <Box
                    sx={{
                      width: '100%',
                      height: 60,
                      backgroundColor: scheme.color,
                      borderRadius: 2,
                      cursor: 'pointer',
                      border: `3px solid ${appearance.colorScheme === scheme.value ? '#ffffff' : 'transparent'}`,
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                    onClick={() => onAppearanceChange('colorScheme', scheme.value)}
                  />
                  <Typography variant="caption" sx={{ color: '#94a3b8', textAlign: 'center', display: 'block', mt: 1 }}>
                    {scheme.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>*/}
        </Grid>

        {/* Display Settings */}
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
            }}>
            <Visibility sx={{ color: '#3b82f6' }} />
            Display Settings
          </Typography>
          
          {/* Language */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 1,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}>
              Language
            </Typography>
            <FormControl fullWidth>
              <Select
                value={appearance.language}
                onChange={(e) => onAppearanceChange('language', e.target.value)}
                sx={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64748b',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#94a3b8'
                  }
                }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
                <MenuItem value="zh">中文</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Font Size
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600, mb: 1 }}>
              Font Size
            </Typography>
            <FormControl fullWidth>
              <Select
                value={appearance.fontSize}
                onChange={(e) => onAppearanceChange('fontSize', e.target.value)}
                sx={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64748b',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#94a3b8'
                  }
                }}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </Box>*/}

          {/* Display Options 
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Compact Mode 
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Compact Mode
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Reduce spacing and padding for more content
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={appearance.compactMode}
                    onChange={(e) => onAppearanceChange('compactMode', e.target.checked)}
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
            </Box>*/}

            {/* Animations 
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  Animations
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Enable smooth transitions and animations
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={appearance.animations}
                    onChange={(e) => onAppearanceChange('animations', e.target.checked)}
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
            </Box>*/}

            {/* High Contrast 
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: '#ffffff', fontWeight: 600 }}>
                  High Contrast
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Increase contrast for better accessibility
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={appearance.highContrast}
                    onChange={(e) => onAppearanceChange('highContrast', e.target.checked)}
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
            </Box>*/}
          
        </Grid>

        {/* Actions */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            justifyContent: { xs: 'stretch', sm: 'flex-end' }, 
            pt: 2, 
            borderTop: '1px solid #475569',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
            <Button
              variant="outlined"
              onClick={onResetToDefaults}
              sx={{ 
                color: '#94a3b8', 
                borderColor: '#475569', 
                '&:hover': { borderColor: '#64748b' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Reset to Defaults
            </Button>
            <Button
              variant="contained"
              onClick={onSaveAppearance}
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: '#2563eb'
                },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                py: { xs: 1, sm: 1.5 }
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
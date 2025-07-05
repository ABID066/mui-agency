'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  Search,
  CheckCircle,
  Business
} from '@mui/icons-material';

interface Organization {
  id: string;
  name: string;
  role: string;
  members: number;
  status: 'active' | 'inactive';
  avatar: string;
  description: string;
  isCurrent: boolean;
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'AgencyBoost Inc.',
    role: 'Owner',
    members: 24,
    status: 'active',
    avatar: 'AB',
    description: 'Primary marketing agency',
    isCurrent: true
  },
  {
    id: '2',
    name: 'TechStart Solutions',
    role: 'Admin',
    members: 12,
    status: 'active',
    avatar: 'TS',
    description: 'Technology consulting firm',
    isCurrent: false
  },
  {
    id: '3',
    name: 'Creative Studio',
    role: 'Member',
    members: 8,
    status: 'active',
    avatar: 'CS',
    description: 'Design and creative services',
    isCurrent: false
  }
];

export default function SwitchOrganization() {
  const [organizations] = useState<Organization[]>(mockOrganizations);
  const [selectedOrg, setSelectedOrg] = useState<string>(
    organizations.find(org => org.isCurrent)?.id || ''
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [switching, setSwitching] = useState(false);

  const handleSwitch = async () => {
    if (selectedOrg === organizations.find(org => org.isCurrent)?.id) {
      return;
    }
    
    setSwitching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSwitching(false);
    
    // Show success message or redirect
    alert('Organization switched successfully!');
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'owner':
        return '#059669';
      case 'admin':
        return '#3b82f6';
      case 'member':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) && org.status === 'active'
  );

  const selectedOrgData = organizations.find(org => org.id === selectedOrg);
  const currentOrg = organizations.find(org => org.isCurrent);

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 }, 
      backgroundColor: '#0f172a', 
      minHeight: '100vh', 
      color: '#ffffff',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' },
            wordBreak: 'break-word'
          }}
        >
          Switch Organization
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Select an organization to switch to
        </Typography>
      </Box>

      {/* Current Organization Alert */}
      {currentOrg && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 4,
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff',
            '& .MuiAlert-icon': {
              color: '#3b82f6'
            }
          }}
        >
          Currently active: <strong>{currentOrg.name}</strong> ({currentOrg.role})
        </Alert>
      )}

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 3, lg: 4 },
        width: '100%',
        maxWidth: '100%'
      }}>
        {/* Organization List */}
        <Box sx={{ 
          flex: 1,
          width: '100%',
          maxWidth: '100%',
          minWidth: 0
        }}>
          {/* Search */}
          <TextField
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              mb: 3,
              width: '100%',
              maxWidth: '100%',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                color: '#ffffff',
                fontSize: { xs: '0.875rem', md: '1rem' },
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
              '& .MuiInputBase-input::placeholder': {
                color: '#94a3b8',
                opacity: 1
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              )
            }}
          />

          {/* Organizations */}
          <RadioGroup
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
          >
            {filteredOrganizations.map((org) => (
              <Card key={org.id} sx={{
                backgroundColor: selectedOrg === org.id ? '#1e40af' : '#1e293b',
                border: `1px solid ${selectedOrg === org.id ? '#3b82f6' : '#334155'}`,
                boxShadow: 'none',
                mb: 2,
                cursor: 'pointer',
                width: '100%',
                maxWidth: '100%',
                '&:hover': {
                  borderColor: '#475569'
                }
              }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <FormControlLabel
                    value={org.id}
                    control={<Radio sx={{ color: '#94a3b8' }} />}
                    label=""
                    sx={{ m: 0, position: 'absolute', top: 16, right: 16 }}
                  />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pr: 6 }}>
                    <Avatar sx={{ 
                      width: 50, 
                      height: 50, 
                      backgroundColor: '#3b82f6',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }}>
                      {org.avatar}
                    </Avatar>
                    
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                          {org.name}
                        </Typography>
                        {org.isCurrent && (
                          <Chip
                            icon={<CheckCircle />}
                            label="Current"
                            size="small"
                            sx={{
                              backgroundColor: '#059669',
                              color: '#ffffff',
                              fontWeight: 500
                            }}
                          />
                        )}
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                        {org.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={org.role}
                          size="small"
                          sx={{
                            backgroundColor: getRoleColor(org.role),
                            color: '#ffffff',
                            fontWeight: 500
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          {org.members} members
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </Box>

        {/* Switch Panel */}
        <Box sx={{ width: 300 }}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            position: 'sticky',
            top: 20
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
                Switch to Organization
              </Typography>
              
              {selectedOrgData ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar sx={{ 
                      width: 40, 
                      height: 40, 
                      backgroundColor: '#3b82f6',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}>
                      {selectedOrgData.avatar}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#ffffff' }}>
                        {selectedOrgData.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {selectedOrgData.role}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                    {selectedOrgData.description}
                  </Typography>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSwitch}
                    disabled={switching || selectedOrgData.isCurrent}
                    sx={{
                      backgroundColor: '#3b82f6',
                      '&:hover': {
                        backgroundColor: '#2563eb'
                      },
                      '&:disabled': {
                        backgroundColor: '#374151',
                        color: '#6b7280'
                      }
                    }}
                  >
                    {switching ? 'Switching...' : selectedOrgData.isCurrent ? 'Current Organization' : 'Switch Organization'}
                  </Button>
                </>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Business sx={{ fontSize: 48, color: '#6b7280', mb: 2 }} />
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Select an organization to switch to
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  MoreVert,
  Search,
  Add,
  Settings,
  SwapHoriz,
  Delete,
  ArrowBack,
  People,
  PersonAdd,
  PersonRemove,
  AdminPanelSettings
} from '@mui/icons-material';

// Import sub-components
import TeamMembers from './TeamMembers';
import InviteMember from './InviteMember';
import AssignRole from './AssignRole';
import RemoveMember from './RemoveMember';
import OrgSettings from './OrgSettings';
import DisableDeleteOrg from './DisableDeleteOrg';

interface Organization {
  id: string;
  name: string;
  role: string;
  members: number;
  status: 'active' | 'inactive';
  avatar: string;
  description: string;
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'AgencyBoost Inc.',
    role: 'Owner',
    members: 24,
    status: 'active',
    avatar: 'AB',
    description: 'Primary marketing agency'
  },
  {
    id: '2',
    name: 'TechStart Solutions',
    role: 'Admin',
    members: 12,
    status: 'active',
    avatar: 'TS',
    description: 'Technology consulting firm'
  },
  {
    id: '3',
    name: 'Creative Studio',
    role: 'Member',
    members: 8,
    status: 'inactive',
    avatar: 'CS',
    description: 'Design and creative services'
  }
];

export default function MyOrganizations() {
  const [organizations] = useState<Organization[]>(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [view, setView] = useState<'list' | 'manage'>('list');
  const [currentOrgId, setCurrentOrgId] = useState<string>('1'); // Default to first organization

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOrgSelect = (org: Organization) => {
    setSelectedOrg(org);
    setView('manage');
    setActiveTab(0);
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedOrg(null);
    setActiveTab(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSwitchOrg = (orgId: string) => {
    setCurrentOrgId(orgId);
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
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTabContent = () => {
    if (!selectedOrg) return null;

    switch (activeTab) {
      case 0:
        return <TeamMembers />;
      case 1:
        return <InviteMember />;
      case 2:
        return <AssignRole />;
      case 3:
        return <RemoveMember />;
      case 4:
        return <OrgSettings />;
      case 5:
        return <DisableDeleteOrg />;
      default:
        return <TeamMembers />;
    }
  };

  if (view === 'manage' && selectedOrg) {
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
        {/* Header with Breadcrumbs */}
        <Box sx={{ mb: { xs: 3, md: 4 }, width: '100%', maxWidth: '100%' }}>
          <Breadcrumbs sx={{ mb: 2, color: '#94a3b8' }}>
            <Link
              component="button"
              variant="body1"
              onClick={handleBackToList}
              sx={{ color: '#3b82f6', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              My Organizations
            </Link>
            <Typography color="#ffffff">{selectedOrg.name}</Typography>
          </Breadcrumbs>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBackToList}
              sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}
            >
              Back to Organizations
            </Button>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' }, 
            gap: { xs: 2, sm: 3 },
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Avatar sx={{ 
              width: { xs: 50, sm: 60 }, 
              height: { xs: 50, sm: 60 }, 
              backgroundColor: '#3b82f6',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 600
            }}>
              {selectedOrg.avatar}
            </Avatar>
            <Box>
              <Typography 
                variant="h4"
                fontWeight={700} 
                sx={{ 
                  color: '#ffffff', 
                  mb: 1,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                {selectedOrg.name}
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 1 }}>
                {selectedOrg.description}
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 2 },
                alignItems: { xs: 'center', sm: 'flex-start' }
              }}>
                <Chip
                  label={selectedOrg.role}
                  size="small"
                  sx={{
                    backgroundColor: getRoleColor(selectedOrg.role),
                    color: '#ffffff',
                    fontWeight: 500
                  }}
                />
                <Chip
                  label={`${selectedOrg.members} members`}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#475569',
                    color: '#94a3b8'
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Management Tabs */}
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          width: '100%',
          maxWidth: '100%'
        }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderBottom: '1px solid #334155',
              '& .MuiTab-root': {
                color: '#94a3b8',
                minWidth: { xs: 120, md: 'auto' },
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                '&.Mui-selected': {
                  color: '#3b82f6'
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
            <Tab 
              icon={<People sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />} 
              label="Team Members" 
              iconPosition="start"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            />
            <Tab 
              icon={<PersonAdd sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />} 
              label="Invite Members" 
              iconPosition="start"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            />
            <Tab 
              icon={<AdminPanelSettings sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />} 
              label="Assign Roles" 
              iconPosition="start"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            />
            <Tab 
              icon={<PersonRemove sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />} 
              label="Remove Members" 
              iconPosition="start"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            />
            <Tab 
              icon={<Settings sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />} 
              label="Organization Settings" 
              iconPosition="start"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            />
            <Tab 
              icon={<Delete sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />} 
              label="Disable/Delete" 
              iconPosition="start"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            />
          </Tabs>
          
          <Box sx={{ 
            p: 0,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden'
          }}>
            {renderTabContent()}
          </Box>
        </Card>
      </Box>
    );
  }

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
          My Organizations
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.875rem', md: '1rem' }
          }}
        >
          Manage and switch between your organizations
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' }, 
        gap: { xs: 2, sm: 0 },
        mb: 4 
      }}>
        <TextField
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: { xs: '100%', sm: 300 },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1e293b',
              borderColor: '#334155',
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
        
        <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: '#3b82f6',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                backgroundColor: '#2563eb'
              }
            }}
          >
             Create Organization
           </Button>
      </Box>

      {/* Organizations Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ width: '100%', maxWidth: '100%' }}>
        {filteredOrganizations.map((org) => (
          <Grid key={org.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ width: '100%', maxWidth: '100%' }}>
            <Card sx={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none',
              width: '100%',
              maxWidth: '100%',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                borderColor: '#475569'
              }
            }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar sx={{ 
                    width: 50, 
                    height: 50, 
                    backgroundColor: '#3b82f6',
                    fontSize: '1.2rem',
                    fontWeight: 600
                  }}>
                    {org.avatar}
                  </Avatar>
                  
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                    sx={{ color: '#94a3b8' }}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                
                <Typography 
                  variant="h6" 
                  fontWeight={600} 
                  sx={{ 
                    color: '#ffffff', 
                    mb: 1,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    wordBreak: 'break-word'
                  }}
                >
                  {org.name}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8', 
                    mb: 2,
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    wordBreak: 'break-word'
                  }}
                >
                  {org.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={org.role}
                      size="small"
                      sx={{
                        backgroundColor: getRoleColor(org.role),
                        color: '#ffffff',
                        fontWeight: 500
                      }}
                    />
                    {currentOrgId === org.id && (
                      <Chip
                        label="Current"
                        size="small"
                        sx={{
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          fontWeight: 600
                        }}
                      />
                    )}
                  </Box>
                  
                  <Chip
                    label={org.status}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: org.status === 'active' ? '#059669' : '#6b7280',
                      color: org.status === 'active' ? '#059669' : '#6b7280'
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8', 
                    mb: 3,
                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                  }}
                >
                  {org.members} members
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 1 }
                }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<SwapHoriz />}
                    onClick={() => handleSwitchOrg(org.id)}
                    disabled={currentOrgId === org.id}
                    sx={{
                      borderColor: currentOrgId === org.id ? '#10b981' : '#475569',
                      color: currentOrgId === org.id ? '#10b981' : '#ffffff',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      '&:hover': {
                        borderColor: currentOrgId === org.id ? '#10b981' : '#94a3b8',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      },
                      '&.Mui-disabled': {
                        borderColor: '#10b981',
                        color: '#10b981',
                        opacity: 0.7
                      }
                    }}
                  >
                    {currentOrgId === org.id ? 'Current Organization' : 'Switch to this org'}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleOrgSelect(org)}
                    sx={{
                      backgroundColor: '#3b82f6',
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        backgroundColor: '#2563eb'
                      },
                      minWidth: { xs: 'auto', sm: 'auto' },
                      px: { xs: 2, sm: 2 }
                    }}
                  >
                    Manage
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ffffff' }}>
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ffffff' }}>
          <SwapHoriz sx={{ mr: 2 }} />
          Switch to
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ef4444' }}>
          <Delete sx={{ mr: 2 }} />
          Leave Organization
        </MenuItem>
      </Menu>
    </Box>
  );
}
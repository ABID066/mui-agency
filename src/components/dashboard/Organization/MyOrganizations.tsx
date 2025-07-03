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
  InputAdornment
} from '@mui/material';
import {
  MoreVert,
  Search,
  Add,
  Settings,
  SwapHoriz,
  Delete
} from '@mui/icons-material';

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          My Organizations
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage and switch between your organizations
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <TextField
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: 300,
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
            '&:hover': {
              backgroundColor: '#2563eb'
            }
          }}
        >
          Create Organization
        </Button>
      </Box>

      {/* Organizations Grid */}
      <Grid container spacing={3}>
        {filteredOrganizations.map((org) => (
          <Grid key={org.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                borderColor: '#475569'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
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
                
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 1 }}>
                  {org.name}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
                  {org.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    label={org.role}
                    size="small"
                    sx={{
                      backgroundColor: getRoleColor(org.role),
                      color: '#ffffff',
                      fontWeight: 500
                    }}
                  />
                  
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
                
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                  {org.members} members
                </Typography>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SwapHoriz />}
                  sx={{
                    borderColor: '#475569',
                    color: '#ffffff',
                    '&:hover': {
                      borderColor: '#94a3b8',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  Switch to this org
                </Button>
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
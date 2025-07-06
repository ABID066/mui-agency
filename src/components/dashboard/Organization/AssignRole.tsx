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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import {
  Search,
  AssignmentInd,
  Save,
  Cancel
} from '@mui/icons-material';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  currentRole: string;
  department: string;
  avatar: string;
  selected?: boolean;
}

interface RolePermission {
  id: string;
  name: string;
  description: string;
}

const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@agencyboost.com',
    currentRole: 'Admin',
    department: 'Management',
    avatar: 'JD'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@agencyboost.com',
    currentRole: 'Manager',
    department: 'Marketing',
    avatar: 'JS'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@agencyboost.com',
    currentRole: 'Member',
    department: 'Development',
    avatar: 'MJ'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@agencyboost.com',
    currentRole: 'Member',
    department: 'Design',
    avatar: 'SW'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@agencyboost.com',
    currentRole: 'Viewer',
    department: 'Marketing',
    avatar: 'AB'
  }
];

const roles = [
  {
    name: 'Admin',
    description: 'Full access to all organization features and settings',
    color: '#ef4444'
  },
  {
    name: 'Manager',
    description: 'Can manage team members and department resources',
    color: '#3b82f6'
  },
  {
    name: 'Member',
    description: 'Standard access to organization resources',
    color: '#6b7280'
  },
  {
    name: 'Viewer',
    description: 'Read-only access to organization content',
    color: '#94a3b8'
  }
];

const rolePermissions: Record<string, RolePermission[]> = {
  Admin: [
    { id: '1', name: 'Manage Organization', description: 'Create, edit, and delete organization settings' },
    { id: '2', name: 'Manage Members', description: 'Invite, remove, and assign roles to members' },
    { id: '3', name: 'Manage Projects', description: 'Create, edit, and delete projects' },
    { id: '4', name: 'Manage Billing', description: 'Access and modify billing information' },
    { id: '5', name: 'View Analytics', description: 'Access organization analytics and reports' }
  ],
  Manager: [
    { id: '2', name: 'Manage Members', description: 'Invite, remove, and assign roles to members' },
    { id: '3', name: 'Manage Projects', description: 'Create, edit, and delete projects' },
    { id: '5', name: 'View Analytics', description: 'Access organization analytics and reports' }
  ],
  Member: [
    { id: '3', name: 'Manage Projects', description: 'Create, edit, and delete projects' },
    { id: '6', name: 'View Projects', description: 'View and participate in projects' }
  ],
  Viewer: [
    { id: '6', name: 'View Projects', description: 'View and participate in projects' }
  ]
};

export default function AssignRole() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<{memberId: string, newRole: string}[]>([]);

  const handleMemberSelect = (memberId: string) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { ...member, selected: !member.selected }
        : member
    ));
  };

  const handleSelectAll = () => {
    const allSelected = filteredMembers.every(member => member.selected);
    setMembers(prev => prev.map(member => ({
      ...member,
      selected: filteredMembers.some(fm => fm.id === member.id) ? !allSelected : member.selected
    })));
  };

  const handleRoleChange = (memberId: string, newRole: string) => {
    const member = members.find(m => m.id === memberId);
    if (member && member.currentRole !== newRole) {
      setPendingChanges(prev => {
        const existing = prev.find(change => change.memberId === memberId);
        if (existing) {
          return prev.map(change => 
            change.memberId === memberId 
              ? { ...change, newRole }
              : change
          );
        }
        return [...prev, { memberId, newRole }];
      });
    }
  };

  const handleBulkRoleAssign = () => {
    if (!selectedRole) return;
    
    const selectedMembers = members.filter(member => member.selected);
    const changes = selectedMembers.map(member => ({
      memberId: member.id,
      newRole: selectedRole
    }));
    
    setPendingChanges(changes);
    setShowConfirmDialog(true);
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Apply changes
    setMembers(prev => prev.map(member => {
      const change = pendingChanges.find(c => c.memberId === member.id);
      return change 
        ? { ...member, currentRole: change.newRole, selected: false }
        : member;
    }));
    
    setPendingChanges([]);
    setSelectedRole('');
    setBulkMode(false);
    setSaving(false);
    setShowConfirmDialog(false);
  };

  const handleCancelChanges = () => {
    setPendingChanges([]);
    setShowConfirmDialog(false);
  };

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.name === role);
    return roleData?.color || '#6b7280';
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMembers = members.filter(member => member.selected);
  const hasChanges = pendingChanges.length > 0;

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
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            wordBreak: 'break-word'
          }}
        >
          Assign Roles
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage team member roles and permissions
        </Typography>
      </Box>

      {/* Role Information */}
      <Card sx={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        mb: { xs: 2, sm: 3, md: 4 },
        width: '100%',
        maxWidth: '100%'
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h6" 
            fontWeight={600} 
            sx={{ 
              color: '#ffffff', 
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Available Roles
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
            {roles.map((role) => (
              <Grid sx={{xs:12, sm:6, lg:4}} key={role.name}>
                <Card sx={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  boxShadow: 'none',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <CardContent sx={{ 
                    p: { xs: 2, sm: 2.5 },
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Chip
                        label={role.name}
                        sx={{
                          backgroundColor: role.color,
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: { xs: '0.7rem', sm: '0.75rem' }
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#94a3b8', 
                        mb: 2,
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        flex: 1
                      }}
                    >
                      {role.description}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#6b7280',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                      }}
                    >
                      {rolePermissions[role.name]?.length || 0} permissions
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card sx={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        mb: { xs: 2, sm: 3 },
        width: '100%',
        maxWidth: '100%'
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 2 }, 
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 3 }, 
              alignItems: { xs: 'stretch', sm: 'center' },
              flex: 1
            }}>
              <TextField
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{
                  width: { xs: '100%', sm: 300 },
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
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
                      <Search sx={{ color: '#94a3b8', fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                    </InputAdornment>
                  )
                }}
              />
              
              <Button
                variant={bulkMode ? 'contained' : 'outlined'}
                onClick={() => setBulkMode(!bulkMode)}
                sx={{
                  borderColor: '#475569',
                  color: '#ffffff',
                  backgroundColor: bulkMode ? '#3b82f6' : 'transparent',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  height: { xs: '40px', sm: '36px' },
                  minWidth: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    borderColor: '#94a3b8',
                    backgroundColor: bulkMode ? '#2563eb' : 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Bulk Mode
              </Button>
            </Box>
            
            {hasChanges && (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1.5, sm: 2 },
                width: { xs: '100%', sm: 'auto' }
              }}>
                <Button
                  variant="outlined"
                  onClick={handleCancelChanges}
                  startIcon={<Cancel />}
                  sx={{
                    borderColor: '#ef4444',
                    color: '#ef4444',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    height: { xs: '40px', sm: '36px' },
                    '&:hover': {
                      borderColor: '#dc2626',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }
                  }}
                >
                  Cancel Changes
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setShowConfirmDialog(true)}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#059669',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    height: { xs: '40px', sm: '36px' },
                    '&:hover': {
                      backgroundColor: '#047857'
                    }
                  }}
                >
                  Save Changes ({pendingChanges.length})
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {bulkMode && (
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          mb: { xs: 2, sm: 3 },
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                color: '#ffffff', 
                mb: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Bulk Role Assignment
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 2 }, 
              alignItems: { xs: 'stretch', sm: 'center' },
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#94a3b8',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  alignSelf: { xs: 'flex-start', sm: 'center' },
                  wordBreak: 'break-word',
                  overflow: 'hidden'
                }}
              >
                {selectedMembers.length} member(s) selected
              </Typography>
              
              <FormControl 
                size="small" 
                sx={{ 
                  minWidth: { xs: '100%', sm: 200 },
                  flex: { xs: 'none', sm: 1 },
                  maxWidth: { xs: '100%', sm: 300 },
                  width: { xs: '100%', sm: 'auto' },
                  boxSizing: 'border-box'
                }}
              >
                <InputLabel sx={{ color: '#94a3b8', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Assign Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  label="Assign Role"
                  sx={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#334155'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#475569'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6'
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#1e293b',
                        border: '1px solid #334155',
                        color: '#ffffff'
                      }
                    }
                  }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.name} value={role.name} sx={{ color: '#ffffff' }}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                onClick={handleBulkRoleAssign}
                disabled={selectedMembers.length === 0 || !selectedRole}
                startIcon={<AssignmentInd />}
                sx={{
                  backgroundColor: '#3b82f6',
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  height: { xs: '40px', sm: '36px' },
                  minWidth: { xs: '100%', sm: 'auto' },
                  width: { xs: '100%', sm: 'auto' },
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  '&:hover': {
                    backgroundColor: '#2563eb'
                  },
                  '&:disabled': {
                    backgroundColor: '#374151',
                    color: '#6b7280'
                  }
                }}
              >
                Assign Role
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Members Table/Cards */}
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        {/* Mobile Cards */}
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          {bulkMode && (
            <Card sx={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              boxShadow: 'none',
              mb: 2
            }}>
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Checkbox
                    checked={filteredMembers.length > 0 && filteredMembers.every(member => member.selected)}
                    indeterminate={filteredMembers.some(member => member.selected) && !filteredMembers.every(member => member.selected)}
                    onChange={handleSelectAll}
                    sx={{ color: '#94a3b8' }}
                  />
                  <Typography variant="body2" sx={{ color: '#ffffff' }}>
                    Select All Members
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
          
          <Grid container spacing={2}>
            {filteredMembers.map((member) => {
              const pendingChange = pendingChanges.find(change => change.memberId === member.id);
              return (
                <Grid sx={{xs:12}} key={member.id}>
                  <Card sx={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    boxShadow: 'none',
                    width: '100%'
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Member Info */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {bulkMode && (
                            <Checkbox
                              checked={member.selected || false}
                              onChange={() => handleMemberSelect(member.id)}
                              sx={{ color: '#94a3b8' }}
                            />
                          )}
                          <Avatar sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: '#3b82f6',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}>
                            {member.avatar}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff' }}>
                              {member.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                              {member.email}
                            </Typography>
                          </Box>
                        </Box>
                        
                        {/* Role and Department */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Current Role:</Typography>
                            <Chip
                              label={member.currentRole}
                              size="small"
                              sx={{
                                backgroundColor: getRoleColor(member.currentRole),
                                color: '#ffffff',
                                fontWeight: 500,
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>Department:</Typography>
                            <Typography variant="body2" sx={{ color: '#ffffff' }}>
                              {member.department}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>New Role:</Typography>
                            <FormControl size="small" sx={{ width: '100%' }}>
                              <Select
                                value={pendingChange?.newRole || member.currentRole}
                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                sx={{
                                  backgroundColor: pendingChange ? '#1e40af' : '#0f172a',
                                  color: '#ffffff',
                                  fontSize: '0.875rem',
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: pendingChange ? '#3b82f6' : '#334155'
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#475569'
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#3b82f6'
                                  }
                                }}
                                MenuProps={{
                                  PaperProps: {
                                    sx: {
                                      backgroundColor: '#1e293b',
                                      border: '1px solid #334155',
                                      color: '#ffffff'
                                    }
                                  }
                                }}
                              >
                                {roles.map((role) => (
                                  <MenuItem key={role.name} value={role.name} sx={{ color: '#ffffff' }}>
                                    {role.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
        
        {/* Desktop Table */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none'
          }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {bulkMode && (
                      <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                        <Checkbox
                          checked={filteredMembers.length > 0 && filteredMembers.every(member => member.selected)}
                          indeterminate={filteredMembers.some(member => member.selected) && !filteredMembers.every(member => member.selected)}
                          onChange={handleSelectAll}
                          sx={{ color: '#94a3b8' }}
                        />
                      </TableCell>
                    )}
                    <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Member</TableCell>
                    <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Current Role</TableCell>
                    <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Department</TableCell>
                    <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>New Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers.map((member) => {
                    const pendingChange = pendingChanges.find(change => change.memberId === member.id);
                    return (
                      <TableRow key={member.id} sx={{ '&:hover': { backgroundColor: '#334155' } }}>
                        {bulkMode && (
                          <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                            <Checkbox
                              checked={member.selected || false}
                              onChange={() => handleMemberSelect(member.id)}
                              sx={{ color: '#94a3b8' }}
                            />
                          </TableCell>
                        )}
                        <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ 
                              width: 40, 
                              height: 40, 
                              backgroundColor: '#3b82f6',
                              fontSize: '0.9rem',
                              fontWeight: 600
                            }}>
                              {member.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff' }}>
                                {member.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                {member.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                          <Chip
                            label={member.currentRole}
                            size="small"
                            sx={{
                              backgroundColor: getRoleColor(member.currentRole),
                              color: '#ffffff',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: '#ffffff', borderBottom: '1px solid #334155' }}>
                          {member.department}
                        </TableCell>
                        <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                          <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                              value={pendingChange?.newRole || member.currentRole}
                              onChange={(e) => handleRoleChange(member.id, e.target.value)}
                              sx={{
                                backgroundColor: pendingChange ? '#1e40af' : '#0f172a',
                                color: '#ffffff',
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: pendingChange ? '#3b82f6' : '#334155'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#475569'
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#3b82f6'
                                }
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    color: '#ffffff'
                                  }
                                }
                              }}
                            >
                              {roles.map((role) => (
                                <MenuItem key={role.name} value={role.name} sx={{ color: '#ffffff' }}>
                                  {role.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelChanges}
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff' }}>
          Confirm Role Changes
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
            You are about to change roles for {pendingChanges.length} member(s). This action cannot be undone.
          </Typography>
          
          <Alert 
            severity="warning" 
            sx={{ 
              backgroundColor: '#1e293b',
              border: '1px solid #f59e0b',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#f59e0b'
              }
            }}
          >
            Role changes will take effect immediately and may affect member permissions.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelChanges} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveChanges} 
            disabled={saving}
            variant="contained"
            sx={{
              backgroundColor: '#059669',
              '&:hover': {
                backgroundColor: '#047857'
              }
            }}
          >
            {saving ? 'Saving...' : 'Confirm Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
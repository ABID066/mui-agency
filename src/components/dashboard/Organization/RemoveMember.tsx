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
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  Search,
  PersonRemove,
  Warning,
  Delete
} from '@mui/icons-material';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  avatar: string;
  selected?: boolean;
  isOwner?: boolean;
}

const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@agencyboost.com',
    role: 'Admin',
    department: 'Management',
    joinDate: '2024-01-15',
    avatar: 'JD',
    isOwner: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@agencyboost.com',
    role: 'Manager',
    department: 'Marketing',
    joinDate: '2024-02-01',
    avatar: 'JS'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@agencyboost.com',
    role: 'Member',
    department: 'Development',
    joinDate: '2024-02-15',
    avatar: 'MJ'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@agencyboost.com',
    role: 'Member',
    department: 'Design',
    joinDate: '2024-03-01',
    avatar: 'SW'
  },
  {
    id: '5',
    name: 'Alex Brown',
    email: 'alex.brown@agencyboost.com',
    role: 'Viewer',
    department: 'Marketing',
    joinDate: '2024-03-10',
    avatar: 'AB'
  }
];

export default function RemoveMember() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
  const [removalReason, setRemovalReason] = useState('');
  const [transferData, setTransferData] = useState(true);
  const [removing, setRemoving] = useState(false);

  const handleMemberSelect = (member: TeamMember) => {
    if (member.isOwner) return; // Can't remove owner
    
    setMembers(prev => prev.map(m => 
      m.id === member.id 
        ? { ...m, selected: !m.selected }
        : m
    ));
  };

  const handleSelectAll = () => {
    const removableMembers = filteredMembers.filter(member => !member.isOwner);
    const allSelected = removableMembers.every(member => member.selected);
    
    setMembers(prev => prev.map(member => ({
      ...member,
      selected: member.isOwner ? false : removableMembers.some(rm => rm.id === member.id) ? !allSelected : member.selected
    })));
  };

  const handleRemoveMembers = () => {
    const selected = members.filter(member => member.selected && !member.isOwner);
    setSelectedMembers(selected);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemoval = async () => {
    setRemoving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Remove selected members
    setMembers(prev => prev.filter(member => !member.selected));
    
    setRemoving(false);
    setShowConfirmDialog(false);
    setSelectedMembers([]);
    setRemovalReason('');
    setTransferData(true);
  };

  const handleCancelRemoval = () => {
    setShowConfirmDialog(false);
    setSelectedMembers([]);
    setRemovalReason('');
    setTransferData(true);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#ef4444';
      case 'manager':
        return '#3b82f6';
      case 'member':
        return '#6b7280';
      case 'viewer':
        return '#94a3b8';
      default:
        return '#6b7280';
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCount = members.filter(member => member.selected).length;
  const removableMembers = filteredMembers.filter(member => !member.isOwner);

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Remove Team Members
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Remove members from your organization
        </Typography>
      </Box>

      {/* Warning Alert */}
      <Alert 
        severity="warning" 
        sx={{ 
          mb: 4,
          backgroundColor: '#1e293b',
          border: '1px solid #f59e0b',
          color: '#ffffff',
          '& .MuiAlert-icon': {
            color: '#f59e0b'
          }
        }}
      >
        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
          Important: Removing members is permanent
        </Typography>
        <Typography variant="body2">
          Removed members will lose access to all organization resources immediately. Consider transferring their data before removal.
        </Typography>
      </Alert>

      {/* Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <TextField
          placeholder="Search members..."
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
          onClick={handleRemoveMembers}
          disabled={selectedCount === 0}
          startIcon={<PersonRemove />}
          sx={{
            backgroundColor: '#ef4444',
            '&:hover': {
              backgroundColor: '#dc2626'
            },
            '&:disabled': {
              backgroundColor: '#374151',
              color: '#6b7280'
            }
          }}
        >
          Remove Selected ({selectedCount})
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1
        }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
              Total Members
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
              {members.length}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1
        }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
              Removable Members
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
              {removableMembers.length}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1
        }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
              Selected for Removal
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: selectedCount > 0 ? '#ef4444' : '#ffffff' }}>
              {selectedCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Members Table */}
      <Card sx={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>
                  <Checkbox
                    checked={removableMembers.length > 0 && removableMembers.every(member => member.selected)}
                    indeterminate={removableMembers.some(member => member.selected) && !removableMembers.every(member => member.selected)}
                    onChange={handleSelectAll}
                    sx={{ color: '#94a3b8' }}
                  />
                </TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Member</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Role</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Department</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Join Date</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow 
                  key={member.id} 
                  sx={{ 
                    '&:hover': { backgroundColor: member.isOwner ? 'transparent' : '#334155' },
                    opacity: member.isOwner ? 0.6 : 1
                  }}
                >
                  <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                    <Checkbox
                      checked={member.selected || false}
                      onChange={() => handleMemberSelect(member)}
                      disabled={member.isOwner}
                      sx={{ color: '#94a3b8' }}
                    />
                  </TableCell>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff' }}>
                            {member.name}
                          </Typography>
                          {member.isOwner && (
                            <Chip
                              label="Owner"
                              size="small"
                              sx={{
                                backgroundColor: '#059669',
                                color: '#ffffff',
                                fontWeight: 500,
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          {member.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                    <Chip
                      label={member.role}
                      size="small"
                      sx={{
                        backgroundColor: getRoleColor(member.role),
                        color: '#ffffff',
                        fontWeight: 500
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff', borderBottom: '1px solid #334155' }}>
                    {member.department}
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff', borderBottom: '1px solid #334155' }}>
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                    {member.isOwner ? (
                      <Chip
                        label="Protected"
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: '#6b7280',
                          color: '#6b7280'
                        }}
                      />
                    ) : (
                      <Chip
                        label="Removable"
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: member.selected ? '#ef4444' : '#059669',
                          color: member.selected ? '#ef4444' : '#059669'
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelRemoval}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            color: '#ffffff'
          }
        }}
      >
        <DialogTitle sx={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Warning sx={{ color: '#ef4444' }} />
          Confirm Member Removal
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
            You are about to remove {selectedMembers.length} member(s) from the organization. This action cannot be undone.
          </Typography>
          
          {/* Members to be removed */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', mb: 2 }}>
              Members to be removed:
            </Typography>
            {selectedMembers.map((member) => (
              <Box key={member.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>
                  {member.avatar}
                </Avatar>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>
                  {member.name} ({member.role})
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Data Transfer Option */}
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ color: '#ffffff', mb: 2 }}>
              Data Transfer
            </FormLabel>
            <RadioGroup
              value={transferData}
              onChange={(e) => setTransferData(e.target.value === 'true')}
            >
              <FormControlLabel 
                value={true} 
                control={<Radio sx={{ color: '#94a3b8' }} />} 
                label="Transfer member data to organization admin"
                sx={{ color: '#94a3b8' }}
              />
              <FormControlLabel 
                value={false} 
                control={<Radio sx={{ color: '#94a3b8' }} />} 
                label="Delete all member data permanently"
                sx={{ color: '#94a3b8' }}
              />
            </RadioGroup>
          </FormControl>
          
          {/* Removal Reason */}
          <TextField
            fullWidth
            label="Reason for Removal (Optional)"
            value={removalReason}
            onChange={(e) => setRemovalReason(e.target.value)}
            multiline
            rows={3}
            placeholder="Provide a reason for removing these members..."
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#0f172a',
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
              '& .MuiInputLabel-root': {
                color: '#94a3b8'
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#6b7280',
                opacity: 1
              }
            }}
          />
          
          <Alert 
            severity="error" 
            sx={{ 
              mt: 3,
              backgroundColor: '#1e293b',
              border: '1px solid #ef4444',
              color: '#ffffff',
              '& .MuiAlert-icon': {
                color: '#ef4444'
              }
            }}
          >
            This action is permanent and cannot be undone. Removed members will lose access immediately.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCancelRemoval} sx={{ color: '#94a3b8' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmRemoval} 
            disabled={removing}
            variant="contained"
            startIcon={<Delete />}
            sx={{
              backgroundColor: '#ef4444',
              '&:hover': {
                backgroundColor: '#dc2626'
              }
            }}
          >
            {removing ? 'Removing...' : `Remove ${selectedMembers.length} Member(s)`}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
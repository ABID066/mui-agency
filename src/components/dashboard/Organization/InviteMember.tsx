'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Grid,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from '@mui/material';
import {
  Delete,
  Email,
  PersonAdd,
  Send
} from '@mui/icons-material';

interface InviteData {
  email: string;
  role: string;
  department: string;
  message: string;
}

interface PendingInvite extends InviteData {
  id: string;
  sentDate: string;
}

const roles = ['Admin', 'Manager', 'Member', 'Viewer'];
const departments = ['Management', 'Marketing', 'Development', 'Design', 'Sales', 'Support', 'HR', 'Finance'];

export default function InviteMember() {
  const [inviteData, setInviteData] = useState<InviteData>({
    email: '',
    role: '',
    department: '',
    message: ''
  });
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([
    {
      id: '1',
      email: 'sarah.wilson@example.com',
      role: 'Member',
      department: 'Design',
      message: 'Welcome to our team!',
      sentDate: '2024-03-01'
    },
    {
      id: '2',
      email: 'alex.brown@example.com',
      role: 'Manager',
      department: 'Marketing',
      message: 'Looking forward to working with you!',
      sentDate: '2024-03-02'
    }
  ]);
  const [sending, setSending] = useState(false);
  const [bulkEmails, setBulkEmails] = useState('');
  const [showBulkInvite, setShowBulkInvite] = useState(false);

  const handleInputChange = (field: keyof InviteData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInviteData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof InviteData) => (event: { target: { value: string } }) => {
    setInviteData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSendInvite = async () => {
    if (!inviteData.email || !inviteData.role || !inviteData.department) {
      return;
    }

    setSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add to pending invites
    const newInvite: PendingInvite = {
      ...inviteData,
      id: Date.now().toString(),
      sentDate: new Date().toISOString().split('T')[0]
    };
    
    setPendingInvites(prev => [newInvite, ...prev]);
    
    // Reset form
    setInviteData({
      email: '',
      role: '',
      department: '',
      message: ''
    });
    
    setSending(false);
  };

  const handleBulkInvite = async () => {
    if (!bulkEmails.trim() || !inviteData.role || !inviteData.department) {
      return;
    }

    setSending(true);
    const emails = bulkEmails.split('\n').filter(email => email.trim());
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add all emails to pending invites
    const newInvites: PendingInvite[] = emails.map(email => ({
      email: email.trim(),
      role: inviteData.role,
      department: inviteData.department,
      message: inviteData.message,
      id: `${Date.now()}-${Math.random()}`,
      sentDate: new Date().toISOString().split('T')[0]
    }));
    
    setPendingInvites(prev => [...newInvites, ...prev]);
    
    // Reset form
    setBulkEmails('');
    setInviteData({
      email: '',
      role: '',
      department: '',
      message: ''
    });
    
    setSending(false);
    setShowBulkInvite(false);
  };

  const handleDeleteInvite = (id: string) => {
    setPendingInvites(prev => prev.filter(invite => invite.id !== id));
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

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Invite Team Members
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Send invitations to new team members to join your organization
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Invite Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            mb: 4
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                  {showBulkInvite ? 'Bulk Invite' : 'Single Invite'}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setShowBulkInvite(!showBulkInvite)}
                  sx={{
                    borderColor: '#475569',
                    color: '#ffffff',
                    '&:hover': {
                      borderColor: '#94a3b8',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                >
                  {showBulkInvite ? 'Single Invite' : 'Bulk Invite'}
                </Button>
              </Box>
              
              <Grid container spacing={3}>
                {showBulkInvite ? (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email Addresses (one per line)"
                      value={bulkEmails}
                      onChange={(e) => setBulkEmails(e.target.value)}
                      multiline
                      rows={6}
                      placeholder="john.doe@example.com\njane.smith@example.com\nmike.johnson@example.com"
                      required
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
                  </Grid>
                ) : (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      value={inviteData.email}
                      onChange={handleInputChange('email')}
                      required
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
                        }
                      }}
                    />
                  </Grid>
                )}
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{ color: '#94a3b8' }}>Role</InputLabel>
                    <Select
                      value={inviteData.role}
                      onChange={handleSelectChange('role')}
                      label="Role"
                      sx={{
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
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
                        <MenuItem key={role} value={role} sx={{ color: '#ffffff' }}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth required>
                    <InputLabel sx={{ color: '#94a3b8' }}>Department</InputLabel>
                    <Select
                      value={inviteData.department}
                      onChange={handleSelectChange('department')}
                      label="Department"
                      sx={{
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
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
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept} sx={{ color: '#ffffff' }}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Welcome Message (Optional)"
                    value={inviteData.message}
                    onChange={handleInputChange('message')}
                    multiline
                    rows={3}
                    placeholder="Welcome to our team! We're excited to have you join us."
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
                </Grid>
                
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    onClick={showBulkInvite ? handleBulkInvite : handleSendInvite}
                    disabled={sending || !inviteData.role || !inviteData.department || (!inviteData.email && !bulkEmails.trim())}
                    startIcon={showBulkInvite ? <Send /> : <PersonAdd />}
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
                    {sending ? 'Sending...' : showBulkInvite ? 'Send Bulk Invites' : 'Send Invite'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Invites */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 3 }}>
                Pending Invites ({pendingInvites.length})
              </Typography>
              
              {pendingInvites.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Email sx={{ fontSize: 48, color: '#6b7280', mb: 2 }} />
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    No pending invites
                  </Typography>
                </Box>
              ) : (
                <List sx={{ p: 0 }}>
                  {pendingInvites.map((invite, index) => (
                    <React.Fragment key={invite.id}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff', mb: 1 }}>
                              {invite.email}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Chip
                                  label={invite.role}
                                  size="small"
                                  sx={{
                                    backgroundColor: getRoleColor(invite.role),
                                    color: '#ffffff',
                                    fontWeight: 500,
                                    fontSize: '0.7rem'
                                  }}
                                />
                                <Chip
                                  label={invite.department}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    borderColor: '#475569',
                                    color: '#94a3b8',
                                    fontSize: '0.7rem'
                                  }}
                                />
                              </Box>
                              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                                Sent: {new Date(invite.sentDate).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteInvite(invite.id)}
                            sx={{ color: '#ef4444' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < pendingInvites.length - 1 && (
                        <Divider sx={{ backgroundColor: '#334155' }} />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Info Alert */}
      <Alert 
        severity="info" 
        sx={{ 
          mt: 4,
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          color: '#ffffff',
          '& .MuiAlert-icon': {
            color: '#3b82f6'
          }
        }}
      >
        Invited members will receive an email with instructions to join your organization. They will have 7 days to accept the invitation.
      </Alert>
    </Box>
  );
}
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
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search,
  MoreVert,
  PersonAdd,
  AssignmentInd,
  PersonRemove,
  Email,
  Phone
} from '@mui/icons-material';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar: string;
}

const mockMembers: TeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@agencyboost.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    department: 'Management',
    status: 'active',
    joinDate: '2024-01-15',
    avatar: 'JD'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@agencyboost.com',
    phone: '+1 (555) 234-5678',
    role: 'Manager',
    department: 'Marketing',
    status: 'active',
    joinDate: '2024-02-01',
    avatar: 'JS'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@agencyboost.com',
    phone: '+1 (555) 345-6789',
    role: 'Member',
    department: 'Development',
    status: 'active',
    joinDate: '2024-02-15',
    avatar: 'MJ'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@agencyboost.com',
    phone: '+1 (555) 456-7890',
    role: 'Member',
    department: 'Design',
    status: 'pending',
    joinDate: '2024-03-01',
    avatar: 'SW'
  }
];

export default function TeamMembers() {
  const [members] = useState<TeamMember[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return '#ef4444';
      case 'manager':
        return '#3b82f6';
      case 'member':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#059669';
      case 'inactive':
        return '#6b7280';
      case 'pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const filterMembersByTab = (members: TeamMember[]) => {
    switch (tabValue) {
      case 0:
        return members; // All
      case 1:
        return members.filter(member => member.status === 'active');
      case 2:
        return members.filter(member => member.status === 'pending');
      case 3:
        return members.filter(member => member.status === 'inactive');
      default:
        return members;
    }
  };

  const filteredMembers = filterMembersByTab(members).filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 3 }, 
      color: '#ffffff',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, md: 3 }, width: '100%', maxWidth: '100%' }}>
        <Typography 
          variant="h5" 
          fontWeight={600} 
          sx={{ 
            color: '#ffffff', 
            mb: 1,
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            wordBreak: 'break-word'
          }}
        >
          Team Members
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#94a3b8',
            fontSize: { xs: '0.75rem', md: '0.875rem' }
          }}
        >
          Manage your organization&apos;s team members and their roles
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 2 }, 
        mb: { xs: 2, md: 3 },
        width: '100%',
        maxWidth: '100%'
      }}>
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1,
          width: '100%',
          maxWidth: '100%'
        }}>
          <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Total Members
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {members.length}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1,
          width: '100%',
          maxWidth: '100%'
        }}>
          <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Active Members
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {members.filter(m => m.status === 'active').length}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: 'none',
          flex: 1,
          width: '100%',
          maxWidth: '100%'
        }}>
          <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              Pending Invites
            </Typography>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff', fontSize: { xs: '1.5rem', md: '2rem' } }}>
              {members.filter(m => m.status === 'pending').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Actions and Search */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 2, sm: 2 },
        mb: 3,
        width: '100%',
        maxWidth: '100%'
      }}>
        <TextField
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: { xs: '100%', sm: 300 },
            maxWidth: '100%',
            fontSize: { xs: '0.875rem', md: '1rem' },
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
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <Button
            variant="outlined"
            startIcon={<AssignmentInd />}
            sx={{
              borderColor: '#475569',
              color: '#ffffff',
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              minWidth: { xs: 'auto', sm: 'auto' },
              px: { xs: 2, sm: 2 },
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            Assign Roles
          </Button>
          
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            sx={{
              backgroundColor: '#3b82f6',
              width: { xs: '100%', sm: 'auto' },
              fontSize: { xs: '0.75rem', md: '0.875rem' },
              minWidth: { xs: 'auto', sm: 'auto' },
              px: { xs: 2, sm: 2 },
              '&:hover': {
                backgroundColor: '#2563eb'
              }
            }}
          >
            Invite Member
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{
          mb: 3,
          width: '100%',
          maxWidth: '100%',
          '& .MuiTab-root': {
            color: '#94a3b8',
            minWidth: { xs: 80, sm: 120 },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
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
        <Tab label="All Members" />
        <Tab label="Active" />
        <Tab label="Pending" />
        <Tab label="Inactive" />
      </Tabs>

      {/* Members Table */}
      <Card sx={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        width: '100%',
        maxWidth: '100%'
      }}>
        <TableContainer sx={{ 
          overflowX: 'auto',
          width: '100%',
          maxWidth: '100%'
        }}>
          <Table sx={{ 
            minWidth: { xs: 700, md: 800 },
            width: '100%'
          }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  color: '#94a3b8', 
                  borderBottom: '1px solid #334155',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 200, md: 250 }
                }}>Member</TableCell>
                <TableCell sx={{ 
                  color: '#94a3b8', 
                  borderBottom: '1px solid #334155',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 80, md: 100 }
                }}>Role</TableCell>
                <TableCell sx={{ 
                  color: '#94a3b8', 
                  borderBottom: '1px solid #334155',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 100, md: 120 }
                }}>Department</TableCell>
                <TableCell sx={{ 
                  color: '#94a3b8', 
                  borderBottom: '1px solid #334155',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 80, md: 100 }
                }}>Status</TableCell>
                <TableCell sx={{ 
                  color: '#94a3b8', 
                  borderBottom: '1px solid #334155',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 100, md: 120 }
                }}>Join Date</TableCell>
                <TableCell sx={{ 
                  color: '#94a3b8', 
                  borderBottom: '1px solid #334155',
                  fontSize: { xs: '0.75rem', md: '0.875rem' },
                  minWidth: { xs: 60, md: 80 }
                }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMembers.map((member) => (
                <TableRow key={member.id} sx={{ '&:hover': { backgroundColor: '#334155' } }}>
                  <TableCell sx={{ 
                    borderBottom: '1px solid #334155',
                    minWidth: { xs: 200, md: 250 },
                    maxWidth: { xs: 250, md: 300 }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' }, 
                      gap: { xs: 1, sm: 2 }
                    }}>
                      <Avatar sx={{ 
                        width: { xs: 32, md: 40 }, 
                        height: { xs: 32, md: 40 }, 
                        backgroundColor: '#3b82f6',
                        fontSize: { xs: '0.75rem', md: '0.9rem' },
                        fontWeight: 600
                      }}>
                        {member.avatar}
                      </Avatar>
                      <Box sx={{ width: '100%', minWidth: 0 }}>
                        <Typography 
                          variant="body2" 
                          fontWeight={600} 
                          sx={{ 
                            color: '#ffffff',
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                            wordBreak: 'break-word'
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: 0.5, 
                          mt: 0.5 
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Email sx={{ fontSize: { xs: 12, md: 14 }, color: '#94a3b8' }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#94a3b8',
                                fontSize: { xs: '0.625rem', md: '0.75rem' },
                                wordBreak: 'break-all'
                              }}
                            >
                              {member.email}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Phone sx={{ fontSize: { xs: 12, md: 14 }, color: '#94a3b8' }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#94a3b8',
                                fontSize: { xs: '0.625rem', md: '0.75rem' }
                              }}
                            >
                              {member.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ 
                    borderBottom: '1px solid #334155',
                    minWidth: { xs: 80, md: 100 }
                  }}>
                    <Chip
                      label={member.role}
                      size="small"
                      sx={{
                        backgroundColor: getRoleColor(member.role),
                        color: '#ffffff',
                        fontWeight: 500,
                        fontSize: { xs: '0.625rem', md: '0.75rem' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ 
                    color: '#ffffff', 
                    borderBottom: '1px solid #334155',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    minWidth: { xs: 100, md: 120 },
                    wordBreak: 'break-word'
                  }}>
                    {member.department}
                  </TableCell>
                  <TableCell sx={{ 
                    borderBottom: '1px solid #334155',
                    minWidth: { xs: 80, md: 100 }
                  }}>
                    <Chip
                      label={member.status}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: getStatusColor(member.status),
                        color: getStatusColor(member.status),
                        textTransform: 'capitalize',
                        fontSize: { xs: '0.625rem', md: '0.75rem' }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ 
                    color: '#ffffff', 
                    borderBottom: '1px solid #334155',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    minWidth: { xs: 100, md: 120 },
                    whiteSpace: 'nowrap'
                  }}>
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ 
                    borderBottom: '1px solid #334155',
                    minWidth: { xs: 60, md: 80 }
                  }}>
                    <IconButton
                      size="small"
                      onClick={handleMenuOpen}
                      sx={{ 
                        color: '#94a3b8',
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 }
                      }}
                    >
                      <MoreVert sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          component="div"
          count={filteredMembers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#94a3b8',
            borderTop: '1px solid #334155',
            '& .MuiTablePagination-selectIcon': {
              color: '#94a3b8'
            }
          }}
        />
      </Card>

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
          <AssignmentInd sx={{ mr: 2 }} />
          Assign Role
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ffffff' }}>
          <Email sx={{ mr: 2 }} />
          Send Message
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ef4444' }}>
          <PersonRemove sx={{ mr: 2 }} />
          Remove Member
        </MenuItem>
      </Menu>
    </Box>
  );
}
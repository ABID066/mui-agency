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
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Team Members
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage your organization&apos;s team members and their roles
        </Typography>
      </Box>

      {/* Stats Cards */}
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
              Active Members
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
              {members.filter(m => m.status === 'active').length}
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
              Pending Invites
            </Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff' }}>
              {members.filter(m => m.status === 'pending').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Actions and Search */}
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
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AssignmentInd />}
            sx={{
              borderColor: '#475569',
              color: '#ffffff',
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
        sx={{
          mb: 3,
          '& .MuiTab-root': {
            color: '#94a3b8',
            '&.Mui-selected': {
              color: '#ffffff'
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#3b82f6'
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
        boxShadow: 'none'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Member</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Role</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Department</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Status</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Join Date</TableCell>
                <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMembers.map((member) => (
                <TableRow key={member.id} sx={{ '&:hover': { backgroundColor: '#334155' } }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Email sx={{ fontSize: 14, color: '#94a3b8' }} />
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            {member.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Phone sx={{ fontSize: 14, color: '#94a3b8' }} />
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            {member.phone}
                          </Typography>
                        </Box>
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
                  <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                    <Chip
                      label={member.status}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: getStatusColor(member.status),
                        color: getStatusColor(member.status),
                        textTransform: 'capitalize'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#ffffff', borderBottom: '1px solid #334155' }}>
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #334155' }}>
                    <IconButton
                      size="small"
                      onClick={handleMenuOpen}
                      sx={{ color: '#94a3b8' }}
                    >
                      <MoreVert />
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
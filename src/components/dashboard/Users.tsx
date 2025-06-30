'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  TablePagination,
  FormControl,
  Select,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  PersonAdd,
  People,
  AdminPanelSettings,
  Block,
  CheckCircle,
  Email,
  Phone,
  Edit,
  
} from '@mui/icons-material';

// Sample user data
const users = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-02-15 10:30 AM',
    joinDate: '2023-01-15',
    avatar: 'SJ',
    department: 'Engineering'
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    phone: '+1 (555) 234-5678',
    role: 'Developer',
    status: 'Active',
    lastLogin: '2024-02-15 09:15 AM',
    joinDate: '2023-03-20',
    avatar: 'MC',
    department: 'Engineering'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    phone: '+1 (555) 345-6789',
    role: 'Designer',
    status: 'Active',
    lastLogin: '2024-02-14 04:45 PM',
    joinDate: '2023-02-10',
    avatar: 'ED',
    department: 'Design'
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    phone: '+1 (555) 456-7890',
    role: 'Manager',
    status: 'Inactive',
    lastLogin: '2024-02-10 02:20 PM',
    joinDate: '2022-11-05',
    avatar: 'AR',
    department: 'Operations'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    phone: '+1 (555) 567-8901',
    role: 'Developer',
    status: 'Active',
    lastLogin: '2024-02-15 11:00 AM',
    joinDate: '2023-06-12',
    avatar: 'LW',
    department: 'Engineering'
  },
  {
    id: 6,
    name: 'David Brown',
    email: 'david.brown@company.com',
    phone: '+1 (555) 678-9012',
    role: 'Analyst',
    status: 'Pending',
    lastLogin: 'Never',
    joinDate: '2024-02-14',
    avatar: 'DB',
    department: 'Analytics'
  },
  {
    id: 7,
    name: 'Jennifer Wilson',
    email: 'jennifer.wilson@company.com',
    phone: '+1 (555) 789-0123',
    role: 'Designer',
    status: 'Active',
    lastLogin: '2024-02-15 08:30 AM',
    joinDate: '2023-04-18',
    avatar: 'JW',
    department: 'Design'
  },
  {
    id: 8,
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    phone: '+1 (555) 890-1234',
    role: 'Support',
    status: 'Active',
    lastLogin: '2024-02-15 12:15 PM',
    joinDate: '2023-08-22',
    avatar: 'RT',
    department: 'Support'
  }
];

// User stats
const userStats = [
  { title: 'Total Users', value: '1,247', icon: People },
  { title: 'Active Users', value: '1,156', icon: CheckCircle },
  { title: 'Admins', value: '12', icon: AdminPanelSettings },
  { title: 'Blocked Users', value: '8', icon: Block }
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    case 'inactive':
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    case 'pending':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

function getRoleColor(role: string) {
  switch (role.toLowerCase()) {
    case 'admin':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'manager':
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
    case 'developer':
      return { backgroundColor: '#e0e7ff', color: '#3730a3' };
    case 'designer':
      return { backgroundColor: '#f3e8ff', color: '#7c2d12' };
    case 'analyst':
      return { backgroundColor: '#ecfdf5', color: '#065f46' };
    case 'support':
      return { backgroundColor: '#fef2f2', color: '#7f1d1d' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [userList, setUserList] = useState(users);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 1 }}>
          User Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Manage user accounts, roles, and permissions
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {userStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} sx={{ color: '#000000' }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar sx={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                      <IconComponent />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Users Table */}
      <Paper sx={{ 
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
        borderRadius: 2
      }}>
        {/* Table Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000000' }}>
              All Users
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#000000',
                  '&:hover': {
                    borderColor: '#000000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                startIcon={<PersonAdd />}
                onClick={() => setOpenDialog(true)}
                sx={{
                  backgroundColor: '#000000',
                  '&:hover': {
                    backgroundColor: '#374151'
                  }
                }}
              >
                Add User
              </Button>
            </Box>
          </Box>

          {/* Search and Filters */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search users..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#6b7280' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000000',
                  },
                },
              }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="designer">Designer</MenuItem>
                <MenuItem value="analyst">Analyst</MenuItem>
                <MenuItem value="support">Support</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table Content */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Last Login</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                        {user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#000000' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          Joined {user.joinDate}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: '#6b7280', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {user.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ fontSize: 14, color: '#6b7280', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {user.phone}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        ...getRoleColor(user.role),
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {user.department}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      sx={{
                        ...getStatusColor(user.status),
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {user.lastLogin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: '#6b7280' }}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, user.id)}
                        sx={{ color: '#6b7280' }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table Pagination */}
        <Divider />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              color: '#6b7280'
            }
          }}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>View Profile</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Edit User</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Change Role</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Reset Password</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Deactivate</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#dc2626' }}>Delete User</MenuItem>
      </Menu>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email Address"
                fullWidth
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select label="Department">
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="design">Design</MenuItem>
                  <MenuItem value="operations">Operations</MenuItem>
                  <MenuItem value="analytics">Analytics</MenuItem>
                  <MenuItem value="support">Support</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select label="Role">
                  <MenuItem value="developer">Developer</MenuItem>
                  <MenuItem value="designer">Designer</MenuItem>
                  <MenuItem value="analyst">Analyst</MenuItem>
                  <MenuItem value="support">Support</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="active">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Send welcome email to user"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={<Switch />}
                label="Grant admin privileges"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: '#6b7280' }}>
            Cancel
          </Button>
          <Button 
            onClick={() => setOpenDialog(false)} 
            variant="contained"
            sx={{
              backgroundColor: '#000000',
              '&:hover': {
                backgroundColor: '#374151'
              }
            }}
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
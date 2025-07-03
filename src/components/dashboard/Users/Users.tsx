'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import UserStats from './components/UserStats';
import UserTableHeader from './components/UserTableHeader';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';
import AddUserDialog from './components/AddUserDialog';
import UserActionMenu from './components/UserActionMenu';
import { defaultUsers, User } from './components/utils';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [userList] = useState<User[]>(defaultUsers);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          User Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage user accounts, roles, and permissions
        </Typography>
      </Box>

      {/* Stats Cards */}
      <UserStats />

      {/* Users Table */}
      <Box sx={{ 
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        borderRadius: 2
      }}>
        {/* Table Header */}
        <UserTableHeader onAddUser={() => setOpenDialog(true)} />
        
        {/* Search and Filters */}
        <Box sx={{ px: 3, pb: 3 }}>
          <UserFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            roleFilter={roleFilter}
            onSearchChange={setSearchTerm}
            onStatusFilterChange={setStatusFilter}
            onRoleFilterChange={setRoleFilter}
          />
        </Box>
      </Box>

      {/* User Table */}
      <Box sx={{ mt: 2 }}>
        <UserTable
          users={filteredUsers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onMenuClick={handleMenuClick}
        />
      </Box>

      {/* Action Menu */}
      <UserActionMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      />

      {/* Add User Dialog */}
      <AddUserDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </Box>
  );
}
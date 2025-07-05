'use client';

import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  TablePagination,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Email,
  Phone,
  Edit,
  MoreVert
} from '@mui/icons-material';
import { User, getStatusColor, getRoleColor } from './utils';

interface UserTableProps {
  users: User[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, userId: number) => void;
}

export default function UserTable({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onMenuClick
}: UserTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper sx={{ 
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      boxShadow: 'none',
      borderRadius: 2,
      overflow: 'hidden',
      maxWidth: '100%'
    }}>
      {/* Desktop Table View */}
      {!isMobile ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#334155' }}>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Last Login</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#334155' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#334155', color: '#94a3b8' }}>
                        {user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          Joined {user.joinDate}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Email sx={{ fontSize: 14, color: '#94a3b8', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          {user.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Phone sx={{ fontSize: 14, color: '#94a3b8', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
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
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {user.lastLogin}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: '#94a3b8' }}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => onMenuClick(e, user.id)}
                        sx={{ color: '#94a3b8' }}
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
      ) : (
        /* Mobile Card View */
        <Box sx={{ p: 2, overflow: 'hidden' }}>
          <Grid container spacing={2}>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
              <Grid sx={{ xs: 12 }} key={user.id}>
                <Card sx={{
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#475569'
                  }
                }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Avatar sx={{ width: 48, height: 48, mr: 2, backgroundColor: '#1e293b', color: '#94a3b8' }}>
                          {user.avatar}
                        </Avatar>
                        <Box sx={{ flex: 1, overflow: 'hidden' }}>
                          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 0.5, wordBreak: 'break-word' }}>
                            {user.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8', wordBreak: 'break-word' }}>
                            Joined {user.joinDate}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#94a3b8' }}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => onMenuClick(e, user.id)}
                          sx={{ color: '#94a3b8' }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, overflow: 'hidden' }}>
                        <Email sx={{ fontSize: 16, color: '#94a3b8', mr: 1, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: '#94a3b8', wordBreak: 'break-all', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {user.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <Phone sx={{ fontSize: 16, color: '#94a3b8', mr: 1, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ color: '#94a3b8', wordBreak: 'break-word' }}>
                          {user.phone}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 1 }}>
                      <Grid sx={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                          Role
                        </Typography>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            ...getRoleColor(user.role),
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            mt: 0.5
                          }}
                        />
                      </Grid>
                      <Grid sx={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                          Status
                        </Typography>
                        <Chip
                          label={user.status}
                          size="small"
                          sx={{
                            ...getStatusColor(user.status),
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            mt: 0.5
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                    <Grid container spacing={2}>
                      <Grid sx={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                          Department
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff', wordBreak: 'break-word' }}>
                          {user.department}
                        </Typography>
                      </Grid>
                      <Grid sx={{ xs: 6 }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                          Last Login
                        </Typography>
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff', wordBreak: 'break-word' }}>
                          {user.lastLogin}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Table Pagination */}
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          '& .MuiTablePagination-toolbar': {
            color: '#94a3b8'
          },
          '& .MuiTablePagination-selectLabel': {
            color: '#94a3b8'
          },
          '& .MuiTablePagination-displayedRows': {
            color: '#94a3b8'
          },
          '& .MuiIconButton-root': {
            color: '#94a3b8'
          }
        }}
      />
    </Paper>
  );
}
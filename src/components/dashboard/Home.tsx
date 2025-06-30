'use client';

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
  TablePagination
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  People,
  AttachMoney,
  Assignment
} from '@mui/icons-material';

// Sample order data
const orders = [
  { id: 'INV-1234', date: 'Feb 3, 2023', customer: 'Olivia Rhye', email: 'olivia@email.com', status: 'Refunded', amount: '$2,400' },
  { id: 'INV-1233', date: 'Feb 3, 2023', customer: 'Steve Hampton', email: 'steve.hamp@email.com', status: 'Paid', amount: '$1,800' },
  { id: 'INV-1232', date: 'Feb 3, 2023', customer: 'Ciaran Murray', email: 'ciaran.murray@email.com', status: 'Refunded', amount: '$3,200' },
  { id: 'INV-1231', date: 'Feb 3, 2023', customer: 'Maria Macdonald', email: 'maria.mc@email.com', status: 'Refunded', amount: '$1,600' },
  { id: 'INV-1230', date: 'Feb 3, 2023', customer: 'Charles Fulton', email: 'fulton@email.com', status: 'Cancelled', amount: '$2,800' },
  { id: 'INV-1229', date: 'Feb 3, 2023', customer: 'Jay Hooper', email: 'hooper@email.com', status: 'Cancelled', amount: '$1,200' },
  { id: 'INV-1228', date: 'Feb 3, 2023', customer: 'Krystal Stevens', email: 'k.stevens@email.com', status: 'Refunded', amount: '$2,000' },
  { id: 'INV-1227', date: 'Feb 3, 2023', customer: 'Sachin Flynn', email: 's.flyn@email.com', status: 'Paid', amount: '$3,600' },
];

// Dashboard stats
const stats = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', icon: AttachMoney },
  { title: 'Orders', value: '+2350', change: '+180.1%', trend: 'up', icon: ShoppingCart },
  { title: 'Customers', value: '+12,234', change: '+19%', trend: 'up', icon: People },
  { title: 'Active Now', value: '+573', change: '+201', trend: 'up', icon: Assignment },
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'paid':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    case 'refunded':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'cancelled':
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export default function DashboardHome() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Welcome to your order management dashboard
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container={true} spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => {
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
                      <Typography variant="h5" fontWeight={700} sx={{ color: '#000000', mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {stat.trend === 'up' ? (
                          <TrendingUp sx={{ fontSize: 16, color: '#059669', mr: 0.5 }} />
                        ) : (
                          <TrendingDown sx={{ fontSize: 16, color: '#dc2626', mr: 0.5 }} />
                        )}
                        <Typography variant="body2" sx={{ color: stat.trend === 'up' ? '#059669' : '#dc2626' }}>
                          {stat.change}
                        </Typography>
                      </Box>
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

      {/* Orders Table */}
      <Paper sx={{ 
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: 'none',
        borderRadius: 2
      }}>
        {/* Table Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000000' }}>
              Recent Orders
            </Typography>
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
          </Box>
          <TextField
            placeholder="Search orders..."
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
        </Box>

        {/* Table Content */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Order</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#f9fafb' } }}>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500} sx={{ color: '#000000' }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {order.date}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                        {order.customer.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500} sx={{ color: '#000000' }}>
                          {order.customer}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#6b7280' }}>
                          {order.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      sx={{
                        ...getStatusColor(order.status),
                        fontWeight: 500,
                        fontSize: '0.75rem'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500} sx={{ color: '#000000' }}>
                      {order.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={handleMenuClick}
                      sx={{ color: '#6b7280' }}
                    >
                      <MoreVert />
                    </IconButton>
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
          count={filteredOrders.length}
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
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Edit Order</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#dc2626' }}>Delete Order</MenuItem>
      </Menu>
    </Box>
  );
}
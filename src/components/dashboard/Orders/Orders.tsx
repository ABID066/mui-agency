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
  TablePagination,
  FormControl,
  Select,
  InputLabel,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  LocalShipping,
  CheckCircle,
  Cancel,
  Download,
  Visibility
} from '@mui/icons-material';

// Extended order data
const allOrders = [
  { id: 'ORD-2024-001', date: 'Feb 15, 2024', customer: 'Olivia Rhye', email: 'olivia@email.com', status: 'Delivered', amount: '$2,400', items: 3, shipping: 'Express' },
  { id: 'ORD-2024-002', date: 'Feb 14, 2024', customer: 'Steve Hampton', email: 'steve.hamp@email.com', status: 'Processing', amount: '$1,800', items: 2, shipping: 'Standard' },
  { id: 'ORD-2024-003', date: 'Feb 14, 2024', customer: 'Ciaran Murray', email: 'ciaran.murray@email.com', status: 'Shipped', amount: '$3,200', items: 5, shipping: 'Express' },
  { id: 'ORD-2024-004', date: 'Feb 13, 2024', customer: 'Maria Macdonald', email: 'maria.mc@email.com', status: 'Cancelled', amount: '$1,600', items: 1, shipping: 'Standard' },
  { id: 'ORD-2024-005', date: 'Feb 13, 2024', customer: 'Charles Fulton', email: 'fulton@email.com', status: 'Pending', amount: '$2,800', items: 4, shipping: 'Express' },
  { id: 'ORD-2024-006', date: 'Feb 12, 2024', customer: 'Jay Hooper', email: 'hooper@email.com', status: 'Delivered', amount: '$1,200', items: 2, shipping: 'Standard' },
  { id: 'ORD-2024-007', date: 'Feb 12, 2024', customer: 'Krystal Stevens', email: 'k.stevens@email.com', status: 'Processing', amount: '$2,000', items: 3, shipping: 'Express' },
  { id: 'ORD-2024-008', date: 'Feb 11, 2024', customer: 'Sachin Flynn', email: 's.flyn@email.com', status: 'Shipped', amount: '$3,600', items: 6, shipping: 'Express' },
  { id: 'ORD-2024-009', date: 'Feb 11, 2024', customer: 'Emma Wilson', email: 'emma.w@email.com', status: 'Delivered', amount: '$950', items: 1, shipping: 'Standard' },
  { id: 'ORD-2024-010', date: 'Feb 10, 2024', customer: 'David Brown', email: 'd.brown@email.com', status: 'Pending', amount: '$4,200', items: 8, shipping: 'Express' },
];

// Order stats
const orderStats = [
  { title: 'Total Orders', value: '2,847', change: '+12.5%', trend: 'up', icon: ShoppingCart },
  { title: 'Pending Orders', value: '156', change: '+8.2%', trend: 'up', icon: LocalShipping },
  { title: 'Completed', value: '2,234', change: '+15.3%', trend: 'up', icon: CheckCircle },
  { title: 'Cancelled', value: '89', change: '-5.1%', trend: 'down', icon: Cancel },
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'delivered':
      return { backgroundColor: '#1e293b', color: '#ffffff' };
    case 'shipped':
      return { backgroundColor: '#1e293b', color: '#ffffff' };
    case 'processing':
      return { backgroundColor: '#1e293b', color: '#ffffff' };
    case 'pending':
      return { backgroundColor: '#1e293b', color: '#ffffff' };
    case 'cancelled':
      return { backgroundColor: '#1e293b', color: '#ffffff' };
    default:
      return { backgroundColor: '#1e293b', color: '#ffffff' };
  }
}

function getShippingColor(shipping: string) {
  switch (shipping.toLowerCase()) {
    case 'express':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'standard':
      return { backgroundColor: '#e0e7ff', color: '#3730a3' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  // Filter orders based on tab and search
  const getFilteredOrders = () => {
    let filtered = allOrders;

    // Filter by tab
    switch (tabValue) {
      case 1: // Pending
        filtered = filtered.filter(order => order.status.toLowerCase() === 'pending');
        break;
      case 2: // Processing
        filtered = filtered.filter(order => order.status.toLowerCase() === 'processing');
        break;
      case 3: // Shipped
        filtered = filtered.filter(order => order.status.toLowerCase() === 'shipped');
        break;
      case 4: // Delivered
        filtered = filtered.filter(order => order.status.toLowerCase() === 'delivered');
        break;
      default: // All
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status dropdown
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === statusFilter);
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#0f172a', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Orders Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Track and manage customer orders and shipments
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {orderStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ 
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3)'
                }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
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
                    <Avatar sx={{ backgroundColor: '#475569', color: '#94a3b8' }}>
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
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        boxShadow: 'none',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        {/* Table Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' }, 
            justifyContent: 'space-between', 
            gap: { xs: 2, sm: 0 },
            mb: 3 
          }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', textAlign: { xs: 'center', sm: 'left' } }}>
              Order History
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2 
            }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#ffffff',
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    borderColor: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Export
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{
                  borderColor: '#d1d5db',
                  color: '#ffffff',
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': {
                    borderColor: '#ffffff',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                Filter
              </Button>
            </Box>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                color: '#94a3b8',
                minWidth: { xs: 100, md: 'auto' },
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                '&.Mui-selected': {
                  color: '#ffffff'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1e293b'
              },
              '& .MuiTabs-scrollButtons': {
                color: '#94a3b8'
              }
            }}
          >
            <Tab label="All Orders" />
            <Tab label="Pending" />
            <Tab label="Processing" />
            <Tab label="Shipped" />
            <Tab label="Delivered" />
          </Tabs>

          {/* Search and Filters */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2, 
            alignItems: { xs: 'stretch', sm: 'center' }
          }}>
            <TextField
                placeholder="Search orders..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    '& fieldset': {
                      borderColor: '#475569',
                    },
                    '&:hover fieldset': {
                      borderColor: '#64748b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
            />
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db',
                  },
                  color: '#ffffff',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#9ca3af',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },
                  
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="processing">Processing</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table Content - Desktop View */}
        {!isMobile ? (
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 'auto' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#0f172a' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Shipping</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                  <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#334155' } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {order.date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: '#1e293b', color: '#94a3b8' }}>
                          {order.customer.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {order.customer}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            {order.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                        {order.items} items
                      </Typography>
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
                      <Chip
                        label={order.shipping}
                        size="small"
                        sx={{
                          ...getShippingColor(order.shipping),
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                        {order.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#94a3b8' }}>
                          <Visibility />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleMenuClick}
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
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                <Grid sx={{ xs:12 }} key={order.id}>
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
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', mb: 0.5 }}>
                            {order.id}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            {order.date}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Chip
                            label={order.status}
                            size="small"
                            sx={{
                              ...getStatusColor(order.status),
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                          <Chip
                            label={order.shipping}
                            size="small"
                            sx={{
                              ...getShippingColor(order.shipping),
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#1e293b', color: '#94a3b8' }}>
                          {order.customer.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {order.customer}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            {order.email}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid sx={{ xs:4 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                            Items
                          </Typography>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {order.items}
                          </Typography>
                        </Grid>
                        <Grid sx={{ xs:4 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                            Amount
                          </Typography>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {order.amount}
                          </Typography>
                        </Grid>
                        <Grid sx={{ xs:4 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <IconButton size="small" sx={{ color: '#94a3b8' }}>
                              <Visibility />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={handleMenuClick}
                              sx={{ color: '#94a3b8' }}
                            >
                              <MoreVert />
                            </IconButton>
                          </Box>
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
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              color: '#94a3b8'
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
        <MenuItem onClick={handleMenuClose} sx={{ color: 'black' }}>View Details</MenuItem>
         <MenuItem onClick={handleMenuClose} sx={{ color: 'black' }}>Edit Order</MenuItem>
         <MenuItem onClick={handleMenuClose} sx={{ color: 'black' }}>Update Status</MenuItem>
         <MenuItem onClick={handleMenuClose} sx={{ color: 'black' }}>Print Invoice</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'black' }}>Cancel Order</MenuItem>
      </Menu>
    </Box>
  );
}
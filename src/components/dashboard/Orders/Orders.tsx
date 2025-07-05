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
  useMediaQuery,
  useTheme,
  LinearProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  TrendingUp,
  TrendingDown,
  Subscriptions,
  Person,
  CheckCircle,
  Cancel,
  Download,
  Visibility,
 
} from '@mui/icons-material';

// Subscription data
const allSubscriptions = [
  { id: 'SUB-2024-001', startDate: 'Feb 15, 2024', customer: 'Olivia Rhye', email: 'olivia@email.com', status: 'Active', plan: 'Pro', amount: '$29/month', daysRemaining: 23, nextBilling: 'Mar 15, 2024', duration: '12 months' },
  { id: 'SUB-2024-002', startDate: 'Feb 14, 2024', customer: 'Steve Hampton', email: 'steve.hamp@email.com', status: 'Active', plan: 'Basic', amount: '$9/month', daysRemaining: 22, nextBilling: 'Mar 14, 2024', duration: '6 months' },
  { id: 'SUB-2024-003', startDate: 'Feb 14, 2024', customer: 'Ciaran Murray', email: 'ciaran.murray@email.com', status: 'Active', plan: 'Enterprise', amount: '$99/month', daysRemaining: 22, nextBilling: 'Mar 14, 2024', duration: '24 months' },
  { id: 'SUB-2024-004', startDate: 'Feb 13, 2024', customer: 'Maria Macdonald', email: 'maria.mc@email.com', status: 'Cancelled', plan: 'Basic', amount: '$9/month', daysRemaining: 0, nextBilling: 'N/A', duration: '3 months' },
  { id: 'SUB-2024-005', startDate: 'Feb 13, 2024', customer: 'Charles Fulton', email: 'fulton@email.com', status: 'Expiring', plan: 'Pro', amount: '$29/month', daysRemaining: 5, nextBilling: 'Mar 13, 2024', duration: '12 months' },
  { id: 'SUB-2024-006', startDate: 'Feb 12, 2024', customer: 'Jay Hooper', email: 'hooper@email.com', status: 'Active', plan: 'Basic', amount: '$9/month', daysRemaining: 20, nextBilling: 'Mar 12, 2024', duration: '6 months' },
  { id: 'SUB-2024-007', startDate: 'Feb 12, 2024', customer: 'Krystal Stevens', email: 'k.stevens@email.com', status: 'Active', plan: 'Pro', amount: '$29/month', daysRemaining: 20, nextBilling: 'Mar 12, 2024', duration: '12 months' },
  { id: 'SUB-2024-008', startDate: 'Feb 11, 2024', customer: 'Sachin Flynn', email: 's.flyn@email.com', status: 'Active', plan: 'Enterprise', amount: '$99/month', daysRemaining: 19, nextBilling: 'Mar 11, 2024', duration: '24 months' },
  { id: 'SUB-2024-009', startDate: 'Feb 11, 2024', customer: 'Emma Wilson', email: 'emma.w@email.com', status: 'Active', plan: 'Basic', amount: '$9/month', daysRemaining: 19, nextBilling: 'Mar 11, 2024', duration: '6 months' },
  { id: 'SUB-2024-010', startDate: 'Feb 10, 2024', customer: 'David Brown', email: 'd.brown@email.com', status: 'Pending', plan: 'Enterprise', amount: '$99/month', daysRemaining: 30, nextBilling: 'Mar 10, 2024', duration: '24 months' },
];

// Subscription stats
const subscriptionStats = [
  { title: 'Total Subscribers', value: '1,247', change: '+18.2%', trend: 'up', icon: Subscriptions },
  { title: 'Active Plans', value: '1,156', change: '+15.3%', trend: 'up', icon: CheckCircle },
  { title: 'New This Month', value: '89', change: '+22.1%', trend: 'up', icon: Person },
  { title: 'Cancelled', value: '91', change: '-8.5%', trend: 'down', icon: Cancel },
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'active':
      return { backgroundColor: '#059669', color: '#ffffff' };
    case 'pending':
      return { backgroundColor: '#f59e0b', color: '#ffffff' };
    case 'expiring':
      return { backgroundColor: '#dc2626', color: '#ffffff' };
    case 'cancelled':
      return { backgroundColor: '#6b7280', color: '#ffffff' };
    default:
      return { backgroundColor: '#1e293b', color: '#ffffff' };
  }
}

function getPlanColor(plan: string) {
  switch (plan.toLowerCase()) {
    case 'basic':
      return { backgroundColor: '#e0e7ff', color: '#3730a3' };
    case 'pro':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'enterprise':
      return { backgroundColor: '#f3e8ff', color: '#7c3aed' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

function getDaysRemainingColor(days: number) {
  if (days <= 5) return '#dc2626'; // Red for urgent
  if (days <= 15) return '#f59e0b'; // Orange for warning
  return '#059669'; // Green for safe
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

  // Filter subscriptions based on tab and search
  const getFilteredSubscriptions = () => {
    let filtered = allSubscriptions;

    // Filter by tab
    switch (tabValue) {
      case 1: // Active
        filtered = filtered.filter(sub => sub.status.toLowerCase() === 'active');
        break;
      case 2: // Pending
        filtered = filtered.filter(sub => sub.status.toLowerCase() === 'pending');
        break;
      case 3: // Expiring
        filtered = filtered.filter(sub => sub.status.toLowerCase() === 'expiring');
        break;
      case 4: // Cancelled
        filtered = filtered.filter(sub => sub.status.toLowerCase() === 'cancelled');
        break;
      default: // All
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status dropdown
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status.toLowerCase() === statusFilter);
    }

    return filtered;
  };

  const filteredSubscriptions = getFilteredSubscriptions();

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#0f172a', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Subscription Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Track and manage customer subscriptions and billing
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {subscriptionStats.map((stat, index) => {
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
              Subscription History
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

          

          {/* Search and Filters */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2, 
            alignItems: { xs: 'stretch', sm: 'center' }
          }}>
            <TextField
                placeholder="Search subscriptions..."
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
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="expiring">Expiring</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table Content - Desktop View */}
        {!isMobile ? (
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#0f172a' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '120px' }}>Sub ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '100px', display: { xs: 'none', md: 'table-cell' } }}>Start Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', minWidth: '180px' }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '80px' }}>Plan</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '90px' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '140px' }}>Days Left</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '80px' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#ffffff', width: '80px' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSubscriptions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((subscription) => (
                  <TableRow key={subscription.id} sx={{ '&:hover': { backgroundColor: '#334155' } }}>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff', fontSize: '0.8rem' }}>
                        {subscription.id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                        {subscription.startDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 28, height: 28, mr: 1.5, backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '0.75rem' }}>
                          {subscription.customer.charAt(0)}
                        </Avatar>
                        <Box sx={{ minWidth: 0, flex: 1 }}>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff', fontSize: '0.8rem', lineHeight: 1.2 }}>
                            {subscription.customer}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {subscription.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={subscription.plan}
                        size="small"
                        sx={{
                          ...getPlanColor(subscription.plan),
                          fontWeight: 500,
                          fontSize: '0.65rem',
                          height: 20
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={subscription.status}
                        size="small"
                        sx={{
                          ...getStatusColor(subscription.status),
                          fontWeight: 500,
                          fontSize: '0.65rem',
                          height: 20
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="body2" sx={{ color: getDaysRemainingColor(subscription.daysRemaining), fontWeight: 600, fontSize: '0.75rem' }}>
                          {subscription.daysRemaining}d
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={Math.max(0, Math.min(100, (subscription.daysRemaining / 30) * 100))}
                          sx={{
                            width: 50,
                            height: 3,
                            backgroundColor: '#334155',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getDaysRemainingColor(subscription.daysRemaining)
                            }
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff', fontSize: '0.8rem' }}>
                        {subscription.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.25 }}>
                        <IconButton size="small" sx={{ color: '#94a3b8', p: 0.25 }}>
                          <Visibility sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleMenuClick}
                          sx={{ color: '#94a3b8', p: 0.25 }}
                        >
                          <MoreVert sx={{ fontSize: 16 }} />
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
          <Box sx={{ p: { xs: 0.5, sm: 1 }, maxWidth: '100vw', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '100%' }}>
              {filteredSubscriptions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscription) => (
                  <Card key={subscription.id} sx={{
                    backgroundColor: '#334155',
                    border: '1px solid #475569',
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '400px' },
                    mx: 'auto',
                    '&:hover': {
                      backgroundColor: '#475569'
                    }
                  }}>
                    <CardContent sx={{ p: { xs: 1, sm: 1.5 }, '&:last-child': { pb: { xs: 1, sm: 1.5 } } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ color: '#ffffff', mb: 0.25, fontSize: '0.875rem' }}>
                            {subscription.id}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                            {subscription.startDate}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column', alignItems: 'flex-end', ml: 1 }}>
                          <Chip
                            label={subscription.status}
                            size="small"
                            sx={{
                              ...getStatusColor(subscription.status),
                              fontWeight: 500,
                              fontSize: '0.65rem',
                              height: 20
                            }}
                          />
                          <Chip
                            label={subscription.plan}
                            size="small"
                            sx={{
                              ...getPlanColor(subscription.plan),
                              fontWeight: 500,
                              fontSize: '0.65rem',
                              height: 20
                            }}
                          />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1.5, backgroundColor: '#1e293b', color: '#94a3b8', fontSize: '0.875rem' }}>
                          {subscription.customer.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff', fontSize: '0.8rem', lineHeight: 1.2 }}>
                            {subscription.customer}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {subscription.email}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                        <Box sx={{ flex: 1, mr: 1 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', fontSize: '0.7rem' }}>
                            Days Remaining
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, maxWidth: '100px' }}>
                            <Typography variant="body2" sx={{ color: getDaysRemainingColor(subscription.daysRemaining), fontWeight: 600, fontSize: '0.7rem' }}>
                              {subscription.daysRemaining}d
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={Math.max(0, Math.min(100, (subscription.daysRemaining / 30) * 100))}
                              sx={{
                                flex: 1,
                                height: 2,
                                backgroundColor: '#334155',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getDaysRemainingColor(subscription.daysRemaining)
                                }
                              }}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 0.25 }}>
                          <IconButton size="small" sx={{ color: '#94a3b8', p: 0.25 }}>
                            <Visibility sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleMenuClick}
                            sx={{ color: '#94a3b8', p: 0.25 }}
                          >
                            <MoreVert sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff', fontSize: '0.875rem' }}>
                          {subscription.amount}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                          Next: {subscription.nextBilling}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Table Pagination */}
        <Divider />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSubscriptions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            color: '#94a3b8',
            '& .MuiTablePagination-toolbar': {
              backgroundColor: '#1e293b'
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: '#94a3b8'
            },
            '& .MuiTablePagination-select': {
              color: '#ffffff'
            },
            '& .MuiTablePagination-actions button': {
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
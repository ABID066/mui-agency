'use client';

import React, { useState } from 'react';
import {
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
  Box,
  Typography,
  Button,
  TablePagination,
  Divider,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Search,
  FilterList,
  TrendingUp,
  TrendingDown,
  Visibility
} from '@mui/icons-material';

interface PageDetail {
  title: string;
  status: string;
  users: string;
  eventCount: string;
  viewsPerUser: string;
  avgTime: string;
  productType: string;
}

interface PageDetailsTableProps {
  pageDetails: PageDetail[];
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'online':
      return { backgroundColor: '#10b981', color: '#ffffff', fontWeight: 500 };
    case 'offline':
      return { backgroundColor: '#6b7280', color: '#ffffff', fontWeight: 500 };
    default:
      return { backgroundColor: '#374151', color: '#ffffff', fontWeight: 500 };
  }
}

export default function PageDetailsTable({ pageDetails }: PageDetailsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredPages = pageDetails.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.productType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper sx={{ 
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      boxShadow: 'none',
      borderRadius: 2
    }}>
      {/* Table Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' }, 
          justifyContent: 'space-between', 
          gap: { xs: 2, sm: 0 },
          mb: 2 
        }}>
          <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', textAlign: { xs: 'center', sm: 'left' } }}>
            Details
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{
              borderColor: '#475569',
              color: '#ffffff',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                borderColor: '#64748b',
                backgroundColor: 'rgba(255, 255, 255, 0.04)'
              }
            }}
          >
            Filter
          </Button>
        </Box>
        <TextField
          placeholder="Search pages..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#334155',
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
            '& .MuiInputBase-input::placeholder': {
              color: '#94a3b8',
              opacity: 1
            }
          }}
        />
      </Box>

      {/* Table Content - Desktop View */}
      {!isMobile ? (
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 'auto' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#334155' }}>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Page Title</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Users</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Event Count</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Views per User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Average Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#e2e8f0', borderBottom: '1px solid #475569' }}>Product Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pageItem, index) => (
                <TableRow key={index} sx={{ 
                  '&:hover': { backgroundColor: '#334155' },
                  borderBottom: '1px solid #475569'
                }}>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                      {pageItem.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Chip
                      label={pageItem.status}
                      size="small"
                      sx={{
                        ...getStatusColor(pageItem.status),
                        fontSize: '0.75rem',
                        borderRadius: '12px'
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                      {pageItem.users}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                      {pageItem.eventCount}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                      {pageItem.viewsPerUser}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                      {pageItem.avgTime}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #475569' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        backgroundColor: '#3b82f6', 
                        mr: 1 
                      }} />
                      <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                        {pageItem.productType}
                      </Typography>
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
            {filteredPages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pageItem, index) => (
              <Grid sx={{ xs:12 }} key={index}>
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
                      <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff', flex: 1, mr: 2 }}>
                        {pageItem.title}
                      </Typography>
                      <Chip
                        label={pageItem.status}
                        size="small"
                        sx={{
                          ...getStatusColor(pageItem.status),
                          fontSize: '0.75rem',
                          borderRadius: '12px'
                        }}
                      />
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid sx={{ xs:6 }} >
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                            Users
                          </Typography>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {pageItem.users}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid sx={{ xs:6 }} >
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                            Events
                          </Typography>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {pageItem.eventCount}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid sx={{ xs:6 }} >
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                            Views/User
                          </Typography>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {pageItem.viewsPerUser}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid sx={{ xs:6 }}>
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                            Avg Time
                          </Typography>
                          <Typography variant="body2" fontWeight={500} sx={{ color: '#ffffff' }}>
                            {pageItem.avgTime}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 2, borderTop: '1px solid #475569' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          backgroundColor: '#3b82f6', 
                          mr: 1 
                        }} />
                        <Typography variant="body2" sx={{ color: '#e2e8f0' }}>
                          {pageItem.productType}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        sx={{
                          color: '#3b82f6',
                          textTransform: 'none',
                          fontSize: '0.75rem'
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Table Pagination */}
      <Divider sx={{ borderColor: '#475569' }} />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredPages.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
          '& .MuiSelect-select': {
            color: '#94a3b8'
          },
          '& .MuiIconButton-root': {
            color: '#94a3b8'
          }
        }}
      />

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ color: '#e2e8f0' }}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#e2e8f0' }}>Edit Page</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ef4444' }}>Delete Page</MenuItem>
      </Menu>
    </Paper>
  );
}

// Export the page details data
export const pageDetailsData: PageDetail[] = [
  { title: 'Homepage Overview', status: 'Online', users: '219423', eventCount: '8345', viewsPerUser: '18.5', avgTime: '2m 15s', productType: 'Website' },
  { title: 'Product Details - Gadgets', status: 'Online', users: '172240', eventCount: '5863', viewsPerUser: '8.7', avgTime: '2m 30s', productType: 'Home' },
  { title: 'Checkout Process Flow', status: 'Offline', users: '68740', eventCount: '3456', viewsPerUser: '15.2', avgTime: '1m 45s', productType: 'Pricing' },
  { title: 'User Profile Dashboard', status: 'Online', users: '98240', eventCount: '11543', viewsPerUser: '4.5', avgTime: '2m 40s', productType: 'About us' },
  { title: 'Article Listing - Tech News', status: 'Online', users: '142240', eventCount: '3863', viewsPerUser: '3.1', avgTime: '2m 55s', productType: 'Blog' },
  { title: 'FAQ - Customer Support', status: 'Online', users: '15240', eventCount: '10543', viewsPerUser: '2.2', avgTime: '1m 30s', productType: 'Store' },
  { title: 'Product Comparison - Laptops', status: 'Offline', users: '32240', eventCount: '7853', viewsPerUser: '6.5', avgTime: '2m 50s', productType: 'Contact' },
  { title: 'Shopping Cart - Electronics', status: 'Online', users: '48240', eventCount: '8563', viewsPerUser: '4.3', avgTime: '3m 10s', productType: 'Help' },
];
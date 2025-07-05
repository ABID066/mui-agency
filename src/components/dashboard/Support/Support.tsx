'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SupportStats from './components/SupportStats';
import SupportTickets from './components/SupportTickets';
import SupportResources from './components/SupportResources';
import { defaultSupportTickets, defaultFAQData } from './components/utils';



export default function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNewTicket = () => {
    setOpenDialog(true);
  };

  const handleContactSupport = () => {
    console.log('Contact support clicked');
  };

  const handleOpenDocumentation = () => {
    console.log('Open documentation clicked');
  };

  const handleStartLiveChat = () => {
    console.log('Start live chat clicked');
  };

  const handleScheduleCall = () => {
    console.log('Schedule call clicked');
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#0f172a', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Support Center
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Get help and support for your account and services
        </Typography>
      </Box>

      {/* Stats Cards */}
      <SupportStats />

      {/* Main Content */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <SupportTickets
          tickets={defaultSupportTickets}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          tabValue={tabValue}
          onTabChange={handleTabChange}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          onNewTicket={handleNewTicket}
          onMenuClick={handleMenuClick}
          anchorEl={anchorEl}
          onMenuClose={handleMenuClose}
        />
        
        <SupportResources
          faqs={defaultFAQData}
          onContactSupport={handleContactSupport}
          onOpenDocumentation={handleOpenDocumentation}
          onStartLiveChat={handleStartLiveChat}
          onScheduleCall={handleScheduleCall}
        />
      </Grid>

      {/* New Ticket Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Support Ticket</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Ticket Title"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Customer Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Customer Email"
                fullWidth
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority" defaultValue="medium">
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  <MenuItem value="technical">Technical</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
                  <MenuItem value="feature">Feature Request</MenuItem>
                  <MenuItem value="account">Account</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Assign to</InputLabel>
                <Select label="Assign to">
                  <MenuItem value="sarah">Sarah Johnson</MenuItem>
                  <MenuItem value="mike">Mike Chen</MenuItem>
                  <MenuItem value="lisa">Lisa Wang</MenuItem>
                  <MenuItem value="david">David Brown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Describe the issue or request in detail..."
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
            Create Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
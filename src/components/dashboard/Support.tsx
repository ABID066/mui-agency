'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  InputLabel,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Support as SupportIcon,
  PriorityHigh,
  Schedule,
  CheckCircle,
  ExpandMore,
  Phone,
  Email,
  Chat,
  Article
} from '@mui/icons-material';

// Sample support ticket data
const supportTickets = [
  {
    id: 'TKT-001',
    title: 'Login issues with new account',
    description: 'User unable to login after creating new account',
    priority: 'high',
    status: 'open',
    category: 'technical',
    customer: 'John Smith',
    customerEmail: 'john.smith@email.com',
    assignee: 'Sarah Johnson',
    createdDate: '2024-02-15',
    lastUpdate: '2024-02-15 10:30 AM',
    avatar: 'JS'
  },
  {
    id: 'TKT-002',
    title: 'Payment processing error',
    description: 'Credit card payment fails during checkout',
    priority: 'high',
    status: 'in-progress',
    category: 'billing',
    customer: 'Emily Davis',
    customerEmail: 'emily.davis@email.com',
    assignee: 'Mike Chen',
    createdDate: '2024-02-14',
    lastUpdate: '2024-02-15 09:15 AM',
    avatar: 'ED'
  },
  {
    id: 'TKT-003',
    title: 'Feature request: Dark mode',
    description: 'Request to add dark mode theme option',
    priority: 'medium',
    status: 'open',
    category: 'feature',
    customer: 'Alex Rodriguez',
    customerEmail: 'alex.r@email.com',
    assignee: 'Lisa Wang',
    createdDate: '2024-02-13',
    lastUpdate: '2024-02-14 03:20 PM',
    avatar: 'AR'
  },
  {
    id: 'TKT-004',
    title: 'Account deletion request',
    description: 'Customer wants to delete their account and data',
    priority: 'medium',
    status: 'resolved',
    category: 'account',
    customer: 'Maria Garcia',
    customerEmail: 'maria.g@email.com',
    assignee: 'David Brown',
    createdDate: '2024-02-12',
    lastUpdate: '2024-02-13 11:45 AM',
    avatar: 'MG'
  },
  {
    id: 'TKT-005',
    title: 'Slow page loading times',
    description: 'Dashboard takes too long to load',
    priority: 'low',
    status: 'open',
    category: 'technical',
    customer: 'Robert Wilson',
    customerEmail: 'robert.w@email.com',
    assignee: 'Jennifer Lee',
    createdDate: '2024-02-11',
    lastUpdate: '2024-02-12 02:10 PM',
    avatar: 'RW'
  }
];

// Support stats
const supportStats = [
  { title: 'Open Tickets', value: '23', icon: SupportIcon },
  { title: 'In Progress', value: '8', icon: Schedule },
  { title: 'Resolved Today', value: '12', icon: CheckCircle },
  { title: 'Avg Response Time', value: '2.5h', icon: PriorityHigh }
];

// FAQ data
const faqData = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions sent to your email.'
  },
  {
    question: 'How do I update my billing information?',
    answer: 'Go to Account Settings > Billing and click "Update Payment Method" to change your billing information.'
  },
  {
    question: 'Can I export my data?',
    answer: 'Yes, you can export your data from the Settings page under "Data Export". We support CSV and JSON formats.'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription from Account Settings > Subscription. Your account will remain active until the end of your billing period.'
  }
];

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high':
      return { backgroundColor: '#fee2e2', color: '#991b1b' };
    case 'medium':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'low':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case 'open':
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
    case 'in-progress':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'resolved':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    case 'closed':
      return { backgroundColor: '#f3f4f6', color: '#374151' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'technical':
      return { backgroundColor: '#e0e7ff', color: '#3730a3' };
    case 'billing':
      return { backgroundColor: '#fef3c7', color: '#92400e' };
    case 'feature':
      return { backgroundColor: '#f3e8ff', color: '#7c2d12' };
    case 'account':
      return { backgroundColor: '#ecfdf5', color: '#065f46' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export default function Support() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, ticketId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticketId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 1 }}>
          Support Center
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Manage customer support tickets and help resources
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {supportStats.map((stat, index) => {
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

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Support Tickets */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ 
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            borderRadius: 2
          }}>
            {/* Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#000000' }}>
                  Support Tickets
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => setOpenDialog(true)}
                  sx={{
                    backgroundColor: '#000000',
                    '&:hover': {
                      backgroundColor: '#374151'
                    }
                  }}
                >
                  New Ticket
                </Button>
              </Box>

              {/* Tabs */}
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  mb: 3,
                  '& .MuiTab-root': {
                    color: '#6b7280',
                    '&.Mui-selected': {
                      color: '#000000'
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#000000'
                  }
                }}
              >
                <Tab label="All Tickets" />
                <Tab label="Open" />
                <Tab label="In Progress" />
                <Tab label="Resolved" />
              </Tabs>

              {/* Search and Filters */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  placeholder="Search tickets..."
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
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="resolved">Resolved</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priorityFilter}
                    label="Priority"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Priority</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Tickets List */}
            <List sx={{ p: 0 }}>
              {filteredTickets.map((ticket, index) => (
                <React.Fragment key={ticket.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 3,
                      '&:hover': {
                        backgroundColor: '#f9fafb'
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                        {ticket.avatar}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body1" fontWeight={500} sx={{ color: '#000000' }}>
                              {ticket.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              #{ticket.id}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={ticket.priority}
                              size="small"
                              sx={{
                                ...getPriorityColor(ticket.priority),
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                            <Chip
                              label={ticket.status.replace('-', ' ')}
                              size="small"
                              sx={{
                                ...getStatusColor(ticket.status),
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                            <Chip
                              label={ticket.category}
                              size="small"
                              sx={{
                                ...getCategoryColor(ticket.category),
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, ticket.id)}
                              sx={{ color: '#6b7280' }}
                            >
                              <MoreVert />
                            </IconButton>
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: '#6b7280', mb: 1 }}>
                            {ticket.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              Customer: {ticket.customer} • Assigned to: {ticket.assignee}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#6b7280' }}>
                              Last updated: {ticket.lastUpdate}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredTickets.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Support Resources */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Quick Actions */}
            <Paper sx={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: 'none',
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Phone />}
                  fullWidth
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Call Customer
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  fullWidth
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Send Email
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Chat />}
                  fullWidth
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Live Chat
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Article />}
                  fullWidth
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Knowledge Base
                </Button>
              </Box>
            </Paper>

            {/* FAQ */}
            <Paper sx={{ 
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: 'none',
              borderRadius: 2,
              p: 3
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
                Frequently Asked Questions
              </Typography>
              {faqData.map((faq, index) => (
                <Accordion
                  key={index}
                  sx={{
                    boxShadow: 'none',
                    border: '1px solid #e5e7eb',
                    mb: 1,
                    '&:before': {
                      display: 'none'
                    }
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="body2" fontWeight={500}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Box>
        </Grid>
      </Grid>

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
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Assign to Me</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Change Priority</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Add Note</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Mark Resolved</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#dc2626' }}>Close Ticket</MenuItem>
      </Menu>

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
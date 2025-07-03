'use client';

import React from 'react';
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
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
  FormControl,
  Select,
  InputLabel,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert
} from '@mui/icons-material';
import { SupportTicket, getPriorityColor, getStatusColor, getCategoryColor } from './utils';

interface SupportTicketsProps {
  tickets: SupportTicket[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  tabValue: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
  onNewTicket: () => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  onMenuClose: () => void;
}

export default function SupportTickets({
  tickets,
  searchTerm,
  onSearchChange,
  tabValue,
  onTabChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onNewTicket,
  onMenuClick,
  anchorEl,
  onMenuClose
}: SupportTicketsProps) {
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <Paper sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            borderRadius: 2
          }}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
              Support Tickets
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onNewTicket}
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: '#2563eb'
                }
              }}
            >
              New Ticket
            </Button>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={onTabChange}
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
              onChange={(e) => onSearchChange(e.target.value)}
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
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                sx={{ color: '#ffffff' }}
                value={statusFilter}
                label="Status"
                onChange={(e) => onStatusFilterChange(e.target.value)}
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
                sx={{ color: '#ffffff' }}
                value={priorityFilter}
                label="Priority"
                onChange={(e) => onPriorityFilterChange(e.target.value)}
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
                    backgroundColor: '#334155'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: '#475569', color: '#94a3b8' }}>
                    {ticket.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight={500} sx={{ color: '#ffffff' }}>
                          {ticket.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
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
                          onClick={onMenuClick}
                          sx={{ color: '#94a3b8' }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ color: '#94a3b8', mb: 1 }}>
                        {ticket.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          Customer: {ticket.customer} • Assigned to: {ticket.assignee}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
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

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#ffffff'
            }
          }}
        >
          <MenuItem onClick={onMenuClose}>View Details</MenuItem>
          <MenuItem onClick={onMenuClose}>Edit Ticket</MenuItem>
          <MenuItem onClick={onMenuClose}>Assign to Me</MenuItem>
          <MenuItem onClick={onMenuClose}>Close Ticket</MenuItem>
        </Menu>
      </Paper>
    </Grid>
  );
}
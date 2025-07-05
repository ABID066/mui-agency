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
  Tab,
  useMediaQuery,
  useTheme
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
            borderRadius: 2,
            width: '100%',
            maxWidth: { xs: 'calc(100vw - 32px)', sm: '100%' },
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
        {/* Header */}
        <Box sx={{ 
          p: { xs: 1, sm: 2, md: 3 }, 
          borderBottom: '1px solid #334155',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: { xs: 'flex-start', md: 'center' }, 
            justifyContent: 'space-between', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 0 },
            mb: 3,
            width: '100%',
            maxWidth: '100%'
          }}>
            <Typography 
              variant="h6" 
              fontWeight={600} 
              sx={{ 
                color: '#ffffff',
                fontSize: { xs: '1.125rem', sm: '1.25rem' },
                wordBreak: 'break-word'
              }}
            >
              Support Tickets
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={onNewTicket}
              sx={{
                backgroundColor: '#3b82f6',
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                padding: { xs: '6px 12px', sm: '8px 16px' },
                minWidth: { xs: 'auto', sm: '64px' },
                '&:hover': {
                  backgroundColor: '#2563eb'
                }
              }}
            >
              New Ticket
            </Button>
          </Box>

          

          {/* Search and Filters */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 }, 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            maxWidth: '100%'
          }}>
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
                width: { xs: '100%', sm: 'auto' },
                maxWidth: '100%',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
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
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: { xs: '100%', sm: 120 },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: '100%'
              }}
            >
              <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Status</InputLabel>
              <Select
                sx={{ 
                  color: '#ffffff',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64748b',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  }
                }}
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
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: { xs: '100%', sm: 120 },
                width: { xs: '100%', sm: 'auto' },
                maxWidth: '100%'
              }}
            >
              <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Priority</InputLabel>
              <Select
                sx={{ 
                  color: '#ffffff',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#475569',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64748b',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  }
                }}
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
        <List sx={{ 
          p: 0,
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {filteredTickets.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <ListItem
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 3 },
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  '&:hover': {
                    backgroundColor: '#334155'
                  }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ 
                    backgroundColor: '#475569', 
                    color: '#94a3b8',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    {ticket.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden'
                  }}
                  primary={
                    <Box sx={{ width: '100%', maxWidth: '100%' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        mb: 1,
                        width: '100%',
                        maxWidth: '100%'
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1, 
                          flex: 1,
                          minWidth: 0,
                          overflow: 'hidden'
                        }}>
                          <Typography 
                            variant="body1" 
                            fontWeight={500} 
                            sx={{ 
                              color: '#ffffff',
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              flex: 1
                            }}
                          >
                            {ticket.title}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#94a3b8',
                              fontSize: { xs: '0.7rem', sm: '0.75rem' },
                              whiteSpace: 'nowrap'
                            }}
                          >
                            #{ticket.id}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={onMenuClick}
                          sx={{ 
                            color: '#94a3b8',
                            width: { xs: 24, sm: 32 },
                            height: { xs: 24, sm: 32 }
                          }}
                        >
                          <MoreVert sx={{ fontSize: { xs: 16, sm: 20 } }} />
                        </IconButton>
                      </Box>
                      {/* Mobile: Show chips below title */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 0.5, sm: 1 },
                        flexWrap: 'wrap',
                        mb: { xs: 1, md: 0 },
                        width: '100%',
                        maxWidth: '100%'
                      }}>
                        <Chip
                          label={ticket.priority}
                          size="small"
                          sx={{
                            ...getPriorityColor(ticket.priority),
                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                            height: { xs: 18, sm: 20 },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px' }
                            }
                          }}
                        />
                        <Chip
                          label={ticket.status.replace('-', ' ')}
                          size="small"
                          sx={{
                            ...getStatusColor(ticket.status),
                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                            height: { xs: 18, sm: 20 },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px' }
                            }
                          }}
                        />
                        <Chip
                          label={ticket.category}
                          size="small"
                          sx={{
                            ...getCategoryColor(ticket.category),
                            fontSize: { xs: '0.65rem', sm: '0.7rem' },
                            height: { xs: 18, sm: 20 },
                            '& .MuiChip-label': {
                              padding: { xs: '0 6px', sm: '0 8px' }
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ width: '100%', maxWidth: '100%' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#94a3b8', 
                          mb: 1,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: { xs: 2, sm: 3 },
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {ticket.description}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: { xs: 'flex-start', md: 'center' }, 
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: { xs: 1, md: 0 },
                        width: '100%',
                        maxWidth: '100%'
                      }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#94a3b8',
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: { xs: 'normal', sm: 'nowrap' },
                            wordBreak: { xs: 'break-word', sm: 'normal' }
                          }}
                        >
                          Customer: {ticket.customer} • Assigned to: {ticket.assignee}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#94a3b8',
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            whiteSpace: 'nowrap'
                          }}
                        >
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
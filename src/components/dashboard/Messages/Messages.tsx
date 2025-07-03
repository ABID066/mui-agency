'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Badge,
  Button,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Search,
  MoreVert,
  Send,
  AttachFile,
  EmojiEmotions,
  FilterList,
  Inbox,
  Drafts,
  Send as SendIcon,
  Star
} from '@mui/icons-material';

// Sample message data
const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Project Update - Q1 Review',
    preview: 'Hi team, I wanted to share the latest updates on our Q1 project milestones...',
    time: '2 min ago',
    unread: true,
    priority: 'high',
    avatar: 'SJ'
  },
  {
    id: 2,
    sender: 'Mike Chen',
    email: 'mike.chen@company.com',
    subject: 'Budget Approval Request',
    preview: 'Please review the attached budget proposal for the upcoming quarter...',
    time: '15 min ago',
    unread: true,
    priority: 'medium',
    avatar: 'MC'
  },
  {
    id: 3,
    sender: 'Emily Davis',
    email: 'emily.d@company.com',
    subject: 'Team Meeting Reschedule',
    preview: 'Due to scheduling conflicts, we need to move our weekly team meeting...',
    time: '1 hour ago',
    unread: false,
    priority: 'low',
    avatar: 'ED'
  },
  {
    id: 4,
    sender: 'Alex Rodriguez',
    email: 'alex.r@company.com',
    subject: 'Client Feedback Summary',
    preview: 'I\'ve compiled all the client feedback from last week\'s presentations...',
    time: '3 hours ago',
    unread: false,
    priority: 'medium',
    avatar: 'AR'
  },
  {
    id: 5,
    sender: 'Lisa Wang',
    email: 'lisa.w@company.com',
    subject: 'New Feature Proposal',
    preview: 'I have an exciting new feature idea that could improve user engagement...',
    time: '1 day ago',
    unread: false,
    priority: 'high',
    avatar: 'LW'
  }
];

const messageStats = [
  { title: 'Total Messages', value: '1,234', icon: Inbox },
  { title: 'Unread', value: '23', icon: Star },
  { title: 'Drafts', value: '5', icon: Drafts },
  { title: 'Sent', value: '456', icon: SendIcon }
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

export default function Messages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessage(messageId);
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMessageData = messages.find(msg => msg.id === selectedMessage);

  return (
    <Box sx={{ p: 4, backgroundColor: '#0f172a', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#ffffff', mb: 1 }}>
          Messages
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8' }}>
          Manage your team communications and messages
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {messageStats.map((stat, index) => {
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
                      <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff' }}>
                        {stat.value}
                      </Typography>
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

      <Grid container spacing={3}>
        {/* Messages List */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            borderRadius: 2,
            height: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Search and Filter */}
            <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                  Inbox
                </Typography>
                <IconButton size="small" onClick={handleMenuClick}>
                  <FilterList sx={{ color: '#94a3b8' }} />
                </IconButton>
              </Box>
              <TextField
                placeholder="Search messages..."
                variant="outlined"
                size="small"
                fullWidth
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
            </Box>

            {/* Messages List */}
            <List sx={{ flex: 1, overflow: 'auto', p: 0 }}>
              {filteredMessages.map((message, index) => (
                <React.Fragment key={message.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => handleMessageSelect(message.id)}
                      sx={{
                        backgroundColor: selectedMessage === message.id ? '#475569' : 'transparent',
                        '&:hover': {
                          backgroundColor: '#334155'
                        },
                        py: 2
                      }}
                    >
                      <ListItemAvatar>
                        <Badge
                          color="primary"
                          variant="dot"
                          invisible={!message.unread}
                        >
                          <Avatar sx={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                            {message.avatar}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography
                              variant="body2"
                              fontWeight={message.unread ? 600 : 400}
                              sx={{ color: '#ffffff' }}
                            >
                              {message.sender}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                              {message.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight={message.unread ? 500 : 400}
                              sx={{ color: '#94a3b8', mb: 0.5 }}
                            >
                              {message.subject}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ 
                                color: '#64748b',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {message.preview}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              <Chip
                                label={message.priority}
                                size="small"
                                sx={{
                                  ...getPriorityColor(message.priority),
                                  fontSize: '0.7rem',
                                  height: 20
                                }}
                              />
                            </Box>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < filteredMessages.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Message Detail/Compose */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ 
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            boxShadow: 'none',
            borderRadius: 2,
            height: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {selectedMessageData ? (
              // Message Detail View
              <>
                {/* Message Header */}
                <Box sx={{ p: 3, borderBottom: '1px solid #334155' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ backgroundColor: '#f3f4f6', color: '#6b7280', mr: 2 }}>
                        {selectedMessageData.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#ffffff' }}>
                          {selectedMessageData.subject}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          From: {selectedMessageData.sender} &lt;{selectedMessageData.email}&gt;
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small">
                        <Star sx={{ color: '#94a3b8' }} />
                      </IconButton>
                      <IconButton size="small" onClick={handleMenuClick}>
                        <MoreVert sx={{ color: '#94a3b8' }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    Received {selectedMessageData.time}
                  </Typography>
                </Box>

                {/* Message Content */}
                <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
                  <Typography variant="body1" sx={{ color: '#ffffff', lineHeight: 1.6 }}>
                    {selectedMessageData.preview}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff', lineHeight: 1.6, mt: 2 }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff', lineHeight: 1.6, mt: 2 }}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </Typography>
                </Box>

                {/* Reply Section */}
                <Box sx={{ p: 3, borderTop: '1px solid #334155' }}>
                  <TextField
                    placeholder="Type your reply..."
                    multiline
                    rows={3}
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{
                      mb: 2,
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
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <IconButton size="small">
                        <AttachFile sx={{ color: '#94a3b8' }} />
                      </IconButton>
                      <IconButton size="small">
                        <EmojiEmotions sx={{ color: '#94a3b8' }} />
                      </IconButton>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<Send />}
                      sx={{
                        backgroundColor: '#3b82f6',
                        '&:hover': {
                          backgroundColor: '#2563eb'
                        }
                      }}
                    >
                      Send Reply
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              // No Message Selected
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                flexDirection: 'column'
              }}>
                <Inbox sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                <Typography variant="h6" sx={{ color: '#94a3b8', mb: 1 }}>
                  No message selected
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Choose a message from the list to view its content
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

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
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#334155' } }}>Mark as Read</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#334155' } }}>Star Message</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#ffffff', '&:hover': { backgroundColor: '#334155' } }}>Forward</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#dc2626' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
}
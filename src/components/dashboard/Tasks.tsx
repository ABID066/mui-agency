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
  ListItemIcon,
  Checkbox,
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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  InputLabel,
  AvatarGroup
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Assignment,
  CheckCircle,
  Schedule,
  Flag,
  Person,
  CalendarToday,
  FilterList
} from '@mui/icons-material';

// Sample task data
const tasks = [
  {
    id: 1,
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new product landing page',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Sarah Johnson',
    assigneeAvatar: 'SJ',
    dueDate: '2024-02-20',
    progress: 65,
    tags: ['Design', 'UI/UX'],
    completed: false
  },
  {
    id: 2,
    title: 'Implement user authentication',
    description: 'Add login and registration functionality with JWT tokens',
    priority: 'high',
    status: 'todo',
    assignee: 'Mike Chen',
    assigneeAvatar: 'MC',
    dueDate: '2024-02-18',
    progress: 0,
    tags: ['Backend', 'Security'],
    completed: false
  },
  {
    id: 3,
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with examples',
    priority: 'medium',
    status: 'in-progress',
    assignee: 'Emily Davis',
    assigneeAvatar: 'ED',
    dueDate: '2024-02-25',
    progress: 30,
    tags: ['Documentation', 'API'],
    completed: false
  },
  {
    id: 4,
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    priority: 'medium',
    status: 'completed',
    assignee: 'Alex Rodriguez',
    assigneeAvatar: 'AR',
    dueDate: '2024-02-15',
    progress: 100,
    tags: ['DevOps', 'Automation'],
    completed: true
  },
  {
    id: 5,
    title: 'Update user dashboard',
    description: 'Refresh the user dashboard with new metrics and charts',
    priority: 'low',
    status: 'todo',
    assignee: 'Lisa Wang',
    assigneeAvatar: 'LW',
    dueDate: '2024-03-01',
    progress: 0,
    tags: ['Frontend', 'Dashboard'],
    completed: false
  },
  {
    id: 6,
    title: 'Database optimization',
    description: 'Optimize database queries and add proper indexing',
    priority: 'high',
    status: 'in-progress',
    assignee: 'David Brown',
    assigneeAvatar: 'DB',
    dueDate: '2024-02-22',
    progress: 45,
    tags: ['Database', 'Performance'],
    completed: false
  }
];

// Task stats
const taskStats = [
  { title: 'Total Tasks', value: '24', icon: Assignment },
  { title: 'Completed', value: '18', icon: CheckCircle },
  { title: 'In Progress', value: '4', icon: Schedule },
  { title: 'Overdue', value: '2', icon: Flag }
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
    case 'completed':
      return { backgroundColor: '#dcfce7', color: '#166534' };
    case 'in-progress':
      return { backgroundColor: '#dbeafe', color: '#1e40af' };
    case 'todo':
      return { backgroundColor: '#f3f4f6', color: '#374151' };
    default:
      return { backgroundColor: '#f3f4f6', color: '#374151' };
  }
}

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [taskList, setTaskList] = useState(tasks);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, taskId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(taskId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleTaskToggle = (taskId: number) => {
    setTaskList(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            status: !task.completed ? 'completed' : 'todo',
            progress: !task.completed ? 100 : 0
          }
        : task
    ));
  };

  const filteredTasks = taskList.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const completedTasks = taskList.filter(task => task.completed).length;
  const totalTasks = taskList.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#000000', mb: 1 }}>
          Task Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#6b7280' }}>
          Track and manage team tasks and projects
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {taskStats.map((stat, index) => {
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

      <Grid container spacing={3}>
        {/* Task List */}
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
                  Task List
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
                  New Task
                </Button>
              </Box>

              {/* Search and Filters */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                <TextField
                  placeholder="Search tasks..."
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
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
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

            {/* Task List */}
            <List sx={{ p: 0 }}>
              {filteredTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 3,
                      '&:hover': {
                        backgroundColor: '#f9fafb'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleTaskToggle(task.id)}
                        sx={{
                          color: '#d1d5db',
                          '&.Mui-checked': {
                            color: '#000000'
                          }
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{ 
                              color: task.completed ? '#9ca3af' : '#000000',
                              textDecoration: task.completed ? 'line-through' : 'none'
                            }}
                          >
                            {task.title}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={task.priority}
                              size="small"
                              sx={{
                                ...getPriorityColor(task.priority),
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                            <Chip
                              label={task.status.replace('-', ' ')}
                              size="small"
                              sx={{
                                ...getStatusColor(task.status),
                                fontSize: '0.7rem',
                                height: 20
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, task.id)}
                              sx={{ color: '#6b7280' }}
                            >
                              <MoreVert />
                            </IconButton>
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ 
                              color: task.completed ? '#9ca3af' : '#6b7280',
                              mb: 1
                            }}
                          >
                            {task.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Person sx={{ fontSize: 16, color: '#6b7280' }} />
                                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                  {task.assignee}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarToday sx={{ fontSize: 16, color: '#6b7280' }} />
                                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                  {task.dueDate}
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
                              <LinearProgress
                                variant="determinate"
                                value={task.progress}
                                sx={{
                                  flex: 1,
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: '#f3f4f6',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: task.completed ? '#059669' : '#000000'
                                  }
                                }}
                              />
                              <Typography variant="caption" sx={{ color: '#6b7280', minWidth: 35 }}>
                                {task.progress}%
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ mt: 1, display: 'flex', gap: 0.5 }}>
                            {task.tags.map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor: '#f3f4f6',
                                  color: '#6b7280',
                                  fontSize: '0.7rem',
                                  height: 18
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredTasks.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Task Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ 
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            borderRadius: 2,
            p: 3
          }}>
            <Typography variant="h6" fontWeight={600} sx={{ color: '#000000', mb: 3 }}>
              Task Summary
            </Typography>
            
            {/* Progress Overview */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Overall Progress
                </Typography>
                <Typography variant="body2" fontWeight={500} sx={{ color: '#000000' }}>
                  {Math.round(completionRate)}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={completionRate}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#000000'
                  }
                }}
              />
              <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, display: 'block' }}>
                {completedTasks} of {totalTasks} tasks completed
              </Typography>
            </Box>

            {/* Team Members */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" fontWeight={500} sx={{ color: '#000000', mb: 2 }}>
                Team Members
              </Typography>
              <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                {Array.from(new Set(taskList.map(task => task.assigneeAvatar))).map((avatar, index) => (
                  <Avatar key={index} sx={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                    {avatar}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>

            {/* Quick Actions */}
            <Box>
              <Typography variant="body1" fontWeight={500} sx={{ color: '#000000', mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  View All Tasks
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Export Report
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#000000',
                    '&:hover': {
                      borderColor: '#000000',
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  Team Calendar
                </Button>
              </Box>
            </Box>
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
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Edit Task</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Assign to</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Set Priority</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#374151' }}>Duplicate</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: '#dc2626' }}>Delete Task</MenuItem>
      </Menu>

      {/* New Task Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select label="Priority" defaultValue="medium">
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Assignee</InputLabel>
              <Select label="Assignee">
                <MenuItem value="sarah">Sarah Johnson</MenuItem>
                <MenuItem value="mike">Mike Chen</MenuItem>
                <MenuItem value="emily">Emily Davis</MenuItem>
                <MenuItem value="alex">Alex Rodriguez</MenuItem>
                <MenuItem value="lisa">Lisa Wang</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
            Create Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
'use client';

import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
 
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  Assignment,
  Message,
  People,
  Support,
  Settings,
  Menu,
  Close
} from '@mui/icons-material';

// Import dashboard components
import DashboardHome from './Home';
import Orders from './Orders';
import Tasks from './Tasks';
import Messages from './Messages';
import Users from './Users';
import DashboardSupport from './Support';
import DashboardSettings from './Settings';

const drawerWidth = 280;

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  hasSubmenu?: boolean;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', icon: Home, path: '/dashboard' },
  { name: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
  { name: 'Tasks', icon: Assignment, path: '/dashboard/tasks', hasSubmenu: true },
  { name: 'Messages', icon: Message, path: '/dashboard/messages', badge: 4 },
  { name: 'Users', icon: People, path: '/dashboard/users', hasSubmenu: true },
  { name: 'Support', icon: Support, path: '/dashboard/support' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

interface DashboardLayoutProps {
  children?: React.ReactNode;
  currentPage?: string;
}

export default function DashboardLayout({ currentPage }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState(currentPage || 'Home');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageChange = (pageName: string) => {
    setActivePage(pageName);
    // Auto-close sidebar on mobile when selecting an option
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'Home':
        return <DashboardHome />;
      case 'Orders':
        return <Orders />;
      case 'Tasks':
        return <Tasks />;
      case 'Messages':
        return <Messages />;
      case 'Users':
        return <Users />;
      case 'Support':
        return <DashboardSupport />;
      case 'Settings':
        return <DashboardSettings />;
      default:
        return <DashboardHome />;
    }
  };

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: '#1f2937', color: '#ffffff' }}>
      {/* Sidebar Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #374151', position: 'relative' }}>
        {/* Close button for mobile */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#9ca3af',
              '&:hover': {
                backgroundColor: '#374151',
                color: '#ffffff'
              }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h6" fontWeight={700} sx={{ color: '#ffffff' }}>
          AgencyBoost
        </Typography>
        <Typography variant="caption" sx={{ color: '#9ca3af' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ px: 2, py: 2 }}>
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activePage === item.name;
          
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handlePageChange(item.name)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? '#374151' : 'transparent',
                  color: isActive ? '#ffffff' : '#d1d5db',
                  '&:hover': {
                    backgroundColor: '#374151',
                    color: '#ffffff'
                  },
                  py: 1.5,
                  px: 2
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <IconComponent fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400
                  }}
                />
                {item.badge && (
                  <Chip
                    label={item.badge}
                    size="small"
                    sx={{
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      height: 20,
                      minWidth: 20
                    }}
                  />
                )}
                {item.hasSubmenu && (
                  <Box sx={{ ml: 1, color: '#9ca3af' }}>▼</Box>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      

      {/* User Profile */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 16, 
        left: 16, 
        right: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Avatar sx={{ width: 40, height: 40, backgroundColor: '#6b7280' }}>
          S
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff' }}>
            Siriwat K.
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af' }}>
            siriwat@test.com
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#9ca3af' }}>
          <Settings fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile Header */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            backgroundColor: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {/* Toggle Button - only show when sidebar is closed */}
          {!mobileOpen && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{
                position: 'absolute',
                left: 16,
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#374151'
                }
              }}
            >
              <Menu />
            </IconButton>
          )}
          
          {/* Centered Header Title */}
          <Typography
            variant="h6"
            sx={{
              color: '#ffffff',
              fontWeight: 600,
              textAlign: 'center'
            }}
          >
            {activePage}
          </Typography>
        </Box>
      )}

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none'
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f9fafb',
          minHeight: '100vh',
          paddingTop: { xs: '64px', md: 0 } // Add top padding for mobile header
        }}
      >
        {renderPageContent()}
      </Box>
    </Box>
  );
}
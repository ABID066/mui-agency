'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import {
  Menu,
  Notifications,
  AccountCircle
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', path: '/dashboard' },
  { name: 'Orders', path: '/dashboard/orders' },
  { name: 'Tasks', path: '/dashboard/tasks' },
  { name: 'Messages', path: '/dashboard/messages' },
  { name: 'Users', path: '/dashboard/users' },
  { name: 'Support', path: '/dashboard/support' },
  { name: 'Settings', path: '/dashboard/settings' },
];

interface NavbarProps {
  drawerWidth: number;
  onMenuClick: () => void;
}

export default function Navbar({ drawerWidth, onMenuClick }: NavbarProps) {
  const theme = useTheme();
  const pathname = usePathname();

  const getCurrentPageName = () => {
    const currentItem = navigationItems.find(item => item.path === pathname);
    return currentItem?.name || 'Dashboard';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        backgroundColor: '#0f172a',
        color: '#1f2937',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Menu />
        </IconButton>
        
        {/* Page title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#ffffff' }}>
          {getCurrentPageName()}
        </Typography>
        
        {/* Top navigation actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  Popover,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import {
  Menu,
  Notifications,
  AccountCircle,
  
  Logout
} from '@mui/icons-material';
import { useRouter} from 'next/navigation';
import useAuth from "@/hooks/useAuth";
import { signOut } from "next-auth/react";

interface NavigationItem {
  name: string;
  path: string;
}



interface NavbarProps {
  drawerWidth: number;
  onMenuClick: () => void;
}

export default function Navbar({ drawerWidth, onMenuClick }: NavbarProps) {
  const theme = useTheme();
  const router = useRouter();
  const { user, setUser } = useAuth();
  
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleProfileSettings = () => {
    // Add navigation to profile settings
    router.push('/dashboard/settings');
    setProfileAnchorEl(null);
  };

  

  const handleLogout = async () => {
    try {
      setProfileAnchorEl(null);
      setUser(null);
      // Sign out with redirect to home page
      await signOut({ 
        redirect: true,
        callbackUrl: "/" 
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: force navigation to home
      router.push("/");
    }
  };

  const isProfileOpen = Boolean(profileAnchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'block', md: 'none' },
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
          <Menu sx={{ color: "white", ml: "10px"}}/>
        </IconButton>
        
        {/* Page title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#ffffff' }}>
          Dashboard
        </Typography>
        
        {/* Top navigation actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton >
            <Notifications sx={{ color: "white",}} />
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={handleProfileClick}
            sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
          >
            <AccountCircle sx={{ color: "white" }}/>
          </IconButton>
        </Box>
      </Toolbar>
      
      {/* Profile Popover */}
      <Popover
        open={isProfileOpen}
        anchorEl={profileAnchorEl}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1,
          '& .MuiPopover-paper': {
            backgroundColor: '#1E293B',
            border: '1px solid #4A5568',
            borderRadius: 2,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        <Paper
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            minWidth: 200,
            maxWidth: 250
          }}
        >
          <Box sx={{ p: 2 }}>
            {/* User Info Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, pb: 2, borderBottom: '1px solid #4A5568' }}>
              <Avatar 
                src={user?.image}
                sx={{ width: 36, height: 36, backgroundColor: '#718096', fontSize: '0.9rem', fontWeight: 600 }}>
                {!user?.image && user?.name && getInitials(user.name)}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff', lineHeight: 1.2 }}>
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#A0AEC0' }}>
                  {user?.email || 'user@example.com'}
                </Typography>
              </Box>
            </Box>
            
            <List sx={{ p: 0 }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleProfileSettings}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#4A5568'
                    },
                    py: 1,
                    px: 1
                  }}
                >
                  <ListItemIcon sx={{ color: '#A0AEC0', minWidth: 32 }}>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Profile"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#E2E8F0'
                    }}
                  />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#4A5568'
                    },
                    py: 1,
                    px: 1
                  }}
                >
                  <ListItemIcon sx={{ color: '#A0AEC0', minWidth: 32 }}>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#E2E8F0'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Paper>
      </Popover>
    </AppBar>
  );
}
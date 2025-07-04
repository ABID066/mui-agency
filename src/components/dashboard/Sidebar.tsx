'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Drawer,
  Collapse
} from '@mui/material';
import {
  Home,
  ShoppingCart,
  Assignment,
  Message,
  People,
  Support,
  Settings,
  Close,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Business,
  Add
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationItem {
  name: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  hasSubmenu?: boolean;
  submenuItems?: {
    name: string;
    icon: React.ElementType;
    path: string;
  }[];
}

const navigationItems: NavigationItem[] = [
  { name: 'Home', icon: Home, path: '/dashboard' },
  { name: 'Orders', icon: ShoppingCart, path: '/dashboard/orders' },
  { name: 'Tasks', icon: Assignment, path: '/dashboard/tasks', hasSubmenu: true },
  { name: 'Messages', icon: Message, path: '/dashboard/messages', badge: 4 },
  { name: 'Users', icon: People, path: '/dashboard/users', hasSubmenu: true },
  {
    name: 'Organization',
    icon: Business,
    path: '/dashboard/organization',
    hasSubmenu: true,
    submenuItems: [
      { name: 'My Organizations', icon: Business, path: '/dashboard/organization/my-organizations' },
      { name: 'Create New Organization', icon: Add, path: '/dashboard/organization/create' },
    ]
  },
  { name: 'Support', icon: Support, path: '/dashboard/support' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
  isMobile: boolean;
}

export default function Sidebar({ drawerWidth, mobileOpen, onMobileClose, isMobile }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleNavigation = (path: string) => {
    router.push(path);
    // Auto-close sidebar on mobile when selecting an option
    if (isMobile) {
      onMobileClose();
    }
  };

  const handleSubmenuToggle = (itemName: string) => {
    setExpandedMenus(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isSubmenuExpanded = (itemName: string) => {
    return expandedMenus.includes(itemName);
  };

  const isSubmenuItemActive = (submenuItems: { name: string; icon: React.ElementType; path: string; }[]) => {
    return submenuItems?.some(subItem => pathname === subItem.path);
  };

  const drawerContent = (
    <Box 
      sx={{ 
        height: '100vh',
        backgroundColor: '#1E293B',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Sidebar Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #4A5568' }}>
        {/* Close button for mobile */}
        {isMobile && (
          <IconButton
            onClick={onMobileClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#A0AEC0',
              '&:hover': {
                backgroundColor: '#4A5568',
                color: '#ffffff'
              }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h5" fontWeight={700} sx={{ color: '#ffffff', mb: 0.5 }}>
          AgencyBoost
        </Typography>
        <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Navigation - Scrollable */}
      <Box 
        sx={{ 
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2D3748',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4A5568',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#718096',
          },
        }}
      >
        <List sx={{ px: 2, py: 2 }}>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.path;
            const hasSubmenuActive = item.submenuItems && isSubmenuItemActive(item.submenuItems);
            const isExpanded = isSubmenuExpanded(item.name);
            
            return (
              <React.Fragment key={item.name}>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => {
                      if (item.hasSubmenu && item.submenuItems) {
                        handleSubmenuToggle(item.name);
                      } else {
                        handleNavigation(item.path);
                      }
                    }}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: (isActive || hasSubmenuActive) ? '#4A5568' : 'transparent',
                      color: (isActive || hasSubmenuActive) ? '#ffffff' : '#E2E8F0',
                      '&:hover': {
                        backgroundColor: '#4A5568',
                        color: '#ffffff'
                      },
                      py: 2,
                      px: 2,
                      minHeight: 48
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                      <IconComponent fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: '0.95rem',
                        fontWeight: (isActive || hasSubmenuActive) ? 600 : 500
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          backgroundColor: '#3182CE',
                          color: '#ffffff',
                          fontSize: '0.75rem',
                          height: 22,
                          minWidth: 22,
                          fontWeight: 600
                        }}
                      />
                    )}
                    {item.hasSubmenu && (
                      isExpanded ? (
                        <KeyboardArrowDown sx={{ ml: 1, color: '#A0AEC0', fontSize: '1.2rem' }} />
                      ) : (
                        <KeyboardArrowRight sx={{ ml: 1, color: '#A0AEC0', fontSize: '1.2rem' }} />
                      )
                    )}
                  </ListItemButton>
                </ListItem>
                
                {/* Submenu Items */}
                {item.hasSubmenu && item.submenuItems && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 2, mb: 1 }}>
                      {item.submenuItems.map((subItem) => {
                        const SubIconComponent = subItem.icon;
                        const isSubActive = pathname === subItem.path;
                        
                        return (
                          <ListItem key={subItem.name} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                              onClick={() => handleNavigation(subItem.path)}
                              sx={{
                                borderRadius: 2,
                                backgroundColor: isSubActive ? '#4A5568' : 'transparent',
                                color: isSubActive ? '#ffffff' : '#CBD5E0',
                                '&:hover': {
                                  backgroundColor: '#4A5568',
                                  color: '#ffffff'
                                },
                                py: 1.5,
                                px: 2,
                                minHeight: 40,
                                ml: 1
                              }}
                            >
                              <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
                                <SubIconComponent fontSize="small" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.name}
                                primaryTypographyProps={{
                                  fontSize: '0.85rem',
                                  fontWeight: isSubActive ? 600 : 400
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>

      {/* User Profile - Fixed at bottom */}
      <Box sx={{ 
        p: 3,
        borderTop: '1px solid #4A5568',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#2D3748'
      }}>
        <Avatar sx={{ width: 44, height: 44, backgroundColor: '#718096', fontSize: '1.1rem', fontWeight: 600 }}>
          S
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600} sx={{ color: '#ffffff' }}>
            Siriwat K.
          </Typography>
          <Typography variant="caption" sx={{ color: '#A0AEC0' }}>
            siriwat@test.com
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#A0AEC0', '&:hover': { color: '#ffffff', backgroundColor: '#4A5568' } }}>
          <Settings fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
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
        {drawerContent}
      </Drawer>
      
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            border: 'none',
            position: 'fixed',
            height: '100vh',
            top: 0,
            left: 0
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
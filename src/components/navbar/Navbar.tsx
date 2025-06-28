'use client';

import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  Box,
  Divider
} from '@mui/material';
import { Menu, Close } from '@mui/icons-material';

// Custom theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#1f2937',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b7280', // Gray
      light: '#9ca3af',
      dark: '#4b5563',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#6b7280',
    },
    grey: {
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
    },
  },
  typography: {
    h5: {
      fontWeight: 900,
      letterSpacing: '-0.025em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        outlined: {
          borderColor: '#d1d5db',
          color: '#000000',
          fontWeight: 600,
          '&:hover': {
            borderColor: '#000000',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#ffffff',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#1f2937',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: 'none',
          borderBottom: '1px solid #e5e7eb',
        },
      },
    },
  },
});

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = ['Features', 'Pricing', 'Resources'];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, height: '100%', bgcolor: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          AgencyBoost
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 2 }}>
        {navigationItems.map((item) => (
          <ListItem key={item} sx={{ px: 2, py: 1 }}>
            <Button 
              fullWidth 
              sx={{ 
                color: '#6b7280', 
                justifyContent: 'flex-start',
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              {item}
            </Button>
          </ListItem>
        ))}
        <ListItem sx={{ px: 2, py: 1 }}>
          <Button 
            variant="outlined" 
            fullWidth
            sx={{ 
              py: 1.5,
              mb: 1
            }}
          >
            Sign In
          </Button>
        </ListItem>
        <ListItem sx={{ px: 2, py: 1 }}>
          <Button 
            variant="contained" 
            fullWidth
            sx={{ 
              py: 1.5
            }}
          >
            Get Started
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ py: 1 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography 
            variant="h5" 
            component="div"
          >
            AgencyBoost
          </Typography>
          
          {/* Desktop Navigation */}
          <Stack direction="row" spacing={3} alignItems="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="secondary">
              Features
            </Button>
            <Button color="secondary">
              Pricing
            </Button>
            <Button color="secondary">
              Resources
            </Button>
            <Button variant="outlined">
              Sign In
            </Button>
            <Button 
              variant="contained" 
              sx={{ px: 3 }}
            >
              Get Started
            </Button>
          </Stack>
          
          {/* Mobile Menu Button */}
          <IconButton 
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            bgcolor: 'white'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default function ThemedNavbar() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
    </ThemeProvider>
  );
}
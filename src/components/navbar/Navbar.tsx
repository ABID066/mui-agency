"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+ App Router
// import { useNavigate } from 'react-router-dom'; // For React Router
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
  Divider,
  Container,
  Avatar,
  Popover,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu, Close, Dashboard, Logout } from "@mui/icons-material";
import useAuth from "@/hooks/useAuth";
import { signOut } from "next-auth/react";

// Custom theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Black
      light: "#333333",
      dark: "#1f2937",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6b7280", // Gray
      light: "#9ca3af",
      dark: "#4b5563",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#6b7280",
    },
    grey: {
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
    },
  },
  typography: {
    h5: {
      fontWeight: 900,
      letterSpacing: "-0.025em",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        outlined: {
          borderColor: "#d1d5db",
          color: "#000000",
          fontWeight: 600,
          "&:hover": {
            borderColor: "#000000",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
        contained: {
          backgroundColor: "#000000",
          color: "#ffffff",
          fontWeight: 600,
          "&:hover": {
            backgroundColor: "#1f2937",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "#000000",
          boxShadow: "none",
        },
      },
    },
  },
});

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const router = useRouter(); // For Next.js
  // const navigate = useNavigate(); // For React Router

  // Mock user data - replace with actual authentication logic
  const { user, setUser } = useAuth();

  const isAuthenticated = !!user;

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollThreshold = windowHeight * 0.1; // 10% of screen height

      setIsScrolled(scrollPosition > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    handleProfileClose();
    handleNavigate("/");
  };

  const handleDashboard = () => {
    handleProfileClose();
    handleNavigate("/dashboard");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Navigation handler
  const handleNavigate = (path: string) => {
    router.push(path); // For Next.js
    // navigate(path); // For React Router
    setMobileOpen(false); // Close mobile drawer after navigation
  };

  // Navigation items with their corresponding routes
  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Resources", path: "/resources" },
  ];

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 250, height: "100%", bgcolor: "white" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 900,
            cursor: "pointer",
          }}
          onClick={() => handleNavigate("/")}>
          AgencyBoost
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ pt: 2 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.name} sx={{ px: 2, py: 1 }}>
            <Button
              fullWidth
              onClick={() => handleNavigate(item.path)}
              sx={{
                color: "#6b7280",
                justifyContent: "flex-start",
                py: 1.5,
                fontSize: "1rem",
              }}>
              {item.name}
            </Button>
          </ListItem>
        ))}
        {!isAuthenticated ? (
          <>
            <ListItem sx={{ px: 2, py: 1 }}>
              <Button
                variant='outlined'
                fullWidth
                onClick={() => handleNavigate("/login")}
                sx={{
                  py: 1.5,
                  mb: 1,
                }}>
                Sign In
              </Button>
            </ListItem>
            <ListItem sx={{ px: 2, py: 1 }}>
              <Button
                variant='contained'
                fullWidth
                onClick={() => handleNavigate("/register")}
                sx={{
                  py: 1.5,
                }}>
                Get Started
              </Button>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem sx={{ px: 2, py: 1 }}>
              <Button
                fullWidth
                startIcon={<Dashboard />}
                onClick={handleDashboard}
                sx={{
                  color: "#6b7280",
                  justifyContent: "flex-start",
                  py: 1.5,
                  fontSize: "1rem",
                }}>
                Dashboard
              </Button>
            </ListItem>
            <ListItem sx={{ px: 2, py: 1 }}>
              <Button
                fullWidth
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  color: "#6b7280",
                  justifyContent: "flex-start",
                  py: 1.5,
                  fontSize: "1rem",
                }}>
                Logout
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position='fixed'
        elevation={0}
        sx={{
          py: 1,
          backgroundColor: "transparent",
          transition: "all 0.3s ease-in-out",
        }}>
        <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Box
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: isScrolled ? "12px" : "0px",
              border: isScrolled ? "1px solid #e5e7eb" : "none",
              boxShadow: isScrolled
                ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                : "none",
              transition: "all 0.3s ease-in-out",
              mx: 2,
              my: 1,
            }}>
            <Toolbar
              sx={{
                justifyContent: "space-between",
                minHeight: isScrolled ? "56px" : "64px",
                transition: "min-height 0.3s ease-in-out",
                px: { xs: 2, sm: 3 },
              }}>
              <Typography
                variant={isScrolled ? "h6" : "h5"}
                component='div'
                sx={{
                  cursor: "pointer",
                  fontWeight: 900,
                  fontSize: isScrolled ? "1.25rem" : "1.5rem",
                  transition: "font-size 0.3s ease-in-out",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
                onClick={() => handleNavigate("/")}>
                AgencyBoost
              </Typography>

              {/* Desktop Navigation */}
              <Stack
                direction='row'
                spacing={3}
                alignItems='center'
                sx={{ display: { xs: "none", md: "flex" } }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.name}
                    color='secondary'
                    onClick={() => handleNavigate(item.path)}
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                    }}>
                    {item.name}
                  </Button>
                ))}
                {!isAuthenticated ? (
                  <>
                    <Button
                      variant='outlined'
                      onClick={() => handleNavigate("/login")}
                      sx={{
                        fontSize: "0.875rem",
                        px: 2.5,
                        py: 1,
                      }}>
                      Sign In
                    </Button>
                    <Button
                      variant='contained'
                      sx={{
                        px: 2.5,
                        py: 1,
                        fontSize: "0.875rem",
                      }}
                      onClick={() => handleNavigate("/register")}>
                      Get Started
                    </Button>
                  </>
                ) : (
                  <IconButton
                    onClick={handleProfileClick}
                    sx={{
                      p: 0,
                      ml: 2,
                    }}>
                    <Avatar
                      src={user?.image}
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#000000",
                        color: "#ffffff",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}>
                      {!user?.image && user?.name && getInitials(user.name)}
                    </Avatar>
                  </IconButton>
                )}
              </Stack>

              {/* Mobile Menu Button */}
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={handleDrawerToggle}>
                <Menu />
              </IconButton>
            </Toolbar>
          </Box>
        </Container>
      </AppBar>

      {/* Profile Menu Popover */}
      <Popover
        open={Boolean(profileAnchorEl)}
        anchorEl={profileAnchorEl}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          mt: 1,
        }}>
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              src={user?.image}
              sx={{
                width: 32,
                height: 32,
                bgcolor: "#000000",
                color: "#ffffff",
                fontSize: "0.875rem",
                mr: 2,
              }}>
              {!user?.image && user?.name && getInitials(user.name)}
            </Avatar>
            <Box>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                {user?.name}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {user?.email}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 1 }} />
          <List sx={{ p: 0 }}>
            <ListItem
              component='button'
              onClick={handleDashboard}
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
              }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Dashboard fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary='Dashboard'
                primaryTypographyProps={{ fontSize: "0.875rem" }}
              />
            </ListItem>
            <ListItem
              component='button'
              onClick={handleLogout}
              sx={{
                p: 1,
                borderRadius: 1,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
              }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Logout fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary='Logout'
                primaryTypographyProps={{ fontSize: "0.875rem" }}
              />
            </ListItem>
          </List>
        </Box>
      </Popover>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant='temporary'
        anchor='right'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            bgcolor: "white",
          },
        }}>
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
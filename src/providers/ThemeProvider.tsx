'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useState, useEffect } from 'react';
import createEmotionCache from '@/lib/emotion-cache';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
});

interface MUIThemeProviderProps {
  children: ReactNode;
}

export default function MUIThemeProvider({ children }: MUIThemeProviderProps) {
  const [emotionCache, setEmotionCache] = useState<ReturnType<typeof createEmotionCache> | null>(null);

  useEffect(() => {
    // Create emotion cache only on client side to prevent hydration mismatch
    setEmotionCache(createEmotionCache());
  }, []);

  // During SSR or before hydration, render without CacheProvider
  if (!emotionCache) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
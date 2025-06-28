'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';
import createEmotionCache from '../lib/emotion-cache';

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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MUIThemeProviderProps {
  children: ReactNode;
  emotionCache?: ReturnType<typeof createEmotionCache>;
}

export default function MUIThemeProvider({ 
  children, 
  emotionCache = clientSideEmotionCache 
}: MUIThemeProviderProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
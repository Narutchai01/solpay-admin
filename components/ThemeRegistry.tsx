'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme as CustomTheme } from '@/theme/theme';

const theme = createTheme({
  palette: {
    primary: {
      main: CustomTheme.colors.primary,
    },
    background: {
      default: '#f4f6f8',
      paper: CustomTheme.colors.surface,
    },
    text: {
      primary: CustomTheme.colors.text,
    },
  },
  typography: {
    fontFamily: 'var(--font-sarabun), var(--font-geist-sans), sans-serif',
    h1: {
      fontSize: CustomTheme.fontSize.h1,
      lineHeight: CustomTheme.lineHeight.h1 / CustomTheme.fontSize.h1,
      fontWeight: 700,
    },
    h2: {
      fontSize: CustomTheme.fontSize.h2,
      lineHeight: CustomTheme.lineHeight.h2 / CustomTheme.fontSize.h2,
      fontWeight: 700,
    },
    h3: {
      fontSize: CustomTheme.fontSize.h3,
      lineHeight: CustomTheme.lineHeight.h3 / CustomTheme.fontSize.h3,
      fontWeight: 700,
    },
    h4: {
      fontSize: CustomTheme.fontSize.h4,
      lineHeight: CustomTheme.lineHeight.h4 / CustomTheme.fontSize.h4,
      fontWeight: 600,
    },
    h5: {
      fontSize: CustomTheme.fontSize.h5,
      lineHeight: CustomTheme.lineHeight.h5 / CustomTheme.fontSize.h5,
      fontWeight: 600,
    },
    h6: {
      fontSize: CustomTheme.fontSize.h6,
      lineHeight: CustomTheme.lineHeight.h6 / CustomTheme.fontSize.h6,
      fontWeight: 600,
    },
    body1: {
      fontSize: CustomTheme.fontSize.textL,
      lineHeight: CustomTheme.lineHeight.textL / CustomTheme.fontSize.textL,
    },
    body2: {
      fontSize: CustomTheme.fontSize.textM,
      lineHeight: CustomTheme.lineHeight.textM / CustomTheme.fontSize.textM,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: 'none',
          border: '1px solid #E5E7EB',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '@/components/layout/Sidebar';
import { Theme } from '@/theme/theme';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: Theme.colors.surface }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: '256px', 
          p: 4,
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

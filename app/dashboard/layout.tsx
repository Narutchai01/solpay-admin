import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          ml: '256px', // Sidebar width
          p: 4,
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

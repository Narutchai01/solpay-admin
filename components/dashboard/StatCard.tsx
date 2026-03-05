import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '@/components/ui/Card';
import { Theme as CustomTheme } from '@/theme/theme';

interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card sx={{ bgcolor: CustomTheme.colors.v100, border: 'none' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: CustomTheme.colors.g500, 
          }}
        >
          {label}
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            color: CustomTheme.colors.g500, 
            fontWeight: 700 
          }}
        >
          {value}
        </Typography>
      </Box>
    </Card>
  );
}
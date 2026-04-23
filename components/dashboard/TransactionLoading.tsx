'use client';

import React from 'react';
import { Box, CircularProgress, SxProps } from '@mui/material';
import { Theme } from '@/theme/theme';

interface TransactionLoadingProps {
  height?: string | number;
  sx?: SxProps;
}

export const TransactionLoading: React.FC<TransactionLoadingProps> = ({ 
  height = '400px',
  sx = {}
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        ...sx
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={60}
          thickness={4}
          sx={{ color: Theme.colors.g50 }}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={60}
          thickness={4}
          sx={{
            color: Theme.colors.v400,
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
          }}
        />
      </Box>
    </Box>
  );
};

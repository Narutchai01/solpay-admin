import React from 'react';
import { Card as MuiCard, CardContent, SxProps, Theme } from '@mui/material';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  sx?: SxProps<Theme>;
}

export function Card({ children, padding = true, sx }: CardProps) {
  return (
    <MuiCard sx={{ ...sx }}>
      {padding ? (
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
          {children}
        </CardContent>
      ) : (
        children
      )}
    </MuiCard>
  );
};

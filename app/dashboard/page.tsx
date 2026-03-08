import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';

export default function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="h1" sx={{ fontWeight: 700 }}>
        Overview
      </Typography>
       
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total USDT" value="100,000.00" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total THB" value="8,000.00" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total Fee (USDT)" value="10,000.00" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Monthly Transaction" value="150" />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
          Monthly Summary
        </Typography>
        <Chart />
      </Box>
    </Box>
  );
}
import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import { TableComponent, Column } from "@/components/dashboard/Table"; 
import { StatCard } from "@/components/dashboard/StatCard";

type PoolTransaction = {
  id: string;
  transId: string;
  type: string;
  amount: string;
  date: string;
  status: string;
};

const poolTransactionColumns: Column<PoolTransaction>[] = [
  { 
    id: 'transId', 
    label: 'Transaction ID',
    renderCell: (row) => <span style={{ fontWeight: 600 }}>{row.transId}</span>
  },
  { 
    id: 'type', 
    label: 'Type',
    renderCell: (row) => (
      <Chip 
      label={row.type} 
      size="small"
      sx={{ 
        bgcolor: row.type === 'Deposit' ? '#D1FAE5' : '#DBEAFE',
        color: row.type === 'Deposit' ? '#047857' : '#1D4ED8',
        fontWeight: 700, 
        fontSize: '0.75rem'
      }} 
      />
    )
  },
  { id: 'amount', label: 'Amount', renderCell: (row) => <strong style={{ color: '#111827' }}>{row.amount}</strong> },
  { id: 'date', label: 'Date' },
  { 
    id: 'status', 
    label: 'Status',
    renderCell: (row) => (
      <Chip 
        label={row.status} 
        size="small"
        sx={{ 
          bgcolor: row.status === 'Success' ? '#D1FAE5' : '#FEE2E2',
          color: row.status === 'Success' ? '#047857' : '#B91C1C',
          fontWeight: 700, 
          fontSize: '0.75rem'
        }} 
      />
    )
  },
];

const mockPoolTransactions: PoolTransaction[] = [
  { id: '1', transId: 'TX123456789', type: 'Deposit', amount: '1000.00', date: '2023-10-01', status: 'Success' },
  { id: '2', transId: 'TX987654321', type: 'Withdrawal', amount: '500.00', date: '2023-10-02', status: 'Success' },
  { id: '3', transId: 'TX456123789', type: 'Deposit', amount: '2000.00', date: '2023-10-03', status: 'Failed' },
];

export default function PoolManagementPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          Pool Management
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total Pool Balance" value="5,000.00" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Utilization" value="2,000.00" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Utilization" value="%" />
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Composition
      </Typography>

      <Typography variant="h2" sx={{ fontWeight: 700, mt: 2 }}>
        Recent Transactions
      </Typography>
      
      <TableComponent columns={poolTransactionColumns} data={mockPoolTransactions} />
    </Box>
  );
}
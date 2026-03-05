import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import { TableComponent, Column } from "@/components/dashboard/Table"; 
import { StatCard } from "@/components/dashboard/StatCard";

type Transaction = {
  id: string;
  transId: string;
  userId: string; 
  type: string;
  amountUsdt: string;
  amountThb: string;
  feeUsdt: string;
  date: string;
  status: string;
};

const transactionColumns: Column<Transaction>[] = [
  { 
    id: 'transId', 
    label: 'Transaction ID',
    renderCell: (row) => <span style={{ fontWeight: 600 }}>{row.transId}</span>
  },
  { 
    id: 'userId', 
    label: 'User ID' 
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
  { id: 'amountUsdt', label: 'USDT Amount', renderCell: (row) => <strong style={{ color: '#111827' }}>{row.amountUsdt}</strong> },
  { id: 'amountThb', label: 'THB Amount', renderCell: (row) => <strong style={{ color: '#111827' }}>{row.amountThb}</strong> },
  { id: 'feeUsdt', label: 'Fee' },
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

const mockTransactions: Transaction[] = [
  { id: '1', transId: 'TX123456789', userId: 'USER-001', type: 'Deposit', amountUsdt: '1000.00', amountThb: '35000.00', feeUsdt: '1.00', date: '2023-10-01', status: 'Success' },
  { id: '2', transId: 'TX987654321', userId: 'USER-002', type: 'Withdrawal', amountUsdt: '500.00', amountThb: '17500.00', feeUsdt: '0.50', date: '2023-10-02', status: 'Success' },
  { id: '3', transId: 'TX456123789', userId: 'USER-003', type: 'Deposit', amountUsdt: '2000.00', amountThb: '70000.00', feeUsdt: '2.00', date: '2023-10-03', status: 'Failed' },
  { id: '4', transId: 'TX789456123', userId: 'USER-004', type: 'Deposit', amountUsdt: '1500.00', amountThb: '52500.00', feeUsdt: '1.50', date: '2023-10-04', status: 'Success' },
  { id: '5', transId: 'TX321654987', userId: 'USER-005', type: 'Withdrawal', amountUsdt: '300.00', amountThb: '10500.00', feeUsdt: '0.30', date: '2023-10-05', status: 'Success' },
];

export default function TransactionsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          Transactions
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Total Transaction" value="1,000" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Top Up Transaction" value="450" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Transfer Transaction" value="500" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Swap Transaction" value="150" />
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        Transaction Summary
      </Typography>
      
      <TableComponent columns={transactionColumns} data={mockTransactions} />
    </Box>
  );
}
'use client';

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { TableComponent, Column } from "@/components/dashboard/Table"; 
import { StatCard } from "@/components/dashboard/StatCard";
import { Theme } from "@/theme/theme";
import { CompositionChart } from "@/components/dashboard/PieChart";

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
  },
   {
    id: "type",
    label: "Type",
  },
  { id: 'amount', label: 'Amount' },
  { id: 'date', label: 'Date' },
  {
     id: "status",
     label: "Status",
     renderCell: (row) => (
       <span
         style={{
           color:
             row.status === "Success"
               ? Theme.colors.success
               : Theme.colors.errorText,
           fontWeight: 600,
         }}
       >
         {row.status}
       </span>
     ),
   },
];

const mockPoolTransactions: PoolTransaction[] = [
  { id: '1', transId: 'TX123456789', type: 'Deposit', amount: '1000.00', date: '2023-10-01', status: 'Success' },
  { id: '2', transId: 'TX987654321', type: 'Withdrawal', amount: '500.00', date: '2023-10-02', status: 'Success' },
  { id: '3', transId: 'TX456123789', type: 'Deposit', amount: '2000.00', date: '2023-10-03', status: 'Failed' },
  { id: '4', transId: 'TX789456123', type: 'Withdrawal', amount: '1500.00', date: '2023-10-04', status: 'Success' },
  { id: '5', transId: 'TX321654987', type: 'Deposit', amount: '3000.00', date: '2023-10-05', status: 'Success' },
  { id: '6', transId: 'TX654321987', type: 'Withdrawal', amount: '2500.00', date: '2023-10-06', status: 'Failed' },
  { id: '7', transId: 'TX159753456', type: 'Deposit', amount: '4000.00', date: '2023-10-07', status: 'Success' },
  { id: '8', transId: 'TX753159456', type: 'Withdrawal', amount: '3500.00', date: '2023-10-08', status: 'Success' },
  { id: '9', transId: 'TX258456789', type: 'Deposit', amount: '5000.00', date: '2023-10-09', status: 'Failed' },
  { id: '10', transId: 'TX456789123', type: 'Withdrawal', amount: '4500.00', date: '2023-10-10', status: 'Success' },
  { id: '11', transId: 'TX789123456', type: 'Deposit', amount: '6000.00', date: '2023-10-11', status: 'Success' },
  { id: '12', transId: 'TX123789456', type: 'Withdrawal', amount: '5500.00', date: '2023-10-12', status: 'Failed' },
  { id: '13', transId: 'TX321987654', type: 'Deposit', amount: '7000.00', date: '2023-10-13', status: 'Success' },
  { id: '14', transId: 'TX987654321', type: 'Withdrawal', amount: '6500.00', date: '2023-10-14', status: 'Success' },
  { id: '15', transId: 'TX654987321', type: 'Deposit', amount: '8000.00', date: '2023-10-15', status: 'Failed' },
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Composition
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CompositionChart />
        </Box>
      </Box>

      <Typography variant="h2" sx={{ fontWeight: 700, mt: 2 }}>
        Recent Transactions
      </Typography>
      
      <TableComponent columns={poolTransactionColumns} data={mockPoolTransactions} rowsPerPage={10} />
    </Box>
  );
}
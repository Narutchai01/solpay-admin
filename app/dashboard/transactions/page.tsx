"use client";

import React, { useState, useMemo } from "react";
import { Box, Typography, Grid, Tabs, Tab } from "@mui/material";
import { TableComponent, Column } from "@/components/dashboard/Table";
import { StatCard } from "@/components/dashboard/StatCard";
import { Theme } from "@/theme/theme";

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
  source: string;
};

const transactionColumns: Column<Transaction>[] = [
  {
    id: "transId",
    label: "Transaction ID",
    renderCell: (row) => <span>{row.transId}</span>,
  },
  {
    id: "userId",
    label: "User ID",
  },
  {
    id: "type",
    label: "Type",
  },
  { id: "amountUsdt", label: "USDT Amount" },
  { id: "amountThb", label: "THB Amount" },
  { id: "feeUsdt", label: "Fee" },
  { id: "date", label: "Date" },
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

const mockTransactions: Transaction[] = [
  {
    id: "1",
    transId: "001",
    userId: "Uppt255d",
    type: "Top up",
    amountUsdt: "10,000.00",
    amountThb: "10,000.00",
    feeUsdt: "326.00",
    date: "03 Dec 25, 1:08 PM",
    status: "Success",
    source: "On App",
  },
  {
    id: "2",
    transId: "002",
    userId: "Uput256d",
    type: "Transfer",
    amountUsdt: "20,000.00",
    amountThb: "10,000.00",
    feeUsdt: "963.00",
    date: "03 Dec 25, 1:08 PM",
    status: "Success",
    source: "Software Wallet",
  },
  {
    id: "3",
    transId: "003",
    userId: "Uppt256d",
    type: "Transfer",
    amountUsdt: "5,000.00",
    amountThb: "5,000.00",
    feeUsdt: "125.00",
    date: "03 Dec 25, 1:08 PM",
    status: "Success",
    source: "On App",
  },
  {
    id: "4",
    transId: "004",
    userId: "Uppt152d",
    type: "Top up",
    amountUsdt: "2,000.00",
    amountThb: "5,000.00",
    feeUsdt: "98.00",
    date: "02 Dec 25, 1:08 PM",
    status: "Success",
    source: "Software Wallet",
  },
  {
    id: "5",
    transId: "005",
    userId: "Uppt026d",
    type: "Transfer",
    amountUsdt: "500.00",
    amountThb: "500.00",
    feeUsdt: "36.00",
    date: "02 Dec 25, 2:08 PM",
    status: "Failed",
    source: "On App",
  },
  {
    id: "6",
    transId: "006",
    userId: "Uppt260d",
    type: "Top up",
    amountUsdt: "9,000.00",
    amountThb: "9,000.00",
    feeUsdt: "300.00",
    date: "02 Dec 25, 1:08 PM",
    status: "Failed",
    source: "On App",
  },
  {
    id: "7",
    transId: "007",
    userId: "Uppt290d",
    type: "Transfer",
    amountUsdt: "700.00",
    amountThb: "700.00",
    feeUsdt: "156.00",
    date: "02 Dec 25, 1:23 PM",
    status: "Success",
    source: "Software Wallet",
  },
  {
    id: "8",
    transId: "008",
    userId: "Uppt365d",
    type: "Transfer",
    amountUsdt: "500.00",
    amountThb: "500.00",
    feeUsdt: "36.00",
    date: "01 Dec 25, 1:08 PM",
    status: "Success",
    source: "On App",
  },
  {
    id: "9",
    transId: "009",
    userId: "Uppt256d",
    type: "Top up",
    amountUsdt: "2,000.00",
    amountThb: "2,000.00",
    feeUsdt: "263.00",
    date: "28 Nov 25, 1:08 PM",
    status: "Failed",
    source: "Software Wallet",
  },
  {
    id: "10",
    transId: "010",
    userId: "Uppt256d",
    type: "Transfer",
    amountUsdt: "500.00",
    amountThb: "500.00",
    feeUsdt: "23.00",
    date: "27 Nov 25, 1:08 PM",
    status: "Success",
    source: "On App",
  },
  {
    id: "11",
    transId: "011",
    userId: "Uppt256d",
    type: "Swap",
    amountUsdt: "2,000.00",
    amountThb: "2,000.00",
    feeUsdt: "292.00",
    date: "26 Nov 25, 1:08 PM",
    status: "Failed",
    source: "Software Wallet",
  },
  {
    id: "12",
    transId: "012",
    userId: "Uppt256d",
    type: "Swap",
    amountUsdt: "500.00",
    amountThb: "500.00",
    feeUsdt: "36.00",
    date: "25 Nov 25, 1:08 PM",
    status: "Failed",
    source: "On App",
  },
];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions = useMemo(() => {
    if (activeTab === "all") return mockTransactions;
    if (activeTab === "on_app")
      return mockTransactions.filter((tx) => tx.source === "On App");
    if (activeTab === "software_wallet")
      return mockTransactions.filter((tx) => tx.source === "Software Wallet");
    return mockTransactions;
  }, [activeTab]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Transaction Summary
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          slotProps={{
            indicator: {
              sx: { backgroundColor: Theme.colors.v400, height: "3px" },
            },
          }}
          sx={{
            minHeight: "auto",
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: Theme.fontSize.h6,
              fontWeight: 600,
              color: Theme.colors.g200,
              padding: "8px 24px",
              minHeight: "auto",
              "&.Mui-selected": {
                color: Theme.colors.g500,
              },
            },
          }}
        >
          <Tab label="All" value="all" />
          <Tab label="On App" value="on_app" />
          <Tab label="Software Wallet" value="software_wallet" />
        </Tabs>
      </Box>

      <TableComponent
        key={activeTab}
        columns={transactionColumns}
        data={filteredTransactions}
        rowsPerPage={10}
      />
    </Box>
  );
}

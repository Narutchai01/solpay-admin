"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Alert,
  Skeleton,
} from "@mui/material";
import { TableComponent, Column } from "@/components/dashboard/Table";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionLoading } from "@/components/dashboard/TransactionLoading";
import { Theme } from "@/theme/theme";
import { useTransactions } from "@/hooks/useTransactions";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transaction";

const statusColorMap: Record<string, string> = {
  [TransactionStatus.SUCCESS]: Theme.colors.success,
  [TransactionStatus.COMPLETED]: Theme.colors.success,
  [TransactionStatus.SOLANA_SUBMITTED]: Theme.colors.amber,
};

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const { transactions, total, error, isLoading } = useTransactions(1, 100);

  const dynamicColumns = useMemo(() => {
    const baseColumns: Column<Transaction>[] = [
      { id: "transaction_uuid", label: "Transaction ID" },
      { id: "account_id", label: "User ID" },
      { id: "transaction_type", label: "Type" },
      {
        id: "usdt_amount",
        label: "USDC Amount",
        renderCell: (row) => row.usdt_amount.toLocaleString("en-US"),
      },
      {
        id: "thb_amount",
        label: "THB Amount",
        renderCell: (row) => row.thb_amount.toLocaleString("en-US"),
      },
      {
        id: "fee",
        label: "Fee",
        renderCell: (row) => {
          return row.fee ? row.fee.toLocaleString("en-US") : "0";
        },
      },
      {
        id: "created_at",
        label: "Date",
        renderCell: (row) => new Date(row.created_at).toLocaleString("en-US"),
      },
      {
        id: "status",
        label: "Status",
        renderCell: (row) => {
          const color = statusColorMap[row.status] || Theme.colors.errorText;

          return (
            <span
              style={{
                color: color,
                fontWeight: 600,
              }}
            >
              {row.status}
            </span>
          );
        },
      },
    ];

    if (activeTab === "on_app") {
      return baseColumns.filter(
        (col) => col.id !== "fee" && col.id !== "usdt_amount",
      );
    }

    return baseColumns;
  }, [activeTab]);

  const stats = useMemo(() => {
    const data = Array.isArray(transactions) ? transactions : [];

    return {
      total: total || data.length,
      topUp: data.filter((t) => t.transaction_type === TransactionType.TOPUP)
        .length,
      transfer: data.filter((t) =>
        [TransactionType.ONCHAIN, TransactionType.OFFCHAIN].includes(
          t.transaction_type as TransactionType,
        ),
      ).length,
      swap: data.filter((t) =>
        t.transaction_type?.toLowerCase().includes("swap"),
      ).length,
    };
  }, [transactions, total]);

  const filteredTransactions = useMemo(() => {
    const data = Array.isArray(transactions) ? transactions : [];
    if (activeTab === "all") return data;

    if (activeTab === "on_app")
      return data.filter((tx) => tx.transaction_type === "OFFCHAIN");

    if (activeTab === "software_wallet")
      return data.filter((tx) => tx.transaction_type === "ONCHAIN");

    if (activeTab === "top_up")
      return data.filter((tx) => tx.transaction_type === "TOPUP");

    if (activeTab === "swap")
      return data.filter((tx) =>
        tx.transaction_type?.toLowerCase().includes("swap"),
      );

    return data;
  }, [activeTab, transactions]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          Transactions
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            {isLoading ? (
              <Skeleton
                variant="rounded"
                height={120}
                sx={{ borderRadius: 4 }}
              />
            ) : (
              <StatCard
                label={
                  index === 0
                    ? "Total"
                    : index === 1
                      ? "Top Up"
                      : index === 2
                        ? "Transfer"
                        : "Swap"
                }
                value={Object.values(stats)[index].toLocaleString("en-US")}
              />
            )}
          </Grid>
        ))}
      </Grid>

      {/* Tabs and Title Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
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
              fontSize: Theme.fontSize.h7,
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
          <Tab label="Top Up" value="top_up" />
          <Tab label="Swap" value="swap" />
        </Tabs>
      </Box>

      {/* Table Section */}
      <Box sx={{ position: "relative", minHeight: "400px" }}>
        {isLoading ? (
          <TransactionLoading />
        ) : (
          <TableComponent
            key={activeTab}
            columns={dynamicColumns}
            data={filteredTransactions}
            rowsPerPage={10}
            emptyMessage="No transactions found"
          />
        )}
      </Box>
    </Box>
  );
}

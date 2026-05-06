"use client";

import React, { useState } from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";
import { StatCard } from "@/components/dashboard/StatCard";
import { Chart } from "@/components/dashboard/Chart";
import { TransactionLoading } from "@/components/dashboard/TransactionLoading";
import { useTransactionSummary } from "@/hooks/useTransactionSummary";

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0"),
  );
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear()),
  );
  const { data, isLoading } = useTransactionSummary(
    selectedMonth,
    selectedYear,
  );
  const summary = data?.summary;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Overview
      </Typography>

      <Grid container spacing={3}>
        {/* Total Deposits (USDT) */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={100} sx={{ borderRadius: 4 }} />
          ) : (
            <StatCard
              label="Total Deposits (USDT)"
              value={
                summary?.totalDeposit?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "0.00"
              }
            />
          )}
        </Grid>

        {/* Total Withdrawals (THB) */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={100} sx={{ borderRadius: 4 }} />
          ) : (
            <StatCard
              label="Total Withdrawals (THB)"
              value={
                summary?.totalWithdraw?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "0.00"
              }
            />
          )}
        </Grid>

        {/* Total Fee (USDT) */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={100} sx={{ borderRadius: 4 }} />
          ) : (
            <StatCard
              label="Total Fee (USDT)"
              value={
                summary?.totalFee?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || "0.00"
              }
            />
          )}
        </Grid>

        {/* Monthly Transaction */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {isLoading ? (
            <Skeleton variant="rounded" height={100} sx={{ borderRadius: 4 }} />
          ) : (
            <StatCard
              label="Monthly Transaction"
              value={summary?.totalCompletedCount?.toLocaleString('en-US') || "0"}
            />
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
          Monthly Summary
        </Typography>
        
        <Box sx={{ position: "relative", minHeight: "400px" }}>
          {isLoading ? (
            <TransactionLoading />
          ) : (
            <Chart
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              data={data}
              isLoading={isLoading} 
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

'use client';

import React, { useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Card } from '@/components/ui/Card';
import { Dropdown } from '@/components/ui/Dropdown';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { Theme } from '@/theme/theme';
import { useTransactionSummary } from '@/hooks/useTransactionSummary';

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 4 }, (_, i) => {
  const yearStr = String(currentYear - i);
  return { value: yearStr, label: yearStr };
});

export function Chart() {
  const [selectedMonth, setSelectedMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const { data, isLoading, error } = useTransactionSummary(selectedMonth, selectedYear);

  return (
    <Card sx={{ height: 500, width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dropdowns */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mb: 4 }}>
        <Dropdown
          options={MONTHS}
          value={selectedMonth}
          onChange={(val) => setSelectedMonth(val)}
        />
        <Dropdown
          options={YEAR_OPTIONS}
          value={selectedYear}
          onChange={(val) => setSelectedYear(val)}
        />
      </Box>

      {/* Chart Area */}
      <Box sx={{ height: 400, width: '100%', paddingBottom: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data?.chartData || []} 
              margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={Theme.colors.g50} />
              <XAxis 
                dataKey="label" 
                axisLine={false} tickLine={false} 
                tick={{ fill: Theme.colors.g300, fontSize: 12 }} dy={10}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: Theme.colors.g300, fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />

              <Line
                type="monotone" dataKey="deposit" name="Deposit"
                stroke={Theme.colors.v300} strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: Theme.colors.surface }}
                activeDot={{ r: 6, strokeWidth: 0, fill: Theme.colors.v300 }}
              >
                <LabelList dataKey="deposit" position="top" fill={Theme.colors.g300} fontSize={11} offset={10} />
              </Line>

              <Line
                type="monotone" dataKey="withdraw" name="Withdraw"
                stroke={Theme.colors.coral} strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: Theme.colors.surface }}
                activeDot={{ r: 6, strokeWidth: 0, fill: Theme.colors.coral }}
              >
                <LabelList dataKey="withdraw" position="top" fill={Theme.colors.g300} fontSize={11} offset={10} />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Card>
  );
}
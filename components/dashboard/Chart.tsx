'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
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

const mockChartData = [
  { day: '01', deposit: 41.52, withdraw: 63.39 },
  { day: '02', deposit: 16.70, withdraw: 83.32 },
  { day: '03', deposit: 18.97, withdraw: 87.02 },
  { day: '04', deposit: 94.48, withdraw: 14.36 },
  { day: '05', deposit: 94.34, withdraw: 48.21 },
  { day: '06', deposit: 34.92, withdraw: 76.17 },
  { day: '07', deposit: 14.64, withdraw: 29.90 },
  { day: '08', deposit: 32.90, withdraw: 99.32 },
  { day: '09', deposit: 50.35, withdraw: 76.33 },
  { day: '10', deposit: 48.64, withdraw: 54.69 },
  { day: '11', deposit: 38.55, withdraw: 84.01 },
  { day: '12', deposit: 17.06, withdraw: 99.36 },
  { day: '13', deposit: 0, withdraw: 0 },
  { day: '14', deposit: 0, withdraw: 0 },
  { day: '15', deposit: 0, withdraw: 0 },
];

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

  const handleFilterChange = () => {
    console.log(`Fetching data for: ${selectedMonth}/${selectedYear}`);
  };

  return (
    <Card sx={{ height: 500, width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Dropdowns */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 1.5, mb: 4 }}>
        <Dropdown
          options={MONTHS}
          value={selectedMonth}
          onChange={(val) => {
            setSelectedMonth(val);
            handleFilterChange();
          }}
        />

        <Dropdown
          options={YEAR_OPTIONS}
          value={selectedYear}
          onChange={(val) => {
            setSelectedYear(val);
            handleFilterChange();
          }}
        />
      </Box>

      {/* Chart Area */}
     <Box sx={{ height: 400, width: '100%', paddingBottom: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockChartData}
            margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={Theme.colors.g50} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: Theme.colors.g300, fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: Theme.colors.g300, fontSize: 12 }} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ paddingTop: '20px' }}
            />

            <Line
              type="monotone"
              dataKey="deposit"
              name="Deposit"
              stroke={Theme.colors.v300} 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: Theme.colors.surface }}
              activeDot={{ r: 6, strokeWidth: 0, fill: Theme.colors.v300 }}
            >
              <LabelList dataKey="deposit" position="top" fill={Theme.colors.g300} fontSize={11} offset={10} />
            </Line>

            <Line
              type="monotone"
              dataKey="withdraw"
              name="Withdraw"
              stroke={Theme.colors.coral}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: Theme.colors.surface }}
              activeDot={{ r: 6, strokeWidth: 0, fill: Theme.colors.coral }}
            >
              <LabelList dataKey="withdraw" position="top" fill={Theme.colors.g300} fontSize={11} offset={10} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

'use client';

import React, { useState } from 'react';
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

export const Chart: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(String(new Date().getMonth() + 1).padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState(String(currentYear));

  const handleFilterChange = () => {
    console.log(`Fetching data for: ${selectedMonth}/${selectedYear}`);
  };

  return (
    <Card className={styles.card}>
      {/* Dropdowns */}
      <div className={styles.filterGroup}>
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
      </div>

      {/* Chart Area */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={mockChartData}
            margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12 }} 
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
              stroke="#8579af" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#8579af' }}
            >
              <LabelList dataKey="deposit" position="top" fill="#6B7280" fontSize={11} offset={10} />
            </Line>

            <Line
              type="monotone"
              dataKey="withdraw"
              name="Withdraw"
              stroke="#FF928A"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#FF928A' }}
            >
              <LabelList dataKey="withdraw" position="top" fill="#6B7280" fontSize={11} offset={10} />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const styles = {
  card: 'h-[500px] w-full p-6 flex flex-col',
  title: 'font-bold text-lg text-gray-900',
  filterGroup: 'flex justify-end items-end gap-3 mb-4',
  chartContainer: 'flex-1 w-full h-full'
};
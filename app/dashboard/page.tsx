import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { Chart } from '@/components/dashboard/Chart';

export default function DashboardPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Overview</h1>
       
      <div className={styles.statsGrid}>
        <StatCard label="Total USDT" value="100,000.00" />
        <StatCard label="Total THB" value="8,000.00" />
        <StatCard label="Total Fee (USDT)" value="10,000.00" />
        <StatCard label="Monthly Transaction" value="150" />
      </div>

      <div className={styles.chartSection}>
         <h2 className={styles.subTitle}>Monthly Summary</h2>
        <Chart />
      </div>
    </div>
  );
}

const styles = {
  wrapper: 'space-y-8 animate-in fade-in duration-500',
  title: 'text-4xl font-bold text-onSurface tracking-tight',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  chartSection: 'grid grid-cols-1 gap-8',
  subTitle: 'text-3xl font-bold text-onSurface tracking-tight',
};
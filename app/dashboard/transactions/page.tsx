import React from "react";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { StatCard } from "@/components/dashboard/StatCard";

export default function TransactionsPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Transactions
        </h1>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Transaction" value="1,000" />
        <StatCard label="Top Up Transaction" value="450" />
        <StatCard label="Transfer Transaction" value="500" />
        <StatCard label="Swap Transaction" value="150" />
      </div>

      <h2 className={styles.subTitle}>
        Transaction Summary
      </h2>
      
      <TransactionTable />
    </div>
  );
}

const styles = {
  wrapper: 'space-y-8 animate-in fade-in duration-500',
  header: 'flex justify-between items-center',
  title: 'text-4xl font-bold text-onSurface tracking-tight', 
  subTitle: 'text-3xl font-bold text-onSurface tracking-tight', 
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
};
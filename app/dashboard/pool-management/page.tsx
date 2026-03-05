import React from "react";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { StatCard } from "@/components/dashboard/StatCard";

export default function PoolManagementPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Pool Management</h1>
      </div>

      <div className={styles.statsGrid}>
        <StatCard label="Total Pool Balance" value="5,000.00" />
        <StatCard label="Utilization" value="2,000.00" />
        <StatCard label="Utilization" value="%" />
      </div>

      <h2 className={styles.subTitle}>Composition</h2>

      <h3 className={styles.subTitle}>Recent Transacions</h3>
      <TransactionTable />
    </div>
  );
}

const styles = {
  wrapper: "space-y-8 animate-in fade-in duration-500",
  header: "flex justify-between items-center",
  title: "text-4xl font-bold text-onSurface tracking-tight",
  subTitle: "text-3xl font-bold text-onSurface tracking-tight",
  statsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
};

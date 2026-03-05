import React from 'react';
import { Card } from '@/components/ui/Card';

interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </Card>
  );
};

const styles = {
  card: 'bg-v100 border-none',
  wrapper: 'flex flex-col gap-3',
  label: 'text-base font-normal tracking-wider text-g500',
  value: 'text-2xl font-bold text-g500',
};
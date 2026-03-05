import React from 'react';
import { LayoutDashboard, ArrowRightLeft, Layers } from 'lucide-react';

export const menuItems = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard size={24} />, 
    href: '/dashboard',
  },
  {
    name: 'Transaction',
    icon: <ArrowRightLeft size={24} />, 
    href: '/dashboard/transactions',
  },
  {
    name: 'Pool Management',
    icon: <Layers size={24} />, 
    href: '/dashboard/pool-management',
  },
];
import React from 'react';
import { LayoutDashboard, ArrowRightLeft, UserCheck } from 'lucide-react';

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
    name: 'Approve',
    icon: <UserCheck size={24} />, 
    href: '/dashboard/approve',
  }
];
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/constants/menu';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import LogoAdminImage from '@/assets/images/logo-admin.png';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.wrapper}>
      {/* Logo Section */}
      <div className={styles.imageWrapper}>
      <div className={styles.left}>
        <Image
            src={LogoAdminImage}
            alt="Logo Admin Image"
            fill
            priority
            className={styles.image}
        />
      </div>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.linkBase} ${isActive ? styles.linkActive : styles.linkInactive}`}
            >
              <div className={`${styles.iconBase} ${isActive ? styles.iconActive : styles.iconInactive}`}>
                {item.icon}
              </div>
              <span className={styles.menuText}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className={styles.bottomSection}>
        <button className={styles.logoutButton}>
          <LogOut size={24} />
          <span className={styles.logoutText}>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

const styles = {
  // Image Section
  imageWrapper: 'w-full h-20 mb-8 flex items-center justify-center',
  left:'relative w-50 h-20',
  image: 'object-cover',

  // Layout
  wrapper: 'w-64 h-screen bg-surface border-r border-gray-200 flex flex-col py-8 fixed left-0 top-0 overflow-y-auto',
  
  // Header
  header: 'px-8 mb-12 flex items-center gap-2',
  logoBox: 'w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold',
  logoText: 'text-xl font-bold tracking-tight',
  
  // Navigation
  nav: 'flex-1 flex flex-col gap-2',
  
  // Menu Item 
  linkBase: 'flex items-center gap-4 py-3 px-8 transition-all duration-200 border-l-4 group',
  linkActive: 'bg-v100 border-v500 text-v500 font-semibold',
  linkInactive: 'border-transparent text-g500 hover:bg-v100 hover:text-v500',
  
  // Icon Colors
  iconBase: 'transition-colors',
  iconActive: 'text-v500',
  iconInactive: 'text-g500 group-hover:text-v500',
  menuText: 'text-base font-semibold',
  
  // Bottom Section
  bottomSection: 'px-8',
  logoutButton: 'flex items-center gap-4 text-g500 hover:bg-v300 hover:text-g500 rounded-xl transition-colors py-3 px-4 w-full -ml-4',
  logoutText: 'text-sm font-semibold'
};
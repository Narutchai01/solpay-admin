'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { menuItems } from '@/constants/menu';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import LogoAdminImage from '@/assets/images/logo-admin.png';
import { Box, Typography, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ModalComponent } from '../ui/Modal';
import { Theme } from '@/theme/theme';
import { adminService } from '@/services/adminService';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    adminService.logout();
    setIsLogoutModalOpen(false);
    router.replace('/login');
  };

  return (
    <Box 
      component="aside" 
      sx={{ 
        width: 256, 
        height: '100vh', 
        bgcolor: Theme.colors.surface, 
        borderRight: `1px solid ${Theme.colors.g50}`,
        display: 'flex',
        flexDirection: 'column',
        py: 4,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 1100,
        overflowY: 'auto'
      }}
    >
      {/* Logo Section */}
      <Box sx={{ width: '100%', height: 80, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: 200, height: 80 }}>
          <Image
              src={LogoAdminImage}
              alt="Logo Admin Image"
              fill
              priority
              style={{ objectFit: 'cover' }}
          />
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ flex: 1, px: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <ListItem key={item.name} disablePadding sx={{ borderLeft: '4px solid', borderColor: isActive ? Theme.colors.v500 : 'transparent' }}>
              <ListItemButton 
                component={Link} 
                href={item.href}
                sx={{ 
                  bgcolor: isActive ? Theme.colors.v100 : 'transparent',
                  color: isActive ? Theme.colors.v500 : Theme.colors.g500,
                  py: 1.5,
                  px: 3.5,
                  '&:hover': {
                    bgcolor: Theme.colors.v100,
                    color: Theme.colors.v500,
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ 
                    fontSize: '1rem', 
                    fontWeight: isActive ? 700 : 600 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Logout Button */}
      <Box sx={{ px: 4, mt: 'auto' }}>
        <Button 
          fullWidth
          startIcon={<LogOut size={24} />}
          onClick={() => setIsLogoutModalOpen(true)}
          sx={{ 
            justifyContent: 'flex-start',
            color: Theme.colors.g100,
            py: 1.5,
            px: 2,
            borderRadius: 3,
            textTransform: 'none',
            '&:hover': {
              bgcolor: Theme.colors.v300,
              color: Theme.colors.g500,
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Log Out</Typography>
        </Button>
      </Box>

      <ModalComponent
        visible={isLogoutModalOpen}
        title="Are you sure you want to log out?"
        cancelLabel="Cancel"
        confirmLabel="Log Out"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
};
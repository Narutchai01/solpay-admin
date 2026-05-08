import React from 'react';
import Image from 'next/image';
import { Box, Paper } from '@mui/material';
import LoginForm from '@/components/LoginForm';
import LoginImage from '@/assets/images/login-image.png';
import { Theme } from '@/theme/theme';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.colors.v75, 
        padding: { xs: 2, sm: 3, md: 4 }, 
      }}
    >
      <Paper
        elevation={12} 
        sx={{
          width: '100%',
          maxWidth: { xs: '60%', md: '700px'},
          minHeight: { xs: 'auto', md: '450px' },
          backgroundColor: 'background.paper',
          borderRadius: '2rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Section (Image) */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '50%' },
            // บนมือถือให้ลดความสูงภาพลง หรือซ่อนไปเลยถ้าอยากให้เข้าถึงฟอร์มเร็วขึ้น
            height: { xs: '200px', md: 'auto' }, 
            display: { xs: 'block', md: 'block' }
          }}
        >
          <Image
            src={LoginImage}
            alt="Login Image"
            fill
            priority
            style={{ objectFit: 'cover' }} 
          />
        </Box>

        {/* Right Section (Form) */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: 2, sm: 3, md: 4 }, // เพิ่ม padding ให้หายใจออก
          }}
        >
          <LoginForm />
        </Box>
      </Paper>
    </Box>
  );
}
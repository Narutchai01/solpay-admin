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
        padding: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={12} 
        sx={{
          width: '100%',
          maxWidth: '1024px',
          backgroundColor: 'background.paper',
          borderRadius: '2rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '50%' },
            minHeight: { xs: '300px', md: '600px' },
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

        {/* Right Section */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: 0, md: 2 },
          }}
        >
          <LoginForm />
        </Box>
      </Paper>
    </Box>
  );
}
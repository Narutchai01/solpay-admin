'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputWithIcon from './InputWithIcon';
import { Theme as CustomTheme } from '@/theme/theme';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%', 
        maxWidth: 560, 
        mx: 'auto', 
        gap: 5, 
        py: 6, 
        px: 3 
      }}
    >
      <Typography 
        variant="h3" 
        component="h4" 
        sx={{ fontWeight: 700, color: CustomTheme.colors.g500, textAlign: 'center' }}
      >
        Welcome To Solpay
      </Typography>

      <Box 
        component="form" 
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <InputWithIcon
          label="Email"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail size={20} />}
        />

        <InputWithIcon
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          leftIcon={<Lock size={20} />}
          rightIcon={
            <IconButton
              size="small"
              onClick={togglePasswordVisibility}
              sx={{ color: CustomTheme.colors.g100 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </IconButton>
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ 
            bgcolor: CustomTheme.colors.v300, 
            color: CustomTheme.colors.g300, 
            fontWeight: 700,
            py: 1.5,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              bgcolor: CustomTheme.colors.v400,
            },
            mt: 2
          }}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
}

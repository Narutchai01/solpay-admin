'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import InputWithIcon from './InputWithIcon';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>
        Welcome To Solpay
      </h4>

      <form className={styles.form}>
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
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.iconButton}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />

        <button
          type="submit"
          className={styles.submitButton}
        >
          Log in
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: 'flex flex-col items-center w-full max-w-xl mx-auto space-y-10 py-12 px-6',
  title: 'text-3xl font-bold text-gray-900 text-center',
  form: 'w-full space-y-6',
  iconButton: 'text-gray-600 hover:text-gray-800',
  submitButton: 'w-full bg-v300 hover:bg-v400 text-g300 font-semibold py-2 rounded-xl shadow-lg mt-4',
};
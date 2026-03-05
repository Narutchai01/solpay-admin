'use client';

import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function InputWithIcon({
  label,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: InputWithIconProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}
      </label>
      
      <div className={styles.inputContainer}>
        {leftIcon && (
          <div className={styles.leftIcon}>
            {leftIcon}
          </div>
        )}
        
        <input
          {...props}
          className={`${styles.inputBase} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`}
        />
        
        {rightIcon && (
          <div className={styles.rightIcon}>
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: 'w-full space-y-1.5',
  label: 'block text-sm font-semibold text-gray-700 ml-1',
  inputContainer: 'relative flex items-center w-full',
  leftIcon: 'absolute left-3 text-g500 flex items-center pointer-events-none',
  rightIcon: 'absolute right-3 flex items-center text-g500',
  inputBase: 'w-full bg-[#C0C0C0] text-gray-800 placeholder-g500 rounded-xl py-3 px-4 outline-none focus:bg-gray-200',
};
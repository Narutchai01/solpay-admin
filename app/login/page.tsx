import React from 'react';
import Image from 'next/image';
import LoginForm from '@/components/LoginForm';
import LoginImage from '@/assets/images/login-image.png';

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        
        {/* Left Section */}
        <div className={styles.leftPanel}>
          <Image
            src={LoginImage}
            alt="Login Image"
            fill
            priority
            className={styles.image}
          />
        </div>

        {/* Right Section */}
        <div className={styles.rightPanel}>
          <LoginForm />
        </div>

      </div>
    </div>
  );
}

const styles = {
  wrapper: 'min-h-screen w-full flex items-center justify-center bg-v75 p-4 md:p-8',
  card: 'w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row',
  // Left Panel
  leftPanel: 'relative w-full md:w-1/2 min-h-[300px] md:min-h-[600px]',
  image: 'object-cover',
  // Right Panel
  rightPanel: 'w-full md:w-1/2 bg-white flex flex-col items-center justify-center  md:p-4',
};
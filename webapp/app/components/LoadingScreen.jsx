import React from 'react';
import Image from 'next/image';
import styles from './LoadingScreen.module.css';
import logo from '../../public/image.png';

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Site Logo"/>
      </div>
    </div>
  );
};

export default LoadingScreen;

import React, { ReactChild } from 'react';
import Header from '../Header/Header';
import styles from './Layout.module.css';

const Layout = ({ children }: { children: ReactChild }) => {
  return (
    <div className={styles.Layout}>
      <Header />
      {children}
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;

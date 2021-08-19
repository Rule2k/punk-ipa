import React, { ReactChild } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Pagination from '../Pagination';
import styles from './Layout.module.css';

interface Props {
  children: ReactChild;
  shouldDisplayPagination?: boolean;
  fixedHeight?: boolean;
}

const Layout = ({ children, shouldDisplayPagination }: Props) => {
  return (
    <div className={styles.Layout}>
      <Header />
      {children}
      <div className={styles.Footer}>
        {shouldDisplayPagination ? (
          <Pagination />
        ) : (
          <Link to="/">
            <div className={styles.GoToHome}>Return to home</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Layout;

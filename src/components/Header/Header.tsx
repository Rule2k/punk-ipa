import React from 'react';
import { Link } from 'react-router-dom';
import url from './brewdog_logo.png';
import styles from './Header.module.css';

const Header = () => {
  return (
    <Link to="/">
      <div className={styles.Header}>
        <img src={url} />
      </div>
    </Link>
  );
};

export default Header;

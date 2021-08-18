import React from 'react';
import { Beer } from '../../../features/beers/beersSlice';
import styles from './SingleBeer.module.css';

const SingleBeer = ({ abv, image_url, name, tagline }: Beer) => {
  return (
    <div className={styles.SingleBeer}>
      <div>{name}</div>
      <div>{tagline}</div>
      <div></div>
    </div>
  );
};

export default SingleBeer;

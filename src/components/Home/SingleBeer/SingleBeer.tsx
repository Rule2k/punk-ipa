import React from 'react';
import { Beer } from '../../../features/beers/beersSlice';
import styles from './SingleBeer.module.css';

const SingleBeer = ({ abv, image_url, name, tagline }: Beer) => {
  return (
    <div className={styles.SingleBeer}>
      <div className={styles.Title}>{name}</div>
      <img className={styles.Image} src={image_url} />
      <div className={styles.Tagline}>{tagline}</div>
      <div className={styles.Abv}>{`${abv}%`}</div>
    </div>
  );
};

export default SingleBeer;

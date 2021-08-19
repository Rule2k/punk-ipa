import React from 'react';
import { truncate } from '../../../app/utils';
import { Beer } from '../../../features/beers/beersSlice';
import styles from './SingleBeer.module.css';

const SingleBeer = ({ abv, image_url, name, tagline, description }: Beer) => {
  return (
    <div className={styles.SingleBeer}>
      <div className={styles.Top}>
        <div className={styles.Title}>{name}</div>
        <div className={styles.Tagline}>{tagline}</div>
      </div>
      <div className={styles.Middle}>
        <img className={styles.Image} src={image_url} />
        <div className={styles.Description}>{truncate(description, 300)}</div>
      </div>
      <div className={styles.Abv}>{`${abv}%`}</div>
    </div>
  );
};

export default SingleBeer;

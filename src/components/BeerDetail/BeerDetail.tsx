import React from 'react';
import { BeerDetailed } from '../../features/beers/beersSlice';
import loadable from '../../hoc/Loadable/Loadable';
import styles from './BeerDetail.module.css';

const BeerDetail = ({
  abv,
  image_url,
  food_pairing,
  description,
  first_brewed,
  contributed_by,
  name,
  tagline,
  brewers_tips,
}: BeerDetailed) => (
  <div className={styles.BeerDetail}>
    <div className={styles.Name}>{name}</div>
    <div className={styles.Tagline}>{tagline}</div>
    <img className={styles.Image} src={image_url} alt={name} />
    <div className={styles.Texts}>
      <div className={styles.Description}>{description}</div>
      <div className={styles.FirstBrewed}>
        <span>First brewed: </span>
        {first_brewed} by {contributed_by}
      </div>
      <div className={styles.BrewersTips}>
        <span>Brewer tips: </span>
        {brewers_tips}
      </div>
      <div className={styles.FoodPairing}>
        <div className={styles.FoodPairingText}>Works great with:</div>
        {food_pairing?.map((food) => (
          <div key={food}>{food}</div>
        ))}
      </div>
      <div className={styles.Abv}>{abv}%</div>
    </div>
  </div>
);

export default loadable(BeerDetail);

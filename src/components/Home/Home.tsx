import React from 'react';
import SingleBeer from './SingleBeer';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import loadable from '../../hoc/Loadable/Loadable';
import { Beer } from '../../features/beers/beersSlice';

interface Props {
  listOfBeers: Beer[];
}

const Home = ({ listOfBeers }: Props) => {
  const emptyList = listOfBeers.length < 1;
  return (
    <div className={styles.Home}>
      {emptyList ? (
        <div>No data ! </div>
      ) : (
        listOfBeers.map((beer) => (
          <Link key={beer.name} to={`/beer/${beer.id}`}>
            <SingleBeer {...beer} />
          </Link>
        ))
      )}
    </div>
  );
};

export default loadable<Props>(Home);

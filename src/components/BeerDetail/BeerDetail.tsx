import React from 'react';
import { useParams } from 'react-router-dom';
import { Beer, BeerDetailed } from '../../features/beers/beersSlice';
import loadable from '../../hoc/Loadable/Loadable';

const BeerDetail = ({
  abv,
  id,
  image_url,
  ingredients,
  food_pairing,
  description,
  first_brewed,
  contributed_by,
  name,
  tagline,
  brewers_tips,
}: BeerDetailed) => {
  return (
    <div>
      <div>{name}</div>
      <div>{tagline}</div>
      <div>{abv}</div>
      <div>{description}</div>
      <div>{first_brewed}</div>
      <div>{contributed_by}</div>
      <div>{brewers_tips}</div>
    </div>
  );
};

export default loadable(BeerDetail);

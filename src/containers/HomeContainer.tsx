import React from 'react';
import { useAppSelector } from '../app/hooks';
import Home from '../components/Home';
import { selectListOfBeers, Status } from '../features/beers/beersSlice';

const HomeContainer = () => {
  const { data: listOfBeers, status } = useAppSelector(selectListOfBeers);

  return <Home loading={status !== Status.Succeed} listOfBeers={listOfBeers} />;
};

export default HomeContainer;

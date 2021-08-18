import React, { useEffect } from 'react';
import logo from './logo.svg';
import Router from './components/Router';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
  fetchListOfBeers,
  selectListOfBeers,
} from './features/beers/beersSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const listOfBeers = useAppSelector(selectListOfBeers);
  useEffect(() => {
    dispatch(fetchListOfBeers());
  }, [dispatch]);

  console.log({ listOfBeers });
  return <Router />;
};

export default App;

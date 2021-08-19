import React, { useEffect } from 'react';
import Router from './components/Router';
import { useAppDispatch } from './app/hooks';
import { fetchListOfBeers } from './features/beers/beersSlice';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchListOfBeers(1));
  }, [dispatch]);

  return <Router />;
};

export default App;

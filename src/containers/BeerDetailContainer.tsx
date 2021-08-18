import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import BeerDetail from '../components/BeerDetail';
import {
  BeerDetailed,
  fetchSingleBeer,
  selectCurrentBeer,
  Status,
} from '../features/beers/beersSlice';

const BeerDetailContainer = () => {
  const dispatch = useAppDispatch();
  const { id }: { id: string } = useParams();
  const { data: currentBeer, status } = useAppSelector(selectCurrentBeer);
  useEffect(() => {
    dispatch(fetchSingleBeer(id));
  }, []);

  return (
    <BeerDetail
      loading={status !== Status.Succeed}
      {...(currentBeer as BeerDetailed)}
    />
  );
};

export default BeerDetailContainer;

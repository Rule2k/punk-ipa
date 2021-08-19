import React from 'react';
import { useAppSelector } from '../app/hooks';
import ListOfBeers from '../components/ListOfBeers';
import { selectListOfBeers, Status } from '../features/beers/beersSlice';

const ListOfBeersContainer = () => {
  const { data: listOfBeers, status } = useAppSelector(selectListOfBeers);

  return (
    <ListOfBeers
      height={'172rem'}
      loading={status !== Status.Succeed}
      listOfBeers={listOfBeers}
    />
  );
};

export default ListOfBeersContainer;

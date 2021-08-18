import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchRequest } from '../app/api';
import BeerDetail from '../components/BeerDetail';
import { BeerDetailed } from '../features/beers/beersSlice';

const BeerDetailContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentBeer, setCurrentBeer] = useState<BeerDetailed>();
  const { id }: { id: string } = useParams();

  // we don't really need to fetch a single beer since the /beers endpoint already sends all the infos we need for a single beer,
  // but in a real app, the beerlist should not contain that many infos and we should fetch the infos for each beers individually so it's a good pratice exercice

  useEffect(() => {
    setIsLoading(true);
    fetchRequest<BeerDetailed[]>(`beers/${id}`)
      .then((response) => {
        setCurrentBeer(response[0]);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return <BeerDetail loading={isLoading} {...(currentBeer as BeerDetailed)} />;
};

export default BeerDetailContainer;

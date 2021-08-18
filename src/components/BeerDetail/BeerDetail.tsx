import React from 'react';
import { useParams } from 'react-router-dom';

const BeerDetail = () => {
  const { id }: { id: string } = useParams();
  return <div>Beer details {id}</div>;
};

export default BeerDetail;

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  nextPage,
  previousPage,
  selectCurrentPage,
  fetchListOfBeers,
} from '../../features/beers/beersSlice';
import styles from './Pagination.module.css';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  useEffect(() => {
    dispatch(fetchListOfBeers(currentPage));
  }, [currentPage]);
  return (
    <div className={styles.Pagination}>
      {currentPage > 1 && (
        <div onClick={() => dispatch(previousPage())}>Previous</div>
      )}
      <div>{`Page: ${currentPage}`}</div>
      <div onClick={() => dispatch(nextPage())}>Next</div>
    </div>
  );
};

export default Pagination;

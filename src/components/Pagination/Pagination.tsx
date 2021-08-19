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
  }, [currentPage, dispatch]);
  return (
    <>
      <div className={styles.Pagination}>
        {currentPage > 1 && (
          <div onClick={() => dispatch(previousPage())}>Previous</div>
        )}
        <div onClick={() => dispatch(nextPage())}>Next</div>
      </div>{' '}
      <div className={styles.CurrentPage}>{`Page: ${currentPage}`}</div>
    </>
  );
};

export default Pagination;

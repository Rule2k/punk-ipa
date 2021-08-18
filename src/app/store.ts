import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import beersSlice from '../features/beers/beersSlice';

export const store = configureStore({
  reducer: {
    beers: beersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchRequest } from '../../app/api';
interface Amout {
  value: number;
  unit: string;
}

interface Ingredient {
  name: string;
  amount: Amout;
}

export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  abv: number;
}

export interface BeerDetailed extends Beer {
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ingredients: {
    [name: string]: Ingredient;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}

export enum Status {
  Loading = 'loading',
  Failed = 'failed',
  Succeed = 'succeed',
  Idle = 'idle',
}

interface BeersState {
  currentBeer: {
    status: Status;
    data?: BeerDetailed;
  };
  listOfBeers: {
    status: Status;
    data: Beer[];
  };
}

const initialState: BeersState = {
  currentBeer: {
    status: Status.Idle,
    data: undefined,
  },
  listOfBeers: {
    status: Status.Idle,
    data: [],
  },
};

export const fetchListOfBeers = createAsyncThunk(
  'beers/fetchListOfBeers',
  async () => {
    const response = await fetchRequest<BeerDetailed[]>('beers');
    return response;
  }
);

const getNeededKeys = <T extends unknown>(payload: BeerDetailed): T => {
  const { id, name, tagline, image_url, abv } = payload;

  return {
    id,
    name,
    tagline,
    image_url,
    abv,
  } as T;
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListOfBeers.pending, (state) => {
        state.listOfBeers.status = Status.Loading;
      })
      .addCase(fetchListOfBeers.fulfilled, (state, action) => {
        state.listOfBeers.status = Status.Succeed;
        state.listOfBeers.data = action.payload.map((beer) =>
          getNeededKeys<Beer>(beer)
        );
      })
      .addCase(fetchListOfBeers.rejected, (state) => {
        state.listOfBeers.status = Status.Failed;
      });
  },
});

export const selectCurrentBeer = (state: RootState) => state.beers.currentBeer;
export const selectListOfBeers = (state: RootState) => state.beers.listOfBeers;

export default counterSlice.reducer;

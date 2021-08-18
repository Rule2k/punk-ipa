import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
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
    data?: Beer;
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
    const response = await fetchRequest<Beer[]>('beers');
    return response;
  }
);

// we don't really need to fetch a single beer since the /beers endpoint already send all the infos we need for a single beer,
// but in a real app, the beerlist should not contain that many data and we should fetch the infos for each beers so it's a good pratice exercice
export const fetchSingleBeer = createAsyncThunk(
  'beers/fetchSingleBeer',
  async (id: string) => {
    const response = await fetchRequest<Beer>(`beers/${id}`);
    return response;
  }
);

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
        state.listOfBeers.data = action.payload;
      })
      .addCase(fetchListOfBeers.rejected, (state) => {
        state.listOfBeers.status = Status.Failed;
      })
      .addCase(fetchSingleBeer.pending, (state) => {
        state.currentBeer.status = Status.Loading;
      })
      .addCase(fetchSingleBeer.fulfilled, (state, action) => {
        state.currentBeer.status = Status.Succeed;
        state.currentBeer.data = action.payload;
      })
      .addCase(fetchSingleBeer.rejected, (state) => {
        state.currentBeer.status = Status.Failed;
      });
  },
});

export const selectCurrentBeer = (state: RootState) =>
  state.beers.currentBeer.data;
export const selectListOfBeers = (state: RootState) =>
  state.beers.listOfBeers.data;

export default counterSlice.reducer;

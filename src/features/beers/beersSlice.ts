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

// we don't really need to fetch a single beer since the /beers endpoint already send all the infos we need for a single beer,
// but in a real app, the beerlist should not contain that many data and we should fetch the infos for each beers so it's a good pratice exercice
export const fetchSingleBeer = createAsyncThunk(
  'beers/fetchSingleBeer',
  async (id: string) => {
    const response = await fetchRequest<BeerDetailed[]>(`beers/${id}`);
    return response;
  }
);

const getNeededKeys = <T extends unknown>(
  payload: BeerDetailed,
  shouldReturnCompleteData: boolean
): T => {
  const {
    id,
    name,
    tagline,
    first_brewed,
    description,
    image_url,
    abv,
    ingredients,
    food_pairing,
    brewers_tips,
    contributed_by,
  } = payload;

  return shouldReturnCompleteData
    ? ({
        id,
        name,
        tagline,
        first_brewed,
        description,
        image_url,
        abv,
        ingredients,
        food_pairing,
        brewers_tips,
        contributed_by,
      } as T)
    : ({
        id,
        name,
        tagline,
        image_url,
        abv,
      } as T);
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
          getNeededKeys<Beer>(beer, false)
        );
      })
      .addCase(fetchListOfBeers.rejected, (state) => {
        state.listOfBeers.status = Status.Failed;
      })
      .addCase(fetchSingleBeer.pending, (state) => {
        state.currentBeer.status = Status.Loading;
      })
      .addCase(fetchSingleBeer.fulfilled, (state, action) => {
        state.currentBeer.status = Status.Succeed;
        state.currentBeer.data = getNeededKeys<BeerDetailed>(
          action.payload[0],
          true
        );
      })
      .addCase(fetchSingleBeer.rejected, (state) => {
        state.currentBeer.status = Status.Failed;
      });
  },
});

export const selectCurrentBeer = (state: RootState) => state.beers.currentBeer;
export const selectListOfBeers = (state: RootState) => state.beers.listOfBeers;

export default counterSlice.reducer;

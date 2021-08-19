import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
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

// Interface for the list of Beer
export interface Beer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  abv: number;
  description: string;
}
// Interface for a detailed Beer
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
  currentPage: number;
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
  currentPage: 1,
};

export const fetchListOfBeers = createAsyncThunk(
  'beers/fetchListOfBeers',
  async (page: number) => {
    const endpoint = `beers?page=${page}`;
    const response = await fetchRequest<BeerDetailed[]>(endpoint);
    return response;
  }
);

const getNeededKeys = <T extends unknown>(payload: Beer): T => {
  const { id, name, tagline, image_url, abv, description } = payload;

  return {
    id,
    name,
    tagline,
    image_url,
    description,
    abv,
  } as T;
};

export const beerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    previousPage: (state) => {
      state.currentPage > 1
        ? (state.currentPage -= 1)
        : (state.currentPage = state.currentPage);
    },
  },
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

export const { nextPage, previousPage } = beerSlice.actions;

export const selectCurrentBeer = (state: RootState) => state.beers.currentBeer;
export const selectListOfBeers = (state: RootState) => state.beers.listOfBeers;
export const selectCurrentPage = (state: RootState) => state.beers.currentPage;

export default beerSlice.reducer;

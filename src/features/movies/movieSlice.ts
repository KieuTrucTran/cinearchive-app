// Handles fetching and storing movie data
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
// Fetches trending movies or TV shows from the TMDB API
export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async (data, thunkApi) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MOVIE_KEY}`
      );
      return await response.json();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// get more details
export const getMovieDetails = createAsyncThunk(
  "movies/getMovieDetails",
  async (movieId: string | undefined, thunkApi) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_KEY}`
      );
      return await response.json();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

interface MovieState {
  loading: boolean;
  error: null | string;
  data: null | { results: any[] };
  movieDetails: null | any;
}

const initialState: MovieState = {
  loading: false,
  error: null,
  data: null,
  movieDetails: null,
};

// Slice
// Manages the state of the movies
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovies.fulfilled,
      (state, action: PayloadAction<{ results: any[] }>) => {
        state.loading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(getMovies.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getMovieDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMovieDetails.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.movieDetails = action.payload;
      }
    );
    builder.addCase(
      getMovieDetails.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default movieSlice.reducer;
export const getSelectedMovie = (state: any) => state.movies.movieDetails;

// Handles fetching and storing movie data
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as movieApi from "../../api/movieApi";

// Fetching actions for multiple movie types
export const getTrendingMovies = createAsyncThunk(
  "movies/getTrendingMovies",
  async () => {
    const data = await movieApi.fetchTrendingMovies();
    return data.results;
  }
);

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async () => {
    const data = await movieApi.fetchPopularMovies();
    return data.results;
  }
);

export const getTopRatedMovies = createAsyncThunk(
  "movies/getTopRatedMovies",
  async () => {
    const data = await movieApi.fetchTopRatedMovies();
    return data.results;
  }
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/getUpcomingMovies",
  async () => {
    const data = await movieApi.fetchUpcomingMovies();
    return data.results;
  }
);

export const getMovieDetails = createAsyncThunk<MovieDetail, string>(
  "movies/getMovieDetails",
  async (movieId: string) => {
    const response = await movieApi.fetchMovieDetails(movieId);
    return response as MovieDetail;
  }
);

export interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
}

interface MovieState {
  trending: any[];
  popular: any[];
  topRated: any[];
  upcoming: any[];
  movieDetails: MovieDetail | null;
  loading: boolean;
  error: null | string;
  darkTheme: boolean;
}

const initialState: MovieState = {
  trending: [],
  popular: [],
  topRated: [],
  upcoming: [],
  movieDetails: null,
  loading: false,
  error: null,
  darkTheme: false,
};

// Manages the state of the movies
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Trending movies
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTrendingMovies.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.trending = action.payload;
        }
      )
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch trending movies";
      });

    // Popular movies
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPopularMovies.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.popular = action.payload;
        }
      )
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch popular movies";
      });

    // Top rated movies
    builder
      .addCase(getTopRatedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getTopRatedMovies.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.topRated = action.payload;
        }
      )
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch top-rated movies";
      });

    // Upcoming movies
    builder
      .addCase(getUpcomingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUpcomingMovies.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.loading = false;
          state.upcoming = action.payload;
        }
      )
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch upcoming movies";
      });

    // Movie details
    builder
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getMovieDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.movieDetails = action.payload;
        }
      )
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movie details";
      });
  },
});

export default movieSlice.reducer;
export const getSelectedMovie = (state: any) => state.movies.movieDetails;

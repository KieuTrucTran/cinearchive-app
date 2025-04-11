import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

interface UserListsState {
  favorites: Movie[];
}

const initialState: UserListsState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const userListsSlice = createSlice({
  name: "userLists",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const exists = state.favorites.some(
        (movie) => movie.id === action.payload.id
      );
      if (exists) {
        state.favorites = state.favorites.filter(
          (movie) => movie.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite } = userListsSlice.actions;
export default userListsSlice.reducer;

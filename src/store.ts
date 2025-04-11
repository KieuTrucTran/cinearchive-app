// Set up the Redux store
import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./features/theme/themeSlice";
import movieReducer from "./features/movies/movieSlice";
import userListsReducer from "./features/movies/userListsSlice";

export const store = configureStore({
  reducer: {
    darkTheme: themeReducer,
    movies: movieReducer,
    userLists: userListsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

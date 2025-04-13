// Entry point of the application
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./routes/HomePage";
import SearchPage from "./routes/SearchPage";
import MoviesPage from "./routes/MoviesPage";
import MovieDetailPage from "./routes/MovieDetailPage";
import FavoritesPage from "./routes/FavoritesPage";
import WatchlistPage from "./routes/WatchlistPage";

import "./index.css";
import { store } from "./store"; // central state management object of the app
import { RootState } from "./store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkTheme = useSelector((state: RootState) => state.darkTheme);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return <>{children}</>;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="movies" element={<MoviesPage />} />
              <Route path="movie/:movieId" element={<MovieDetailPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="watchlist" element={<WatchlistPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

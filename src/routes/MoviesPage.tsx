import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../features/movies/movieSlice";

function MoviesPage() {
  const { darkTheme, popular, topRated, upcoming, loading, error } =
    useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getUpcomingMovies());
  }, [dispatch]);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="dark:bg-blue-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        <h2 className="text-2xl font-bold mb-6">All Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {/* Unique prefixes to keys based on the source array */}
          {[
            ...popular.map((movie) => ({ ...movie, keyPrefix: "popular" })),
            ...topRated.map((movie) => ({ ...movie, keyPrefix: "topRated" })),
            ...upcoming.map((movie) => ({ ...movie, keyPrefix: "upcoming" })),
          ].map((movie) => {
            const { id, title, overview, poster_path, keyPrefix } = movie;
            return (
              <MovieCard
                key={`${keyPrefix}-${id}`} // Unique keys
                id={id}
                title={title}
                poster_path={poster_path}
                release_date={movie.release_date}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MoviesPage;

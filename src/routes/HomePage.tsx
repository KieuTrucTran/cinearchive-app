import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../features/movies/movieSlice";

function HomePage() {
  const {
    darkTheme,
    trending = [],
    popular = [],
    topRated = [],
    upcoming = [],
    loading,
    error,
  } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTrendingMovies());
    dispatch(getPopularMovies());
    dispatch(getTopRatedMovies());
    dispatch(getUpcomingMovies());
  }, [dispatch]);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="dark:bg-blue-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        {/* Trending Section */}
        <h2 className="text-2xl font-bold mb-6">Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {trending.map((movie) => {
            const { id, title, overview, poster_path } = movie;
            return (
              <MovieCard
                key={id}
                id={id}
                title={title}
                overview={overview}
                poster_path={poster_path}
              />
            );
          })}
        </div>

        {/* Popular Section */}
        <h2 className="text-2xl font-bold mb-6">Popular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {popular.map((movie) => {
            const { id, title, overview, poster_path } = movie;
            return (
              <MovieCard
                key={id}
                id={id}
                title={title}
                overview={overview}
                poster_path={poster_path}
              />
            );
          })}
        </div>

        {/* Top Rated Section */}
        <h2 className="text-2xl font-bold mb-6">Top Rated</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {topRated.map((movie) => {
            const { id, title, overview, poster_path } = movie;
            return (
              <MovieCard
                key={id}
                id={id}
                title={title}
                overview={overview}
                poster_path={poster_path}
              />
            );
          })}
        </div>

        {/* Upcoming Section */}
        <h2 className="text-2xl font-bold mb-6">Upcoming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {upcoming.map((movie) => {
            const { id, title, overview, poster_path } = movie;
            return (
              <MovieCard
                key={id}
                id={id}
                title={title}
                overview={overview}
                poster_path={poster_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

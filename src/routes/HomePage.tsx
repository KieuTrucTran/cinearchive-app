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
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
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
              poster_path={poster_path}
              release_date={movie.release_date}
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
              poster_path={poster_path}
              release_date={movie.release_date}
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
              poster_path={poster_path}
              release_date={movie.release_date}
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
              poster_path={poster_path}
              release_date={movie.release_date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

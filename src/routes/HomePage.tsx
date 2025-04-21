import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import TrendingSlider from "../components/Slider/TrendingSlider";
import MovieSection from "../components/MovieSection/MovieSection";
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      {/* Trending Section */}
      <TrendingSlider movies={trending} />

      {/* Popular Section */}
      <MovieSection
        title="Popular Movies"
        movies={popular}
        onSeeMore={() => console.log("Load more popular movies")}
      />

      {/* Top Rated Section */}
      <MovieSection
        title="Top Rated Movies"
        movies={topRated}
        onSeeMore={() => console.log("Load more top-rated movies")}
      />

      {/* Upcoming Section */}
      <MovieSection
        title="Upcoming Movies"
        movies={upcoming}
        onSeeMore={() => console.log("Load more upcoming movies")}
      />
    </div>
  );
}

export default HomePage;

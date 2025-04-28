import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen">
      <div>
        {/* Trending Section */}
        <TrendingSlider movies={trending} />
      </div>

      <div className="px-4 lg:px-12 pb-20">
        {/* Popular Section */}
        <MovieSection
          title="Popular Movies"
          movies={popular}
          onSeeMore={() => navigate("/movie/popular")}
        />

        {/* Top Rated Section */}
        <MovieSection
          title="Top Rated Movies"
          movies={topRated}
          onSeeMore={() => navigate("/movie/top-rated")}
        />

        {/* Upcoming Section */}
        <MovieSection
          title="Upcoming Movies"
          movies={upcoming}
          onSeeMore={() => navigate("/movie/upcoming")}
        />
      </div>
    </div>
  );
}

export default HomePage;

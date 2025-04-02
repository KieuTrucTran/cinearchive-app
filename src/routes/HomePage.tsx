import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getMovies } from "../features/movies/movieSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";

function Home() {
  const { darkTheme, movies } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="dark:bg-blue-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        {/* Header for Trending Section */}
        <h2 className="text-2xl font-bold mb-6">Trending</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {movies.data?.results &&
            movies.data.results.map((movie) => {
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
      <Outlet />
    </div>
  );
}

export default Home;

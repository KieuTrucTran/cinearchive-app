import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard/MovieCard";
import { fetchMoviesWithFilters } from "../api/movieApi";

const MovieListPage = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [movies, setMovies] = useState<
    { id: number; title: string; poster_path: string; release_date: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let filters = {};
        if (type === "popular") filters = { sort_by: "popularity.desc" };
        if (type === "top-rated") filters = { sort_by: "vote_average.desc" };
        if (type === "upcoming") filters = { sort_by: "release_date.desc" };

        const data = await fetchMoviesWithFilters(filters);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [type]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen px-4 lg:px-12 pb-20">
      <h1 className="text-2xl font-bold mb-6">
        {type === "popular" && "Popular Movies"}
        {type === "top-rated" && "Top Rated Movies"}
        {type === "upcoming" && "Upcoming Movies"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieListPage;

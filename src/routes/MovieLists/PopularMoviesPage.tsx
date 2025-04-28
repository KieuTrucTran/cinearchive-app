import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchPopularMovies } from "../../api/movieApi";

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState<
    { id: number; title: string; poster_path: string; release_date: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <h1 className="text-2xl font-bold py-6">Popular Movies</h1>
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

export default PopularMoviesPage;

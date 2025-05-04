import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchPopularMovies } from "../../api/movieApi";

const PopularMoviesPage = () => {
  const [movies, setMovies] = useState<
    { id: number; title: string; poster_path: string; release_date: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchMovies = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPopularMovies(page);
      setMovies(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handlePageChange = (direction: "next" | "prev") => {
    setPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(prev - 1, 1)
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <h1 className="text-2xl font-bold py-6">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
      <div className="w-full border-b-2 border-light-text dark:border-dark-text mt-12"></div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={page === 1}
          className="px-4 py-1 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded hover:bg-light-accent duration-300 dark:hover:bg-dark-accent disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {page > 1 && (
            <span
              onClick={() => setPage(page - 1)}
              className="cursor-pointer opacity-70 hover:opacity-100"
            >
              {page - 1}
            </span>
          )}
          <span className="font-bold opacity-100">{page}</span>
          <span
            onClick={() => setPage(page + 1)}
            className="cursor-pointer opacity-70 hover:opacity-100"
          >
            {page + 1}
          </span>
        </div>
        <button
          onClick={() => handlePageChange("next")}
          className="px-4 py-1 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded hover:bg-light-accent duration-300 dark:hover:bg-dark-accent"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularMoviesPage;

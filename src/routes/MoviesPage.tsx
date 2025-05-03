import { useEffect, useState } from "react";
import { fetchMoviesWithFilters, fetchGenres } from "../api/movieApi";
import MovieCard from "../components/MovieCard/MovieCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function MoviesPage() {
  const [movies, setMovies] = useState<
    { id: number; title: string; poster_path: string; release_date: string }[]
  >([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    with_genres: "",
    page: 1,
  });
  const [pendingFilters, setPendingFilters] = useState(filters);

  const fetchMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMoviesWithFilters(filters);
      setMovies(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const data = await fetchGenres();
      setGenres(data.genres);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [filters]);

  const handleFilterChange = (key: string, value: string | number) => {
    setPendingFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters({ ...pendingFilters, page: 1 });
  };

  const handlePageChange = (direction: "next" | "prev") => {
    setFilters((prev) => ({
      ...prev,
      page: direction === "next" ? prev.page + 1 : Math.max(prev.page - 1, 1),
    }));
  };

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <div className="pt-8 pb-2 flex justify-end items-center space-x-4">
        <span className="text-sm font-semibold">Sort by</span>
        <label>
          <select
            onChange={(e) => handleFilterChange("sort_by", e.target.value)}
            value={pendingFilters.sort_by}
            className="bg-light-background dark:bg-dark-background"
          >
            <option value="popularity.desc">Popularity</option>
            <option value="vote_average.desc">Top Rated</option>
          </select>
        </label>
        <label>
          <select
            onChange={(e) => handleFilterChange("with_genres", e.target.value)}
            value={pendingFilters.with_genres}
            className="bg-light-background dark:bg-dark-background"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <MagnifyingGlassIcon
          onClick={applyFilters}
          className="h-5 w-5 cursor-pointer hover:opacity-50"
        />
      </div>
      <div className="w-full border-b-2 border-light-text dark:border-dark-text mb-6"></div>

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
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={filters.page === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {filters.page}</span>
        <button
          onClick={() => handlePageChange("next")}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MoviesPage;

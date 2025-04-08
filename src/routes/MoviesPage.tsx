import { useEffect, useState } from "react";
import { fetchMoviesWithFilters, fetchGenres } from "../api/movieApi";
import MovieCard from "../components/MovieCard/MovieCard";

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
    setFilters(pendingFilters);
  };

  if (loading) return <div>Loading movies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen px-4 lg:px-12 pb-20">
      <div className="mb-6">
        <label>
          Sort By:
          <select
            onChange={(e) => handleFilterChange("sort_by", e.target.value)}
            value={pendingFilters.sort_by}
          >
            <option value="popularity.desc">Popularity</option>
            <option value="vote_average.desc">Top Rated</option>
          </select>
        </label>
        <label>
          Genre:
          <select
            onChange={(e) => handleFilterChange("with_genres", e.target.value)}
            value={pendingFilters.with_genres}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={applyFilters}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
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
}

export default MoviesPage;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { getMovieDetails } from "../features/movies/movieSlice";

type Genre = {
  id: number;
  name: string;
};

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const {
    movieDetails: movie,
    loading,
    error,
  } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetails(movieId));
    }
  }, [dispatch, movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie details available</div>;
  }

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="min-h-screen px-4 lg:px-12 pb-20 flex flex-col lg:flex-row items-start">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        className="w-full lg:w-1/3 rounded-lg mb-6 lg:mb-0"
      />
      <div className="lg:ml-8">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{year}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {movie.overview}
        </p>
        <h2 className="text-xl font-semibold mb-2">Genres</h2>
        <ul className="list-disc list-inside mb-6">
          {movie && movie.genres && movie.genres.map((genre: Genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        {movie.homepage && (
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Watch Trailer
          </a>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;

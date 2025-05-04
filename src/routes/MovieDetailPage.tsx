import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import {
  getMovieDetails,
  getMovieCredits,
  getWatchProviders,
  getSimilarMovies,
} from "../features/movies/movieSlice";
import {
  toggleFavorite,
  toggleWatchlist,
} from "../features/movies/userListsSlice";
import { fetchMovieVideos } from "../api/movieApi";
import Modal from "../components/Modal/Modal";
import MovieCard from "../components/MovieCard/MovieCard";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const {
    movieDetails: movie,
    credits,
    providers,
    similarMovies,
    loading,
    error,
  } = useAppSelector((state) => state.movies);
  const { favorites, watchlist } = useAppSelector((state) => state.userLists);

  const [showModal, setShowModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const isFavorite = favorites.some((movie) => movie.id === Number(movieId));
  const isInWatchlist = watchlist.some((movie) => movie.id === Number(movieId));

  const handleFavorite = () => {
    if (movie) {
      dispatch(
        toggleFavorite({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        })
      );
    }
  };

  const handleWatchlist = () => {
    if (movie) {
      dispatch(
        toggleWatchlist({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
        })
      );
    }
  };

  const handleTrailerClick = async () => {
    if (!movieId) return;

    try {
      const response = await fetchMovieVideos(Number(movieId));
      const trailer = response.results.find(
        (video: { type: string }) => video.type === "Trailer"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setShowModal(true);
      } else {
        setTrailerUrl(null);
        alert("No trailer available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetails(movieId));
      dispatch(getMovieCredits(movieId));
      dispatch(getWatchProviders(movieId));
      dispatch(getSimilarMovies(movieId));
    }
  }, [dispatch, movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie details available</div>;

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        className="w-full lg:w-1/3 rounded-lg mb-6 lg:mb-0"
      />
      <div className="lg:ml-8">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Year: {year}</p>
        <h2 className="text font-bold mb-4">{movie.tagline}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {movie.overview}
        </p>

        <h2 className="text-xl font-semibold mb-2">Genres</h2>
        <ul className="list-disc list-inside mb-6">
          {movie.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Cast</h2>
        <ul className="list-disc list-inside mb-6">
          {credits.slice(0, 5).map((cast) => (
            <li key={cast.id}>
              {cast.name} as {cast.character}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Watch Providers</h2>
        <ul className="list-disc list-inside mb-6">
          {providers && providers.US && providers.US.flatrate ? (
            providers.US.flatrate.map(
              (provider: { provider_id: number; provider_name: string }) => (
                <li key={provider.provider_id}>{provider.provider_name}</li>
              )
            )
          ) : (
            <li>No providers available</li>
          )}
        </ul>

        <button
          onClick={handleTrailerClick}
          className="px-4 py-2 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded-lg hover:bg-light-accent duration-300 dark:hover:bg-dark-accent"
        >
          Watch Trailer
        </button>

        <div className="flex gap-4 mt-4">
          <button
            onClick={handleFavorite}
            className={`px-4 py-2 rounded ${
              isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>

          <button
            onClick={handleWatchlist}
            className={`px-4 py-2 rounded ${
              isInWatchlist
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
            }`}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-2 mt-6">Similar Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {similarMovies.map((movie) => (
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

      {/* Modal for Trailer */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Trailer">
          {trailerUrl ? (
            <iframe
              width="560"
              height="315"
              src={trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default MovieDetailPage;

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
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  BookmarkIcon as SolidBookmarkIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";

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
      <div className="flex flex-col lg:flex-row gap-8 pt-8">
        {/* Left Section: Movie Poster */}
        <div className="lg:w-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg mb-6"
          />
        </div>

        {/* Right Section: Movie Details */}
        <div className="flex-1">
          {/* Title, Year, and Director */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {year} Directed by {"Unknown"}
            </p>
          </div>

          {/* Tagline */}
          <h2 className="text-xl font-semibold italic mb-4">{movie.tagline}</h2>

          {/* Overview */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {movie.overview}
          </p>

          {/* Divider */}
          <div className="w-full border-b-2 border-light-text dark:border-dark-text mb-6"></div>

          {/* Genres */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Genre</h2>
            <ul className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <li
                  key={genre.id}
                  className="px-3 py-1 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded-full text-sm"
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Watch Providers */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Where to Watch</h2>
            <ul className="list-disc list-inside">
              {providers && providers.US && providers.US.flatrate ? (
                providers.US.flatrate.map(
                  (provider: {
                    provider_id: number;
                    provider_name: string;
                  }) => (
                    <li key={provider.provider_id}>{provider.provider_name}</li>
                  )
                )
              ) : (
                <li>No providers available</li>
              )}
            </ul>
          </div>

          {/* Actions: Trailer, Bookmark, and Favorite */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleTrailerClick}
              className="px-4 py-2 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent"
            >
              Watch Trailer
            </button>
            <div className="flex items-center gap-x-3 p-2 px-3 bg-light-accentBackground dark:bg-dark-accentBackground rounded-lg">
              <button onClick={handleWatchlist} className="hover:opacity-80">
                {isInWatchlist ? (
                  <SolidBookmarkIcon className="h-6 w-6 text-light-text dark:text-dark-text" />
                ) : (
                  <BookmarkIcon className="h-6 w-6 text-light-text dark:text-dark-text" />
                )}
              </button>
              <button onClick={handleFavorite} className="hover:opacity-80">
                {isFavorite ? (
                  <SolidHeartIcon className="h-6 w-6 text-light-accent-80 dark:text-dark-accent" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-light-accent-80 dark:text-dark-accent" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cast</h2>
        <div className="flex flex-wrap gap-4">
          {credits.slice(0, 5).map((cast) => (
            <div key={cast.id} className="flex flex-col items-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <p className="text-sm font-medium mt-2 text-center">
                {cast.name}
              </p>
              <p className="text-xs text-gray-500 text-center">
                as {cast.character}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Similar Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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

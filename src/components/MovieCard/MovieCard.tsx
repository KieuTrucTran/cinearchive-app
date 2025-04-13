/* Display individual movie details */
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import {
  toggleFavorite,
  toggleWatchlist,
} from "../../features/movies/userListsSlice";

interface MovieCardProps {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
}

const MovieCard: FC<MovieCardProps> = ({
  poster_path,
  title,
  release_date,
  id,
}) => {
  const dispatch = useAppDispatch();
  const { favorites, watchlist } = useAppSelector((state) => state.userLists);

  const isFavorite = favorites.some((movie) => movie.id === id);
  const isInWatchlist = watchlist.some((movie) => movie.id === id);

  const handleFavorite = () => {
    dispatch(toggleFavorite({ id, title, poster_path, release_date }));
  };

  const handleWatchlist = () => {
    dispatch(toggleWatchlist({ id, title, poster_path, release_date }));
  };

  const year = release_date ? new Date(release_date).getFullYear() : "N/A";

  return (
    <div>
      <Link to={`/movie/${id}`}>
        <div className="max-w-xs bg-white mx-auto rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 duration-200 cursor-pointer">
          <img
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt={title}
            loading="lazy"
            className="rounded-t-lg w-full object-cover"
          />
          <div className="p-3">
            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">{year}</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-center mt-2">
        <button
          onClick={handleFavorite}
          className={`px-4 py-2 rounded ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
        <button
          onClick={handleWatchlist}
          className={`px-4 py-2 rounded ${
            isInWatchlist ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

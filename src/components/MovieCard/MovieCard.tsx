import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import {
  toggleFavorite,
  toggleWatchlist,
} from "../../features/movies/userListsSlice";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  BookmarkIcon as SolidBookmarkIcon,
  HeartIcon as SolidHeartIcon,
} from "@heroicons/react/24/solid";

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

  return (
    <div className="relative group max-w-xs mx-auto">
      {/* Movie Card */}
      <Link to={`/movie/${id}`}>
        <div className="rounded-lg overflow-hidden hover:outline hover:outline-2 hover:outline-light-accent dark:hover:outline-dark-accent transition duration-200">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/original${poster_path}`
                : "/no_poster.png"
            }
            alt={title}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
      </Link>

      {/* Icons (Bookmark and Heart) */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 p-1 rounded">
        <button onClick={handleWatchlist} className="hover:opacity-80">
          {isInWatchlist ? (
            <SolidBookmarkIcon className="h-6 w-6 text-white" />
          ) : (
            <BookmarkIcon className="h-6 w-6 text-white" />
          )}
        </button>
        <button onClick={handleFavorite} className="hover:opacity-80">
          {isFavorite ? (
            <SolidHeartIcon className="h-6 w-6 text-red-500 dark:text-dark-accent" />
          ) : (
            <HeartIcon className="h-6 w-6 text-red-500 dark:text-dark-accent" />
          )}
        </button>
      </div>

      {/* Movie Title */}
      <div className="mt-2 text-center">
        <h5 className="text-lg font-bold text-light-text dark:text-dark-text">
          {title}
        </h5>
        <p className="text-sm text-light-text-50 dark:text-dark-text-50">
          {release_date ? new Date(release_date).getFullYear() : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

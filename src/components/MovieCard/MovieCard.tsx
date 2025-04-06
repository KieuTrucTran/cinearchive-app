/* Display individual movie details */
import { FC } from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  poster_path: string;
  title: string;
  release_date: string; // Add release_date for the year
  id: number;
}

const MovieCard: FC<MovieCardProps> = (props) => {
  const { poster_path, title, release_date, id } = props;
  const year = release_date ? new Date(release_date).getFullYear() : "N/A";

  return (
    <Link to={`${id}`}>
      <div
        className="max-w-xs bg-white mx-auto rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 
     duration-200 cursor-pointer"
      >
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
  );
};

export default MovieCard;

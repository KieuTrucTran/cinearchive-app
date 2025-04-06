import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieDetail {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
}

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_MOVIES_ACCESS_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
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
          {movie.genres.map((genre) => (
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

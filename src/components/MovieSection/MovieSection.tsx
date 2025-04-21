import React from "react";
import MovieCard from "../MovieCard/MovieCard";

interface MovieSectionProps {
  title: string;
  movies: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
  }[];
  onSeeMore: () => void;
}

const MovieSection: React.FC<MovieSectionProps> = ({
  title,
  movies,
  onSeeMore,
}) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button onClick={onSeeMore} className="text-blue-500 hover:underline">
          See More
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
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
};

export default MovieSection;

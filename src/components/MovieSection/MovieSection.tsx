import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
      <Swiper spaceBetween={20} slidesPerView={5} className="w-full">
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSection;

import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface TrendingSliderProps {
  movies: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    homepage?: string;
  }[];
}

const TrendingSlider: React.FC<TrendingSliderProps> = ({ movies }) => {
  return (
    <Swiper spaceBetween={20} slidesPerView={1} className="w-full">
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="flex flex-col lg:flex-row items-center bg-light-accentBackground dark:bg-dark-accentBackground p-6 rounded-lg shadow-lg">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="w-full lg:w-1/3 rounded-lg"
            />
            <div className="lg:ml-6 mt-4 lg:mt-0">
              <h3 className="text-2xl font-bold">{movie.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {movie.overview}
              </p>
              <div className="mt-4 flex space-x-4">
                <Link
                  to={`/movie/${movie.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Details
                </Link>
                <a
                  href={movie.homepage || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TrendingSlider;

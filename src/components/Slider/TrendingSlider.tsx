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
    <div className="w-full bg-light-background dark:bg-dark-background pb-6">
      {/* Title */}
      <h2 className="text-2xl font-bold py-6">
        Trending
      </h2>

      {/* Slider */}
      <Swiper spaceBetween={20} slidesPerView={1} className="w-full">
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="flex flex-col lg:flex-row items-center justify-center bg-light-accentBackground dark:bg-dark-accentBackground p-12 rounded-lg mx-auto">
              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-full lg:w-1/3 rounded-lg object-cover"
              />
              {/* Content */}
              <div className="lg:ml-8 mt-6 lg:mt-0 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-light-text dark:text-dark-text">
                  {movie.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  {movie.overview}
                </p>
                <div className="mt-6 flex justify-center lg:justify-start space-x-4">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Details
                  </Link>
                  <a
                    href={movie.homepage || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Watch Trailer
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingSlider;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

interface TrendingSliderProps {
  movies: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path?: string;
    homepage?: string;
  }[];
}

const TrendingSlider: React.FC<TrendingSliderProps> = ({ movies }) => {
  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        centeredSlides={true}
        slidesPerView={1}
        className="w-full h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="relative flex items-center justify-evenly min-h-screen px-8 lg:px-16"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${
                movie.backdrop_path || movie.poster_path
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            {/* Left Section: Poster */}
            <div className="relative z-10 hidden lg:block">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                className="w-80 rounded-lg shadow-lg"
              />
            </div>

            {/* Right Section: Title and Description */}
            <div className="relative z-10 text-white max-w-lg space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold">{movie.title}</h1>
              <p className="text-lg lg:text-xl text-gray-300">
                {movie.overview}
              </p>
              <div className="flex space-x-4">
                <Link
                  to={`/movie/${movie.id}`}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Watch Now
                </Link>
                <a
                  href={movie.homepage || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Trailer
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingSlider;

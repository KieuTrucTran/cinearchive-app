import React, { useEffect } from "react";
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

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const TrendingSlider: React.FC<TrendingSliderProps> = ({ movies }) => {
  useEffect(() => {
    movies.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/original${
        movie.backdrop_path || movie.poster_path
      }`;
      preloadImage(imageUrl);
    });
  }, [movies]);

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

            <div className="z-10 flex flex-col lg:flex-row items-center lg:items-center space-y-6 lg:space-y-0 lg:space-x-12">
              {/* Left Section: Poster */}
              <div className="hidden lg:block">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  className="w-80 rounded-lg shadow-lg"
                />
              </div>

              {/* Right Section: Title and Description */}
              <div className="text-white max-w-lg space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold">
                  {movie.title}
                </h1>
                <p className="text-lg lg:text-xl text-gray-300">
                  {movie.overview}
                </p>
                <div className="flex space-x-4">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="px-6 py-3 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded-lg hover:bg-light-accent duration-300 dark:hover:bg-dark-accent"
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingSlider;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { fetchMovieVideos } from "../../api/movieApi";
import Modal from "../Modal/Modal";

interface TrendingSliderProps {
  movies: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path?: string;
  }[];
}

const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const TrendingSlider: React.FC<TrendingSliderProps> = ({ movies }) => {
  const [showModal, setShowModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  useEffect(() => {
    movies.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/original${
        movie.backdrop_path || movie.poster_path
      }`;
      preloadImage(imageUrl);
    });
  }, [movies]);

  const handleTrailerClick = async (movieId: number) => {
    try {
      const response = await fetchMovieVideos(movieId);
      const trailer = response.results.find(
        (video: { type: string }) => video.type === "Trailer"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setShowModal(true);
      } else {
        setTrailerUrl(null);
        alert("No trailer available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

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
                  <button
                    onClick={() => handleTrailerClick(movie.id)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Trailer
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal for Trailer */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} title="Trailer">
          {trailerUrl ? (
            <iframe
              width="560"
              height="315"
              src={trailerUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>No trailer available</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TrendingSlider;

import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";

// Define the type for a movie object
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string; // Added release_date property
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = async () => {
    if (!searchTerm) return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MOVIES_ACCESS_TOKEN}`,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <div className="py-8 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search for movies..."
            className="block p-2.5 focus:outline-none text-sm text-light-text dark:text-dark-text bg-light-accentBackground dark:bg-dark-accentBackground rounded-lg border border-gray-400 focus:border-light-accent dark:focus:border-dark-accent placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 bg-light-accent-80 dark:bg-dark-accent-80 text-light-accentBackground dark:text-dark-accentBackground rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent"
          >
            Search
          </button>
        </div>
      </div>
      {searchResults.length > 0 ? (
        <>
          <div className="text-center pb-2">
            <div className="text-left font-semibold">
              Showing matches for <span className="italic">"{searchTerm}"</span>
            </div>
          </div>
          <div className="w-full border-b-2 border-light-text dark:border-dark-text mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-lg font-semibold mt-8">
          No movies found :(
        </div>
      )}
    </div>
  );
};

export default SearchPage;

import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";

// Define the type for a movie object
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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
    <div className="min-h-screen px-4 lg:px-12 pb-20">
      <div className="mb-12 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search for movies..."
            className="block p-3 pl-10 focus:outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              poster_path={movie.poster_path}
            />
          ))
        ) : (
          <h4>No Movies Found</h4>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

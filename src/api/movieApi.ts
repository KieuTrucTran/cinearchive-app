const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_MOVIE_KEY;

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${API_BASE_URL}/trending/all/day?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch trending movies: ${response.statusText}`);
  }
  return response.json();
};

export const fetchPopularMovies = async () => {
  const response = await fetch(
    `${API_BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch popular movies: ${response.statusText}`);
  }
  return response.json();
};

export const fetchTopRatedMovies = async () => {
  const response = await fetch(
    `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch top-rated movies: ${response.statusText}`);
  }
  return response.json();
};

export const fetchUpcomingMovies = async () => {
  const response = await fetch(
    `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch upcoming movies: ${response.statusText}`);
  }
  return response.json();
};

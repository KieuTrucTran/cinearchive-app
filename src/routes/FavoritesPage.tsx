import { useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.userLists);

  if (favorites.length === 0) {
    return <div>No favorites yet!</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white min-h-screen px-4 lg:px-12 pb-20">
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

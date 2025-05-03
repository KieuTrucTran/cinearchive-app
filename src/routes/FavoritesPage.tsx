import { useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.userLists);

  if (favorites.length === 0) {
    return <div>No favorites yet!</div>;
  }

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <h2 className="text-2xl font-bold py-6">Your Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

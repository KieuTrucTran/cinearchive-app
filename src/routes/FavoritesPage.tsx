import { useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.userLists);

  if (favorites.length === 0) {
    return <div>No favorites yet!</div>;
  }

  return (
    <div>
      <h1>Your Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;

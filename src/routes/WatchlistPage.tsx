import { useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";

const WatchlistPage = () => {
  const { watchlist } = useAppSelector((state) => state.userLists);

  if (watchlist.length === 0) {
    return <div>No movies in your watchlist yet!</div>;
  }

  return (
    <div>
      <h1>Your Watchlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;

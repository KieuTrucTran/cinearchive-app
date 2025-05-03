import { useAppSelector } from "../hooks/storeHook";
import MovieCard from "../components/MovieCard/MovieCard";

const WatchlistPage = () => {
  const { watchlist } = useAppSelector((state) => state.userLists);

  if (watchlist.length === 0) {
    return <div>No movies in your watchlist yet!</div>;
  }

  return (
    <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen px-4 lg:px-12 pb-20">
      <h2 className="text-2xl font-bold py-6">Your Watchlist</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;

import { useEffect } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/storeHook";
import { getMovies } from "./features/movies/movieSlice";

function App() {
  const { darkTheme } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className={darkTheme ? "dark" : ""}>
      {/*dark mode styling*/}
      <div className="dark:bg-blue-900 dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        <Header />
      </div>
    </div>
  );
}

export default App;

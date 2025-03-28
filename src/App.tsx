import "./App.css";
import Header from "./components/Header/Header";
import { useAppSelector } from "./hooks/storeHook";

function App() {
  const { darkTheme } = useAppSelector((state) => state);

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

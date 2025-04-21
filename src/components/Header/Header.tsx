import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { toggleTheme } from "../../features/theme/themeSlice";
import { Link, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";

const Header = () => {
  const darkTheme = useAppSelector((state) => state.darkTheme);

  const dispatch = useAppDispatch();

  const onToggle = () => dispatch(toggleTheme());

  return (
    <header className="bg-light-accentBackground dark:bg-dark-accentBackground text-light-accent dark:text-dark-accent">
      <nav className="border-b border-light-accent dark:border-dark-accent py-2.5">
        <div className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl px-4 flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-semibold whitespace-nowrap">
                ◱ CineArchive
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex justify-center flex-grow items-center space-x-10 text-sm font-medium">
            <Link to="/" className="hover:opacity-50">
              Home
            </Link>
            <Link to="/movies" className="hover:opacity-50 font-semibold">
              Movies
            </Link>
            <Link to="/favorites" className="hover:opacity-50">
              Favorites
            </Link>
            <Link to="/watchlist" className="hover:opacity-50">
              Watchlist
            </Link>
            <Link to="/search" className="hover:opacity-50">
              Search
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex-shrink-0">
            {darkTheme ? (
              <SunIcon
                onClick={onToggle}
                className="h-5 w-5 cursor-pointer hover:opacity-50"
              />
            ) : (
              <MoonIcon
                onClick={onToggle}
                className="h-5 w-5 cursor-pointer hover:opacity-50"
              />
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </header>
  );
};

export default Header;

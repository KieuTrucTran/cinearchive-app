import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { toggleTheme } from "../../features/theme/themeSlice";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";

const Header = () => {
  const darkTheme = useAppSelector((state) => state.darkTheme);
  const dispatch = useAppDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onToggle = () => dispatch(toggleTheme());

  return (
    <header className="relative bg-light-accentBackground dark:bg-dark-accentBackground text-light-accent dark:text-dark-accent z-50">
      <nav className="border-b border-light-accent dark:border-dark-accent py-2.5">
        <div className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-semibold whitespace-nowrap">
                ◱ CineArchive
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
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

          {/* Theme Toggle (Desktop only) + Hamburger (Mobile) */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
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

            {/* Hamburger Icon (Mobile only) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-light-accent dark:text-dark-accent"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Slide-In) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 z-50 w-64 h-full bg-light-accentBackground dark:bg-dark-accentBackground shadow-lg transform transition-transform duration-300 translate-x-0 flex flex-col justify-start">
            {/* Top Row: Toggle + Close */}
            <div className="flex justify-between items-center p-4">
              {/* Theme Toggle (Mobile only) */}
              <div className="block md:hidden">
                {darkTheme ? (
                  <SunIcon
                    onClick={onToggle}
                    className="h-5 w-5 cursor-pointer hover:opacity-50 text-light-accent dark:text-dark-accent"
                  />
                ) : (
                  <MoonIcon
                    onClick={onToggle}
                    className="h-5 w-5 cursor-pointer hover:opacity-50 text-light-accent dark:text-dark-accent"
                  />
                )}
              </div>

              {/* Close button */}
              <button onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-light-accent dark:text-dark-accent" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-end px-6 space-y-4 text-sm font-medium">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-50"
              >
                Home
              </Link>
              <Link
                to="/movies"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-50 font-semibold"
              >
                Movies
              </Link>
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-50"
              >
                Favorites
              </Link>
              <Link
                to="/watchlist"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-50"
              >
                Watchlist
              </Link>
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-50"
              >
                Search
              </Link>
            </div>
          </div>
        </>
      )}

      <Outlet />
    </header>
  );
};

export default Header;

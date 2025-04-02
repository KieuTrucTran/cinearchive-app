import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { toggleTheme } from "../../features/theme/themeSlice";
import { Link, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";

const Header = () => {
  const { darkTheme } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const onToggle = () => dispatch(toggleTheme());

  return (
    <header className="mb-20">
      <nav className="border-b border-gray-200 border-opacity-25 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Movies
            </span>
          </Link>
          <Link to="/search" className="text-black-500 hover:underline">
            Search
          </Link>
          <div className="flex items-center lg:order-2">
            {darkTheme ? (
              <SunIcon
                onClick={onToggle}
                className="h-6 w-6 hover:opacity-50 cursor-pointer"
              />
            ) : (
              <MoonIcon
                onClick={onToggle}
                className="h-6 w-6 hover:opacity-50 cursor-pointer"
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

import React, { useState } from 'react';
import { BellIcon } from '../icons/BellIcon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { MenuIcon } from '../icons/MenuIcon';

interface HeaderProps {
  user: { name: string; email: string };
  onLogout: () => void;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-20 px-4 md:px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-500 dark:text-gray-400 focus:outline-none"
            aria-label="Open sidebar"
        >
            <MenuIcon className="h-6 w-6" />
        </button>

      <div className="relative hidden md:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-emerald-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <BellIcon className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <span className="hidden md:inline text-sm font-medium">{user.name}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div 
              className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogoutIcon className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
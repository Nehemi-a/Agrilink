import React from 'react';
import type { User } from '../types';
import { LogoutIcon } from './icons/LogoutIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onSellProduceClick: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, onSellProduceClick, onLoginClick, onRegisterClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <h1 className="text-2xl font-bold text-slate-800">
              <span className="text-emerald-600">Agri</span>Link
            </h1>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
               <button
                onClick={onSellProduceClick}
                className="flex items-center space-x-2 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 px-4 py-2 transition-all"
                aria-label="Sell Produce"
              >
                <PlusCircleIcon className="h-5 w-5" />
                <span className="hidden sm:block">Sell Produce</span>
              </button>
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-sm text-slate-600">|</span>
                <span className="text-sm text-slate-600">Welcome, {user.fullName.split(' ')[0]}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
                  aria-label="Logout"
                >
                  <LogoutIcon className="h-5 w-5" />
                  <span className="hidden md:block">Logout</span>
                </button>
              </div>
            </div>
          ) : (
             <div className="flex items-center space-x-2">
              <button
                onClick={onLoginClick}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 rounded-lg px-4 py-2 transition-all"
                aria-label="Login"
              >
                Login
              </button>
              <button
                onClick={onRegisterClick}
                className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                aria-label="Register"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
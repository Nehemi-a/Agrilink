import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon } from '../icons/DashboardIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { TransactionsIcon } from '../icons/TransactionsIcon';
import { ContentIcon } from '../icons/ContentIcon';
import { XIcon } from '../icons/XIcon';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
    { name: 'Users', href: '/users', icon: UsersIcon },
    { name: 'Transactions', href: '/transactions', icon: TransactionsIcon },
    { name: 'Content', href: '/content', icon: ContentIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const NavLinks = () => (
        <nav className="mt-8">
            {navigation.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                        `flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
                            isActive
                                ? 'bg-emerald-600 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`
                    }
                >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                </NavLink>
            ))}
        </nav>
    );

    return (
        <>
            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsOpen(false)}
            ></div>
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform lg:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        <span className="text-emerald-600">Agri</span>Link
                    </h1>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-4">
                    <NavLinks />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
                 <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        <span className="text-emerald-600">Agri</span>Link
                    </h1>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <NavLinks />
                </div>
            </div>
        </>
    );
};
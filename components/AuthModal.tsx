import React, { useState } from 'react';
import { XIcon } from './icons/XIcon';

interface AuthModalProps {
    mode: 'login' | 'register';
    onClose: () => void;
    onLogin: (credentials: { email: string; password: string }) => void;
    onRegister: (details: { fullName: string; email: string; password: string }) => void;
    onSwitchMode: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onLogin, onRegister, onSwitchMode }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = mode === 'login';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            onLogin({ email, password });
        } else {
            onRegister({ fullName, email, password });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all animate-fade-in-up">
                <div className="flex items-center justify-between p-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800">{isLogin ? 'Login to AgriLink' : 'Create Account'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Jomo Kenyatta"
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="••••••••"
                            />
                        </div>
                        {isLogin && (
                            <div className="flex items-center justify-end">
                                <a href="#" className="text-sm text-emerald-600 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-transform transform hover:scale-105"
                            >
                                {isLogin ? 'Login' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button onClick={onSwitchMode} className="font-medium text-emerald-600 hover:underline">
                                {isLogin ? 'Register' : 'Login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
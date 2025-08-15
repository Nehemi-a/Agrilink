import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLoginPage } from './AdminLoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/UserManagement';
import { TransactionMonitoring } from './pages/TransactionMonitoring';
import { ContentManagement } from './pages/ContentManagement';
import { NotFound } from './pages/NotFound';

export const AdminApp: React.FC = () => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Mock admin user
    const adminUser = {
        name: 'Admin User',
        email: 'admin@agrilink.com',
    };

    const handleLogin = () => {
        setIsAdminAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAdminAuthenticated(false);
    };

    if (!isAdminAuthenticated) {
        return <AdminLoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    user={adminUser} 
                    onLogout={handleLogout} 
                    onMenuClick={() => setSidebarOpen(true)} 
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/transactions" element={<TransactionMonitoring />} />
                        <Route path="/content" element={<ContentManagement />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

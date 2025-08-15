import React from 'react';

export const ContentManagement: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Content Management</h1>
             <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Coming Soon</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    This section will allow administrators to create and manage platform announcements, send bulk notifications to users, and manage other site content.
                </p>
            </div>
        </div>
    );
};

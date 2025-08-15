import React from 'react';

export const TransactionMonitoring: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Transaction Monitoring</h1>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Coming Soon</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    This section will display a filterable and searchable list of all platform transactions.
                    Administrators will be able to view transaction details, track payment statuses, and investigate disputes.
                </p>
            </div>
        </div>
    );
};

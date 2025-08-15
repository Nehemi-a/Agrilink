import React from 'react';
import { MetricCard } from '../components/MetricCard';
import { LineChart } from '../components/charts/LineChart';
import { DoughnutChart } from '../components/charts/DoughnutChart';
import { mockMetrics, userGrowthData, productDistributionData } from '../data/mockData';

export const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
            
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockMetrics.map((metric, index) => (
                    <MetricCard key={index} metric={metric} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <LineChart data={userGrowthData} title="User Growth Over Time" />
                </div>
                <div className="lg:col-span-2">
                    <DoughnutChart data={productDistributionData} title="Listings by Product" />
                </div>
            </div>

            {/* Placeholder for Recent Activity */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Recent user registrations and transactions will be displayed here.</p>
            </div>
        </div>
    );
};

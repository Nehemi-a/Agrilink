import React from 'react';
import type { Metric } from '../types';
import { ArrowUpIcon, ArrowDownIcon } from '../icons/ArrowIcons';


export const MetricCard: React.FC<{ metric: Metric }> = ({ metric }) => {
    const isIncrease = metric.changeType === 'increase';
    const changeColor = metric.change > 0 ? 'text-emerald-500' : 'text-red-500';

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{metric.title}</h3>
            <div className="mt-1 flex items-baseline justify-between">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                <div className={`flex items-center text-sm font-semibold ${changeColor}`}>
                    {metric.change > 0 ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    <span>{Math.abs(metric.change)}%</span>
                </div>
            </div>
        </div>
    );
};
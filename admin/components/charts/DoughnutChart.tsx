import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
    data: any;
    title: string;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, title }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: title,
                 font: {
                    size: 16,
                },
                color: '#334155'
            },
        },
    };
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md h-96 border border-gray-200 dark:border-gray-700">
            <Doughnut data={data} options={options} />
        </div>
    );
};

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
    data: any;
    title: string;
}

export const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                },
                color: '#334155' // Corresponds to dark:text-gray-200
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: '#e5e7eb', // Corresponds to dark:border-gray-700
                },
            },
        },
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md h-96 border border-gray-200 dark:border-gray-700">
            <Line options={options} data={data} />
        </div>
    );
};

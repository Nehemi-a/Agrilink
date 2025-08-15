
import React from 'react';

interface AnalysisCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  valueClassName?: string;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ icon, title, value, description, valueClassName = 'text-slate-900' }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <div className="bg-emerald-100 p-3 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-600">{title}</h4>
        </div>
      </div>
      <div className="flex-grow">
        <p className={`text-2xl font-bold mb-2 ${valueClassName}`}>{value}</p>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
    </div>
  );
};
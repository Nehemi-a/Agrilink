import React, { useState } from 'react';
import type { ProduceData } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface ProduceFormProps {
  onSubmit: (data: ProduceData) => void;
  isLoading: boolean;
}

export const ProduceForm: React.FC<ProduceFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProduceData>({
    cropType: 'Maize',
    quantity: '100 kg',
    quality: 'Grade 1',
    location: 'Nakuru County, Kenya',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cropType" className="block text-sm font-medium text-slate-700 mb-1">Crop Type</label>
          <input
            type="text"
            id="cropType"
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., Maize, Beans, Tea"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., 500 kg, 10 tons"
          />
        </div>
        <div>
          <label htmlFor="quality" className="block text-sm font-medium text-slate-700 mb-1">Quality</label>
          <input
            type="text"
            id="quality"
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., Grade 1, Organic"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">Farm Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., Nakuru County, Kenya"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Get Market Insights'}
          {!isLoading && <SparklesIcon className="ml-2 -mr-1 h-5 w-5" />}
        </button>
      </div>
    </form>
  );
};
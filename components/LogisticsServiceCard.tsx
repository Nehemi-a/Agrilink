import React from 'react';
import type { User } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { PhoneIcon } from './icons/PhoneIcon';

interface LogisticsService {
  id: string;
  providerName: string;
  serviceType: 'transportation' | 'storage' | 'both';
  description: string;
  location: string;
  contactDetails: {
    fullName: string;
    phone: string;
    email?: string;
    whatsapp?: string;
  };
  rates?: string;
  capacity?: string;
}

interface LogisticsServiceCardProps {
  service: LogisticsService;
}

export const LogisticsServiceCard: React.FC<LogisticsServiceCardProps> = ({ service }) => {
  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'transportation': return '🚚';
      case 'storage': return '🏭';
      case 'both': return '🚚🏭';
      default: return '📦';
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'transportation': return 'Transportation';
      case 'storage': return 'Storage';
      case 'both': return 'Transportation & Storage';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 flex flex-col group transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{getServiceTypeIcon(service.serviceType)}</div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{service.providerName}</h3>
              <p className="text-sm text-emerald-600 font-medium">{getServiceTypeLabel(service.serviceType)}</p>
            </div>
          </div>
        </div>
        
        <p className="text-slate-600 mb-4">{service.description}</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-slate-600">
            <LocationMarkerIcon className="h-4 w-4 mr-2 text-slate-400" />
            <span>{service.location}</span>
          </div>
          
          {service.capacity && (
            <div className="flex items-center text-sm text-slate-600">
              <span className="mr-2">📦</span>
              <span>Capacity: {service.capacity}</span>
            </div>
          )}
          
          {service.rates && (
            <div className="flex items-center text-sm text-slate-600">
              <span className="mr-2">💰</span>
              <span>Rates: {service.rates}</span>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-600">
                  {service.contactDetails.fullName.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-slate-600">{service.contactDetails.fullName}</span>
            </div>
            <button className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-200 transition-colors">
              Contact Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { ProduceListing } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';

interface ListingCardProps {
  listing: ProduceListing;
}

// Simple hash function to get a color for the seller's name
const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  // Placeholder image based on crop type
  const getImageUrl = (crop: string) => {
    const query = encodeURIComponent(crop.split(' ')[0] + ' farm fresh');
    return `https://source.unsplash.com/400x300/?${query}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 flex flex-col group transform hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <img 
          src={getImageUrl(listing.cropType)} 
          alt={listing.cropType} 
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" 
        />
        <div 
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          {listing.quality}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 truncate">{listing.cropType}</h3>
        <p className="text-sm text-slate-500 mb-2">{listing.quantity}</p>
        
        <div className="flex items-center text-sm text-slate-600 mb-4">
          <LocationMarkerIcon className="h-4 w-4 mr-1 text-slate-400" />
          <span>{listing.location}</span>
        </div>

        <div className="mt-auto">
           <div className="flex items-center space-x-2 mb-4">
              <div 
                className="h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: `#${getAvatarColor(listing.sellerName)}` }}
              >
                {listing.sellerName.charAt(0)}
              </div>
              <span className="text-xs text-slate-500 font-medium">{listing.sellerName}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-black text-emerald-600">{listing.pricePerUnit}</p>
            <button className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-200 transition-colors">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
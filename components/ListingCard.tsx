import React, { useState } from 'react';
import type { ProduceListing } from '../types';
import { LocationMarkerIcon } from './icons/LocationMarkerIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { PhoneIcon } from './icons/PhoneIcon';

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
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Get the first image or fallback to placeholder
  const getImageUrl = () => {
    if (listing.images && listing.images.length > 0) {
      // For now, we'll use the filename as a placeholder
      // In a real app, this would be the actual uploaded image URL
      return `https://source.unsplash.com/400x300/?${encodeURIComponent(listing.cropType.split(' ')[0] + ' farm fresh')}`;
    }
    const query = encodeURIComponent(listing.cropType.split(' ')[0] + ' farm fresh');
    return `https://source.unsplash.com/400x300/?${query}`;
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 flex flex-col group transform hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        <img 
          src={getImageUrl()} 
          alt={listing.cropType} 
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" 
        />
        <div 
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full"
        >
          {listing.quality}
        </div>
        {listing.images && listing.images.length > 0 && (
          <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            📸 {listing.images.length} photo{listing.images.length > 1 ? 's' : ''}
          </div>
        )}
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
                style={{ backgroundColor: `#${getAvatarColor(listing.contactDetails?.fullName || listing.sellerName)}` }}
              >
                {(listing.contactDetails?.fullName || listing.sellerName).charAt(0)}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {listing.contactDetails?.fullName || listing.sellerName}
              </span>
          </div>
          
          {/* Contact Information */}
          {showContactInfo && listing.contactDetails && (
            <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Contact Information</h4>
              <div className="space-y-1 text-xs text-slate-600">
                {listing.contactDetails.phone && (
                  <div className="flex items-center">
                    <span className="mr-2">📞</span>
                    <span>{listing.contactDetails.phone}</span>
                  </div>
                )}
                {listing.contactDetails.email && (
                  <div className="flex items-center">
                    <span className="mr-2">✉️</span>
                    <span>{listing.contactDetails.email}</span>
                  </div>
                )}
                {listing.contactDetails.whatsapp && (
                  <div className="flex items-center">
                    <span className="mr-2">💬</span>
                    <span>{listing.contactDetails.whatsapp}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-black text-emerald-600">{listing.pricePerUnit}</p>
            <button 
              onClick={toggleContactInfo}
              className="px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg hover:bg-emerald-200 transition-colors"
            >
              {showContactInfo ? 'Hide Contact' : 'Contact Seller'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
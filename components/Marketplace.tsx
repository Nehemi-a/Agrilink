import React from 'react';
import type { ProduceListing } from '../types';
import ListingCard from './ListingCard';

interface MarketplaceProps {
  listings: ProduceListing[];
}

export const Marketplace: React.FC<MarketplaceProps> = ({ listings }) => {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6">Today's Market</h1>
      {listings.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-700">The marketplace is currently empty.</h2>
          <p className="text-slate-500 mt-2">Be the first to list your produce by clicking the "Sell Produce" button!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};
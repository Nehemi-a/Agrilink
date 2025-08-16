import React, { useState } from 'react';
import type { ProduceData, MarketAnalysis, ProduceListing } from '../types';
import { AnalysisDisplay } from './AnalysisDisplay';
import { LoadingSpinner } from './LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';
import { XIcon } from './icons/XIcon';
import { ImageUpload } from './ImageUpload';
import { ContactDetailsForm } from './ContactDetailsForm';

interface AddListingModalProps {
  onClose: () => void;
  onAddListing: (data: Omit<ProduceListing, 'id' | 'sellerName'>) => void;
  getMarketAnalysis: (data: ProduceData) => Promise<MarketAnalysis>;
}

export const AddListingModal: React.FC<AddListingModalProps> = ({ onClose, onAddListing, getMarketAnalysis }) => {
  const [formData, setFormData] = useState<ProduceData>({
    cropType: 'Maize',
    quantity: '100 kg',
    quality: 'Grade 1',
    location: 'Nakuru County, Kenya',
    images: [],
    contactDetails: {
      fullName: '',
      phone: '',
      email: '',
      whatsapp: '',
    },
  });
  const [price, setPrice] = useState('');
  
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleContactDetailsChange = (contactDetails: ProduceData['contactDetails']) => {
    setFormData(prev => ({ ...prev, contactDetails }));
  };

  const handleGetAnalysis = async () => {
    // Validate required fields before analysis
    if (!formData.contactDetails.fullName || !formData.contactDetails.phone) {
      alert('Please fill in your full name and phone number before getting market analysis.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await getMarketAnalysis(formData);
      setAnalysis(result);
      if (result.suggestedPricePerUnit) {
          setPrice(result.suggestedPricePerUnit);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!price) {
        alert("Please enter a price for your listing.");
        return;
    }
    
    if (!formData.contactDetails.fullName || !formData.contactDetails.phone) {
        alert("Please fill in your full name and phone number.");
        return;
    }
    
    onAddListing({ 
      ...formData, 
      pricePerUnit: price,
      images: formData.images?.map(file => file.name) || [], // Convert File objects to filenames for now
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col transform transition-all animate-fade-in-up">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Create a New Listing</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Produce Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                Produce Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries({cropType: 'Crop Type', quantity: 'Quantity', quality: 'Quality', location: 'Farm Location'}).map(([key, label]) => (
                  <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={formData[key as keyof ProduceData]}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload Section */}
            <ImageUpload
              images={formData.images || []}
              onImagesChange={handleImagesChange}
              maxImages={5}
            />

            {/* Contact Details Section */}
            <ContactDetailsForm
              contactDetails={formData.contactDetails}
              onContactDetailsChange={handleContactDetailsChange}
            />

            {/* Price Section */}
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-2">Set Your Price</h3>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:flex-grow">
                   <label htmlFor="price" className="sr-only">Price per Unit</label>
                   <input
                        id="price"
                        name="price"
                        type="text"
                        required
                        value={price}
                        onChange={handlePriceChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="e.g., KES 2500 per 90kg bag"
                    />
                </div>
                <button
                  type="button"
                  onClick={handleGetAnalysis}
                  disabled={isLoading}
                  className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-lg text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                >
                  <SparklesIcon className="mr-2 h-5 w-5"/>
                  {isLoading ? 'Analyzing...' : 'Get AI Suggestion'}
                </button>
              </div>
            </div>
            
            {error && <p className="text-red-600 text-sm">{error}</p>}
            
            {analysis && (
                <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-xl font-bold text-emerald-800 mb-2">AI Market Analysis</h3>
                    <AnalysisDisplay analysis={analysis} />
                </div>
            )}
            
            <div className="pt-6 border-t border-slate-200 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-lg hover:bg-slate-200">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    Post Listing
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
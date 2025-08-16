import React from 'react';

interface ContactDetails {
  fullName: string;
  phone: string;
  email?: string;
  whatsapp?: string;
}

interface ContactDetailsFormProps {
  contactDetails: ContactDetails;
  onContactDetailsChange: (contactDetails: ContactDetails) => void;
}

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  contactDetails,
  onContactDetailsChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onContactDetailsChange({
      ...contactDetails,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
        Contact Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={contactDetails.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., John Kamau"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactDetails.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., +254 700 123 456"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactDetails.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., john.kamau@email.com"
          />
        </div>
        
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700 mb-1">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            value={contactDetails.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
            placeholder="e.g., +254 700 123 456"
          />
        </div>
      </div>
      
      <p className="text-xs text-slate-500">
        * Required fields. Your contact information will be shared with potential buyers.
      </p>
    </div>
  );
};

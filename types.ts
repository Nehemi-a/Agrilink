
export type UserRole = 'seller' | 'buyer' | 'logistics';

export interface ProduceData {
  cropType: string;
  quantity: string;
  quality: string;
  location: string;
  images?: File[];
  contactDetails: {
    fullName: string;
    phone: string;
    email?: string;
    whatsapp?: string;
  };
}

export interface MarketAnalysis {
  suggestedPricePerUnit: string;
  priceJustification: string;
  marketDemand: 'High' | 'Medium' | 'Low' | 'Stable';
  demandJustification: string;
  bestSellingTime: string;
  sellingTimeJustification: string;
  potentialBuyers: string[];
  buyersJustification: string;
  overallSummary: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone?: string;
  location?: string;
}

export interface ProduceListing {
  id: string;
  sellerName: string;
  cropType: string;
  quantity: string;
  quality: string;
  location: string;
  pricePerUnit: string;
  images?: string[]; // URLs to uploaded images
  contactDetails: {
    fullName: string;
    phone: string;
    email?: string;
    whatsapp?: string;
  };
}

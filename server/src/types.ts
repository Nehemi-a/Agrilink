export type UserRole = 'seller' | 'buyer' | 'logistics';

// This type is used internally on the server and includes the password
export interface UserWithPassword {
  id: string;
  fullName: string;
  email: string;
  password?: string; // Hashed password
  role: UserRole;
  phone?: string;
  location?: string;
}

// This is the user type sent to the client, without the password
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
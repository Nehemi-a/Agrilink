// This type is used internally on the server and includes the password
export interface UserWithPassword {
  id: string;
  fullName: string;
  email: string;
  password?: string; // Hashed password
}

// This is the user type sent to the client, without the password
export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface ProduceListing {
  id: string;
  sellerName: string;
  cropType: string;
  quantity: string;
  quality: string;
  location: string;
  pricePerUnit: string;
}

export interface ProduceData {
  cropType: string;
  quantity: string;
  quality: string;
  location: string;
}
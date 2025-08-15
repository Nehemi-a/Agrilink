export type UserRole = 'Farmer' | 'Buyer' | 'Cooperative' | 'Transporter';
export type VerificationStatus = 'Verified' | 'Pending' | 'Rejected';
export type TransactionStatus = 'Completed' | 'Pending' | 'Disputed' | 'Cancelled';

export interface AdminUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    nationalId: string;
    role: UserRole;
    verificationStatus: VerificationStatus;
    createdAt: string; // ISO date string
}

export interface Transaction {
    id: string;
    buyerName: string;
    sellerName: string;
    product: string;
    quantity: number;
    totalPrice: number;
    status: TransactionStatus;
    date: string; // ISO date string
}

export interface Metric {
    title: string;
    value: string;
    change: number; // Percentage change
    changeType: 'increase' | 'decrease';
}

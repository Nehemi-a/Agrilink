import type { AdminUser, Transaction, Metric, UserRole, VerificationStatus, TransactionStatus } from '../types';

// MOCK USER DATA
const userRoles: UserRole[] = ['Farmer', 'Buyer', 'Cooperative', 'Transporter'];
const verificationStatuses: VerificationStatus[] = ['Verified', 'Pending', 'Rejected'];

const generateRandomDate = (start: Date, end: Date): string => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

export const mockUsers: AdminUser[] = Array.from({ length: 120 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `User Name ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `+254700000${(i + 100).toString().slice(-3)}`,
  nationalId: `123456${(i + 100).toString().slice(-3)}`,
  role: userRoles[i % userRoles.length],
  verificationStatus: verificationStatuses[i % verificationStatuses.length],
  createdAt: generateRandomDate(new Date(2022, 0, 1), new Date()),
}));


// MOCK TRANSACTION DATA
const transactionStatuses: TransactionStatus[] = ['Completed', 'Pending', 'Disputed', 'Cancelled'];
const products = ['Maize', 'Coffee Beans', 'Avocado', 'Tea Leaves', 'Cut Flowers'];

export const mockTransactions: Transaction[] = Array.from({ length: 250 }, (_, i) => ({
  id: `txn-${i + 1001}`,
  buyerName: `Buyer ${i % 20 + 1}`,
  sellerName: `Farmer ${i % 50 + 1}`,
  product: products[i % products.length],
  quantity: Math.floor(Math.random() * 100) + 1,
  totalPrice: Math.floor(Math.random() * 50000) + 500,
  status: transactionStatuses[i % transactionStatuses.length],
  date: generateRandomDate(new Date(2023, 0, 1), new Date()),
}));


// MOCK ANALYTICS DATA
export const mockMetrics: Metric[] = [
    { title: 'Total Users', value: '1,245', change: 5.4, changeType: 'increase' },
    { title: 'Trading Volume (KES)', value: '12.6M', change: 12.1, changeType: 'increase' },
    { title: 'Pending Verifications', value: '18', change: 2.5, changeType: 'decrease' },
    { title: 'Open Disputes', value: '4', change: 0, changeType: 'increase' },
];

export const userGrowthData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'New Users',
      data: [65, 59, 80, 81, 56, 55, 90],
      fill: true,
      borderColor: '#059669', // emerald-600
      backgroundColor: 'rgba(16, 185, 129, 0.2)', // emerald-500 with opacity
      tension: 0.4,
    },
  ],
};

export const productDistributionData = {
    labels: ['Maize', 'Coffee', 'Avocado', 'Tea', 'Flowers'],
    datasets: [
        {
            label: 'Listings by Product',
            data: [300, 150, 180, 90, 210],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)', // emerald-500
                'rgba(220, 38, 38, 0.8)',   // red-600
                'rgba(30, 41, 59, 0.8)',    // slate-800
                'rgba(110, 231, 183, 0.8)',// emerald-300
                'rgba(252, 165, 165, 0.8)',// red-300
            ],
            borderColor: [
                '#059669', // emerald-600
                '#b91c1c', // red-700
                '#0f172a', // slate-900
                '#34d399', // emerald-400
                '#f87171', // red-400
            ],
            borderWidth: 1,
        },
    ],
};
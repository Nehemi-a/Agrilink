import type { UserWithPassword, ProduceListing } from './types';

// In a real application, this would be a connection to a database like PostgreSQL.
// For this simulation, we'll use in-memory arrays.

const users: UserWithPassword[] = [];
const listings: ProduceListing[] = [
    {
        id: '1',
        sellerName: 'Jelani Farm',
        cropType: 'Ruiru 11 Coffee',
        quantity: '500 kg',
        quality: 'Grade AA',
        location: 'Kiambu County',
        pricePerUnit: 'KES 750 per kg',
    },
    {
        id: '2',
        sellerName: 'Amani Growers',
        cropType: 'Hass Avocado',
        quantity: '2 tons',
        quality: 'Export Grade',
        location: 'Muranga County',
        pricePerUnit: 'KES 80 per kg',
    },
    {
        id: '3',
        sellerName: 'Pwani Produce',
        cropType: 'Cashew Nuts',
        quantity: '1.5 tons',
        quality: 'Jumbo',
        location: 'Kilifi County',
        pricePerUnit: 'KES 120 per kg',
    },
];

export const db = {
  users: {
    findByEmail: (email: string) => Promise.resolve(users.find(u => u.email === email)),
    create: (data: Omit<UserWithPassword, 'id'>) => {
      const newUser: UserWithPassword = { id: Date.now().toString(), ...data };
      users.push(newUser);
      return Promise.resolve(newUser);
    },
  },
  listings: {
    getAll: () => Promise.resolve([...listings].reverse()), // Show newest first
    create: (data: Omit<ProduceListing, 'id'>) => {
      const newListing: ProduceListing = { id: Date.now().toString(), ...data };
      listings.push(newListing);
      return Promise.resolve(newListing);
    },
  },
};
import React, { useState, useCallback, useEffect } from 'react';
import type { User, ProduceListing, UserRole } from './types';
import { getMarketAnalysis } from './services/geminiService';
import { Header } from './components/Header';
import { Marketplace } from './components/Marketplace';
import { AddListingModal } from './components/AddListingModal';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';

// Dynamically set the API host to match the hostname used to access the app.
// This works for both `localhost` and when accessing via a local network IP on a mobile device.
const API_BASE_URL = '';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<ProduceListing[]>([]);
  const [isAddingListing, setIsAddingListing] = useState<boolean>(false);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`/api/listings`);
        if (response.ok) {
          const data: ProduceListing[] = await response.json();
          setListings(data);
        } else {
          console.error('Failed to fetch listings');
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);


  const handleAddListing = useCallback(async (newListingData: Omit<ProduceListing, 'id' | 'sellerName'>) => {
    if (user) {
      try {
        const response = await fetch(`/api/listings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newListingData,
            sellerName: user.fullName,
          }),
        });
        if (response.ok) {
          const newListing: ProduceListing = await response.json();
          setListings(prev => [newListing, ...prev]);
          setIsAddingListing(false);
        } else {
          alert('Failed to add listing.');
        }
      } catch (error) {
        console.error('Error adding listing:', error);
        alert('An error occurred while adding the listing.');
      }
    }
  }, [user]);

  const handleLogin = useCallback(async (credentials: { email: string, password: string }) => {
    try {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        if (response.ok) {
            const loggedInUser: User = await response.json();
            setUser(loggedInUser);
            setAuthModal(null);
        } else {
            const error = await response.json();
            alert(`Login failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login.');
    }
  }, []);

  const handleRegister = useCallback(async (details: {
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    location?: string;
  }) => {
    try {
        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(details),
        });
        if (response.ok) {
            const newUser: User = await response.json();
            setUser(newUser);
            setAuthModal(null);
        } else {
            const error = await response.json();
            alert(`Registration failed: ${error.message}`);
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration.');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const handleUpdateProfile = useCallback(async (updatedUser: Partial<User>) => {
    if (user) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
        if (response.ok) {
          const updatedUserData: User = await response.json();
          setUser(updatedUserData);
        } else {
          alert('Failed to update profile.');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <Header
        user={user}
        onLogout={handleLogout}
        onSellProduceClick={() => setIsAddingListing(true)}
        onLoginClick={() => setAuthModal('login')}
        onRegisterClick={() => setAuthModal('register')}
        onProfileClick={() => setIsProfileOpen(true)}
      />
      <main className="container mx-auto p-4 md:p-8 max-w-7xl">
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-lg text-slate-600">Loading Market Listings...</p>
          </div>
        ) : (
          <Marketplace listings={listings} />
        )}
      </main>
       {isAddingListing && user && (
        <AddListingModal
          onClose={() => setIsAddingListing(false)}
          onAddListing={handleAddListing}
          getMarketAnalysis={getMarketAnalysis}
        />
      )}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onSwitchMode={() => setAuthModal(authModal === 'login' ? 'register' : 'login')}
        />
      )}
      {isProfileOpen && user && (
        <UserProfile
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onUpdateProfile={handleUpdateProfile}
        />
      )}
      <footer className="text-center p-4 mt-8 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} AgriLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
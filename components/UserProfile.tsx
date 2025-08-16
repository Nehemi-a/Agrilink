import React, { useState, useRef } from 'react';
import type { User, UserRole } from '../types';
import { PencilIcon } from './icons/PencilIcon';
import { XIcon } from './icons/XIcon';

interface UserProfileProps {
  user: User;
  onClose: () => void;
  onUpdateProfile: (updatedUser: FormData) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onClose, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    phone: user.phone || '',
    location: user.location || '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar ? `http://localhost:3001/${user.avatar}` : null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', user.id);
    data.append('fullName', formData.fullName);
    data.append('phone', formData.phone);
    data.append('location', formData.location);
    if (avatarFile) {
      data.append('avatar', avatarFile);
    }
    onUpdateProfile(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      phone: user.phone || '',
      location: user.location || '',
    });
    setAvatarFile(null);
    setAvatarPreview(user.avatar ? `http://localhost:3001/${user.avatar}` : null);
    setIsEditing(false);
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case 'seller':
        return 'You can list and sell your agricultural produce to buyers.';
      case 'buyer':
        return 'You can browse and purchase agricultural produce from sellers.';
      case 'logistics':
        return 'You can offer transportation and storage services to the community.';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all animate-fade-in-up">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">User Profile</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!isEditing ? (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="text-center">
                <img
                  src={avatarPreview || 'https://via.placeholder.com/80'}
                  alt="Profile"
                  className="w-20 h-20 bg-emerald-100 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-slate-800">{user.fullName}</h3>
                <p className="text-emerald-600 font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
                <p className="text-sm text-slate-600 mt-2">{getRoleDescription(user.role)}</p>
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <span className="text-sm text-slate-600">{user.email}</span>
                </div>

                {user.phone && (
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Phone</span>
                    <span className="text-sm text-slate-600">{user.phone}</span>
                  </div>
                )}

                {user.location && (
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Location</span>
                    <span className="text-sm text-slate-600">{user.location}</span>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="text-center">
                <img
                  src={avatarPreview || 'https://via.placeholder.com/80'}
                  alt="Profile"
                  className="w-20 h-20 bg-emerald-100 rounded-full object-cover mx-auto mb-4"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm text-emerald-600 hover:underline"
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+254 700 123 456"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Nakuru County, Kenya"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import type { UserRole } from '../types';

interface RoleSelectionProps {
  selectedRole: UserRole | null;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ selectedRole, onRoleChange }) => {
  const roles: { value: UserRole; label: string; description: string; icon: string }[] = [
    {
      value: 'seller',
      label: 'Seller',
      description: 'I want to sell my agricultural produce',
      icon: '🌾'
    },
    {
      value: 'buyer',
      label: 'Buyer',
      description: 'I want to buy agricultural produce',
      icon: '🛒'
    },
    {
      value: 'logistics',
      label: 'Logistics Provider',
      description: 'I provide transportation and storage services',
      icon: '🚚'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">
          What brings you to AgriLink? *
        </label>
        <div className="grid grid-cols-1 gap-3">
          {roles.map((role) => (
            <div
              key={role.value}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedRole === role.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => onRoleChange(role.value)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{role.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{role.label}</h3>
                  <p className="text-sm text-slate-600">{role.description}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedRole === role.value
                    ? 'border-emerald-500 bg-emerald-500'
                    : 'border-slate-300'
                }`}>
                  {selectedRole === role.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedRole && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">Selected:</span> {roles.find(r => r.value === selectedRole)?.label}
          </p>
        </div>
      )}
    </div>
  );
};

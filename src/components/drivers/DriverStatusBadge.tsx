
import React from 'react';
import { DriverStatus } from './types';
import { Switch } from '@/components/ui/switch';

interface DriverStatusBadgeProps {
  status: DriverStatus;
  onChange?: (newStatus: DriverStatus) => void;
}

const DriverStatusBadge = ({ status, onChange }: DriverStatusBadgeProps) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(status === 'active' ? 'inactive' : 'active');
    }
  };
  
  return (
    <div className="flex items-center">
      <span className="mr-3 text-gray-700">
        {status === 'active' ? 'Active' : 'Inactive'}
      </span>
      <Switch 
        checked={status === 'active'} 
        onCheckedChange={handleToggle}
        className={status === 'active' ? "bg-green-500" : ""}
      />
    </div>
  );
};

export default DriverStatusBadge;

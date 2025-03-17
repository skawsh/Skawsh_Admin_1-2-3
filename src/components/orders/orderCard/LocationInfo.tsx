
import React from 'react';
import { MapPin, User, Building } from 'lucide-react';

interface LocationInfoProps {
  type: 'pickup' | 'delivery';
  location: string;
  address: string;
  isReadyForCollection: boolean;
  isNewOrder: boolean;
}

const LocationInfo: React.FC<LocationInfoProps> = ({
  type,
  location,
  address,
  isReadyForCollection,
  isNewOrder
}) => {
  const isPickup = type === 'pickup';
  
  // Determine icon and label based on type and order status
  const icon = isPickup
    ? (isReadyForCollection ? <Building className="text-gray-600" size={16} /> : <User className="text-gray-600" size={16} />)
    : (isReadyForCollection ? <User className="text-gray-600" size={16} /> : <Building className="text-gray-600" size={16} />);
  
  const labelIcon = isPickup ? <MapPin size={18} className="text-red-500" /> : <MapPin size={18} className="text-green-500" />;
  
  let label;
  if (isPickup) {
    label = isReadyForCollection ? "Collect" : "Pickup";
  } else {
    label = isNewOrder ? "Drop" : "Delivery";
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {labelIcon}
        <span className="font-semibold text-gray-800">{label}</span>
      </div>
      <div className="ml-6 space-y-1">
        <div className="flex items-center gap-1 text-sm">
          {icon}
          <span className="font-medium">{location}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin size={14} className="text-gray-400 opacity-70" />
          <span>{address}</span>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;

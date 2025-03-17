
import React from 'react';
import { Navigation } from 'lucide-react';

interface TripStatusIndicatorProps {
  show: boolean;
}

const TripStatusIndicator: React.FC<TripStatusIndicatorProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 mb-2">
      <Navigation size={18} className="text-blue-600" />
      <span>Pickup In Progress</span>
    </div>
  );
};

export default TripStatusIndicator;

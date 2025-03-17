
import React from 'react';
import { Package } from 'lucide-react';

interface WashTypeBadgeProps {
  washType?: string;
  detailView?: boolean;
}

const WashTypeBadge: React.FC<WashTypeBadgeProps> = ({ 
  washType = 'standard',
  detailView = false
}) => {
  // Format the wash type display according to specifications
  const getFormattedWashType = (type?: string) => {
    if (!type) return "Standard";
    if (type === 'express') return "Express";
    if (type === 'standard') return "Standard";
    if (type === 'both') return "Express & Standard";
    return type;
  };

  const className = detailView 
    ? "bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm font-medium flex items-center gap-1"
    : "text-sm font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-sm";
  
  const iconSize = detailView ? 14 : 16;

  return (
    <span className={className}>
      <Package size={iconSize} className="text-blue-600" />
      {getFormattedWashType(washType)} Wash
    </span>
  );
};

export default WashTypeBadge;

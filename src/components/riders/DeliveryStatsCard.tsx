
import React from 'react';
import { Home } from 'lucide-react';
import InfoCard from './InfoCard';
import InfoField from './InfoField';
import { Driver as Rider } from '@/components/drivers/types';

interface DeliveryStatsCardProps {
  rider: Rider;
}

const DeliveryStatsCard = ({ rider }: DeliveryStatsCardProps) => {
  return (
    <InfoCard title="Delivery Statistics" icon={Home} className="md:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InfoField label="Assigned Orders" value={rider.assignedOrders || 0} />
        <InfoField label="Total Deliveries" value={rider.totalDeliveries || 0} />
        <InfoField 
          label="Rating" 
          value={`${rider.rating || 'N/A'} ${rider.rating ? '⭐' : ''}`} 
        />
      </div>
    </InfoCard>
  );
};

export default DeliveryStatsCard;

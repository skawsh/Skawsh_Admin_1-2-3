
import React from 'react';
import { User } from 'lucide-react';
import InfoCard from './InfoCard';
import InfoField from './InfoField';
import { Driver as Rider } from '@/components/drivers/types';

interface PersonalInfoCardProps {
  rider: Rider & { address?: string };
}

const PersonalInfoCard = ({ rider }: PersonalInfoCardProps) => {
  return (
    <InfoCard title="Personal Information" icon={User}>
      <InfoField label="Name" value={rider.name} />
      <InfoField 
        label="Status" 
        value={rider.status.charAt(0).toUpperCase() + rider.status.slice(1)} 
        valueClassName={rider.status === 'active' ? 'text-green-600' : 'text-red-600'}
      />
      {rider.address && <InfoField label="Address" value={rider.address} />}
    </InfoCard>
  );
};

export default PersonalInfoCard;

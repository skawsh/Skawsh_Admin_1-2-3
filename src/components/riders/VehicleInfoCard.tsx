
import React from 'react';
import { Car } from 'lucide-react';
import InfoCard from './InfoCard';
import InfoField from './InfoField';

interface VehicleDetailsType {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
}

interface VehicleInfoCardProps {
  vehicleDetails: VehicleDetailsType;
}

const VehicleInfoCard = ({ vehicleDetails }: VehicleInfoCardProps) => {
  return (
    <InfoCard title="Vehicle Information" icon={Car} className="md:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InfoField label="Make" value={vehicleDetails.make} />
        <InfoField label="Model" value={vehicleDetails.model} />
        <InfoField label="Year" value={vehicleDetails.year} />
        <InfoField label="Color" value={vehicleDetails.color} />
        <InfoField label="License Plate" value={vehicleDetails.licensePlate} />
      </div>
    </InfoCard>
  );
};

export default VehicleInfoCard;

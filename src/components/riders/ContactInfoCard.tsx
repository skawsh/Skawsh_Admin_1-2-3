
import React from 'react';
import { Phone } from 'lucide-react';
import InfoCard from './InfoCard';
import InfoField from './InfoField';

interface ContactInfoCardProps {
  phoneNumber: string;
  emergencyContact?: string;
}

const ContactInfoCard = ({ phoneNumber, emergencyContact }: ContactInfoCardProps) => {
  return (
    <InfoCard title="Contact Information" icon={Phone}>
      <InfoField label="Phone Number" value={phoneNumber} />
      {emergencyContact && (
        <InfoField label="Emergency Contact" value={emergencyContact} />
      )}
    </InfoCard>
  );
};

export default ContactInfoCard;

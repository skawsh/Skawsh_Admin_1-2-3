
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, IdCard, Car, CreditCard } from 'lucide-react';

interface DriverDetailsSectionTabsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DriverDetailsSectionTabs = ({ activeSection, onSectionChange }: DriverDetailsSectionTabsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button 
        variant={activeSection === 'personal' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSectionChange('personal')}
      >
        <User size={16} className="mr-1" />
        Personal Information
      </Button>
      <Button 
        variant={activeSection === 'documentation' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSectionChange('documentation')}
      >
        <IdCard size={16} className="mr-1" />
        Documentation
      </Button>
      <Button 
        variant={activeSection === 'vehicle' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSectionChange('vehicle')}
      >
        <Car size={16} className="mr-1" />
        Vehicle
      </Button>
      <Button 
        variant={activeSection === 'payment' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSectionChange('payment')}
      >
        <CreditCard size={16} className="mr-1" />
        Payment
      </Button>
    </div>
  );
};

export default DriverDetailsSectionTabs;


import React from 'react';
import { Button } from '@/components/ui/button';
import { User, IdCard, Car, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DriverDetailsSectionTabsProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DriverDetailsSectionTabs = ({ activeSection, onSectionChange }: DriverDetailsSectionTabsProps) => {
  // Tab configuration with colors
  const tabs = [
    { 
      id: 'personal', 
      label: 'Personal Information', 
      icon: User, 
      activeColor: 'bg-laundry-blue text-white',
      hoverColor: 'hover:bg-blue-50 hover:text-laundry-blue'
    },
    { 
      id: 'documentation', 
      label: 'Documentation', 
      icon: IdCard,
      activeColor: 'bg-laundry-purple text-white',
      hoverColor: 'hover:bg-purple-50 hover:text-laundry-purple'
    },
    { 
      id: 'vehicle', 
      label: 'Vehicle', 
      icon: Car,
      activeColor: 'bg-laundry-green text-white',
      hoverColor: 'hover:bg-green-50 hover:text-laundry-green'
    },
    { 
      id: 'payment', 
      label: 'Payment', 
      icon: CreditCard,
      activeColor: 'bg-laundry-orange text-white',
      hoverColor: 'hover:bg-orange-50 hover:text-laundry-orange'
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map(tab => (
        <Button 
          key={tab.id}
          variant={activeSection === tab.id ? 'default' : 'outline'} 
          size="sm"
          onClick={() => onSectionChange(tab.id)}
          className={cn(
            "transition-all duration-200 border shadow-sm",
            activeSection === tab.id 
              ? `${tab.activeColor} shadow-blue-glow` 
              : `${tab.hoverColor} text-gray-700`
          )}
        >
          <tab.icon size={16} className="mr-1" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default DriverDetailsSectionTabs;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface DriverOrderHeaderProps {
  onBackClick: () => void;
}

const DriverOrderHeader: React.FC<DriverOrderHeaderProps> = ({ onBackClick }) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4"
          onClick={onBackClick}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Assigned Orders</h1>
      </div>
    </div>
  );
};

export default DriverOrderHeader;

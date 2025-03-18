
import React from 'react';
import { Button } from '@/components/ui/button';
import { KeyRound, X, Save, Pencil, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DriverActionsHeaderProps {
  isEditing: boolean;
  driverName?: string;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  openPasswordDialog: () => void;
}

const DriverActionsHeader = ({ 
  isEditing, 
  driverName, 
  onEdit, 
  onCancel, 
  onSave, 
  openPasswordDialog 
}: DriverActionsHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="mr-4"
          onClick={() => navigate('/drivers')}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Drivers
        </Button>
        <h1 className="text-2xl font-bold">Driver Details</h1>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={openPasswordDialog}
        >
          <KeyRound size={16} className="mr-1" />
          Reset Password
        </Button>
        
        {isEditing ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCancel}
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={onSave}
            >
              <Save size={16} className="mr-1" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onEdit}
          >
            <Pencil size={16} className="mr-1" />
            Edit Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default DriverActionsHeader;

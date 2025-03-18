
import React from 'react';
import { Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FileUploadField from './FileUploadField';

interface VehicleInformationSectionProps {
  rcFile: File | null;
  setRcFile: React.Dispatch<React.SetStateAction<File | null>>;
  insuranceFile: File | null;
  setInsuranceFile: React.Dispatch<React.SetStateAction<File | null>>;
  vehicleFrontImage: File | null;
  setVehicleFrontImage: React.Dispatch<React.SetStateAction<File | null>>;
  vehicleBackImage: File | null;
  setVehicleBackImage: React.Dispatch<React.SetStateAction<File | null>>;
  vehicleRightImage: File | null;
  setVehicleRightImage: React.Dispatch<React.SetStateAction<File | null>>;
  vehicleLeftImage: File | null;
  setVehicleLeftImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const VehicleInformationSection = ({
  rcFile,
  setRcFile,
  insuranceFile,
  setInsuranceFile,
  vehicleFrontImage,
  setVehicleFrontImage,
  vehicleBackImage,
  setVehicleBackImage,
  vehicleRightImage,
  setVehicleRightImage,
  vehicleLeftImage,
  setVehicleLeftImage
}: VehicleInformationSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Car className="h-5 w-5 text-laundry-blue" />
        <h2 className="text-lg font-semibold">Vehicle Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="vehicleModel">Vehicle Model</Label>
          <Input id="vehicleModel" placeholder="Enter vehicle model" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="licensePlate">License Plate</Label>
          <Input id="licensePlate" placeholder="Enter license plate" required />
        </div>
        
        <div className="md:col-span-2 mt-4">
          <h3 className="text-base font-medium mb-4">Upload Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadField 
              id="rcUpload" 
              label="RC (Registration Certificate)" 
              file={rcFile} 
              setFile={setRcFile} 
            />
            
            <FileUploadField 
              id="insuranceUpload" 
              label="Insurance Copy" 
              file={insuranceFile} 
              setFile={setInsuranceFile} 
            />
          </div>
        </div>
        
        <div className="md:col-span-2 mt-4">
          <h3 className="text-base font-medium mb-4">Vehicle Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadField 
              id="frontImage" 
              label="Vehicle Front side Image" 
              file={vehicleFrontImage} 
              setFile={setVehicleFrontImage} 
            />
            
            <FileUploadField 
              id="backImage" 
              label="Vehicle Back side Image" 
              file={vehicleBackImage} 
              setFile={setVehicleBackImage} 
            />
            
            <FileUploadField 
              id="rightImage" 
              label="Vehicle Right side Image" 
              file={vehicleRightImage} 
              setFile={setVehicleRightImage} 
            />
            
            <FileUploadField 
              id="leftImage" 
              label="Vehicle Left side Image" 
              file={vehicleLeftImage} 
              setFile={setVehicleLeftImage} 
            />
          </div>
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea 
            id="notes" 
            placeholder="Enter any additional information about the driver or vehicle" 
            className="h-24"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleInformationSection;

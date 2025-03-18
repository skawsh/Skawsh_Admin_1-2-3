
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Car, Upload } from 'lucide-react';
import { Driver } from './types';

interface VehicleInfoSectionProps {
  driver: Driver;
  editedDriver: Driver | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const VehicleInfoSection = ({ driver, editedDriver, isEditing, handleInputChange }: VehicleInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-laundry-blue" />
            Vehicle Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="vehicleDetails.model">Vehicle Model</Label>
              {isEditing ? (
                <Input 
                  id="vehicleDetails.model"
                  name="vehicleDetails.model"
                  value={editedDriver?.vehicleDetails?.model || ''}
                  onChange={handleInputChange}
                  placeholder="Enter vehicle model"
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{driver.vehicleDetails?.model || 'Not provided'}</div>
              )}
            </div>
            
            <div className="flex flex-col space-y-2">
              <Label htmlFor="vehicleDetails.licensePlate">License Plate</Label>
              {isEditing ? (
                <Input 
                  id="vehicleDetails.licensePlate"
                  name="vehicleDetails.licensePlate"
                  value={editedDriver?.vehicleDetails?.licensePlate || ''}
                  onChange={handleInputChange}
                  placeholder="Enter license plate"
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{driver.vehicleDetails?.licensePlate || 'Not provided'}</div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Upload Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="documentFiles.rcFile">RC (Registration Certificate)</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <Upload size={16} />
                      Upload RC
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">
                    {driver.documentFiles?.rcFile ? 'Uploaded' : 'Not uploaded'}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="documentFiles.insuranceFile">Insurance Copy</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <Upload size={16} />
                      Upload Insurance
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">
                    {driver.documentFiles?.insuranceFile ? 'Uploaded' : 'Not uploaded'}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Vehicle Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="documentFiles.vehicleFrontImage">Vehicle Front side Image</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <Upload size={16} />
                      Upload Front Image
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">
                    {driver.documentFiles?.vehicleFrontImage ? 'Uploaded' : 'Not uploaded'}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="documentFiles.vehicleBackImage">Vehicle Back side Image</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <Upload size={16} />
                      Upload Back Image
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">
                    {driver.documentFiles?.vehicleBackImage ? 'Uploaded' : 'Not uploaded'}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="documentFiles.vehicleRightImage">Vehicle Right side Image</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <Upload size={16} />
                      Upload Right Image
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">
                    {driver.documentFiles?.vehicleRightImage ? 'Uploaded' : 'Not uploaded'}
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                <Label htmlFor="documentFiles.vehicleLeftImage">Vehicle Left side Image</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                      <Upload size={16} />
                      Upload Left Image
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">
                    {driver.documentFiles?.vehicleLeftImage ? 'Uploaded' : 'Not uploaded'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleInfoSection;

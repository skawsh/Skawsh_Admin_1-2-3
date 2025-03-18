
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IdCard, Upload } from 'lucide-react';
import { Driver } from './types';

interface DocumentationSectionProps {
  driver: Driver;
  editedDriver: Driver | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DocumentationSection = ({ driver, editedDriver, isEditing, handleInputChange }: DocumentationSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IdCard className="h-5 w-5 text-laundry-blue" />
            Driver Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="aadharNumber">Aadhar Number</Label>
            {isEditing ? (
              <Input 
                id="aadharNumber"
                name="aadharNumber"
                value={editedDriver?.aadharNumber || ''}
                onChange={handleInputChange}
                placeholder="Enter Aadhar number"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.aadharNumber || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="documentFiles.aadharFile">Aadhar Card Image</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <Upload size={16} />
                  Upload Aadhar Card Image
                </Button>
              </div>
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">
                {driver.documentFiles?.aadharFile ? 'Uploaded' : 'Not uploaded'}
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            {isEditing ? (
              <Input 
                id="licenseNumber"
                name="licenseNumber"
                value={editedDriver?.licenseNumber || ''}
                onChange={handleInputChange}
                placeholder="Enter license number"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.licenseNumber || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="licenseExpiry">License Expiry Date</Label>
            {isEditing ? (
              <Input 
                id="licenseExpiry"
                name="licenseExpiry"
                type="date"
                value={editedDriver?.licenseExpiry || ''}
                onChange={handleInputChange}
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.licenseExpiry || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="documentFiles.licenseFile">Driving License Image</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <Upload size={16} />
                  Upload Driving License Image
                </Button>
              </div>
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">
                {driver.documentFiles?.licenseFile ? 'Uploaded' : 'Not uploaded'}
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="documentFiles.profilePicture">Driver Profile Picture</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full flex justify-center items-center gap-2">
                  <Upload size={16} />
                  Upload Driver Profile Picture
                </Button>
              </div>
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">
                {driver.documentFiles?.profilePicture ? 'Uploaded' : 'Not uploaded'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentationSection;

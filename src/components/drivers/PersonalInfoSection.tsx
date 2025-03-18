
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User } from 'lucide-react';
import { Driver } from './types';

interface PersonalInfoSectionProps {
  driver: Driver;
  editedDriver: Driver | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoSection = ({ driver, editedDriver, isEditing, handleInputChange }: PersonalInfoSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-laundry-blue" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input 
                id="name"
                name="name"
                value={editedDriver?.name || ''}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.name || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            {isEditing ? (
              <Input 
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={editedDriver?.dateOfBirth || ''}
                onChange={handleInputChange}
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.dateOfBirth || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="phoneNumber">Primary Contact Number</Label>
            {isEditing ? (
              <Input 
                id="phoneNumber"
                name="phoneNumber"
                value={editedDriver?.phoneNumber || ''}
                onChange={handleInputChange}
                placeholder="Enter primary phone number"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.phoneNumber || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="secondaryPhone">Secondary Contact Number</Label>
            {isEditing ? (
              <Input 
                id="secondaryPhone"
                name="secondaryPhone"
                value={editedDriver?.secondaryPhone || ''}
                onChange={handleInputChange}
                placeholder="Enter secondary phone number"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.secondaryPhone || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input 
                id="email"
                name="email"
                type="email"
                value={editedDriver?.email || ''}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.email || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
            {isEditing ? (
              <Input 
                id="emergencyContactName"
                name="emergencyContactName"
                value={editedDriver?.emergencyContactName || ''}
                onChange={handleInputChange}
                placeholder="Enter emergency contact name"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.emergencyContactName || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="emergencyContactRelation">Relation with Driver</Label>
            {isEditing ? (
              <Input 
                id="emergencyContactRelation"
                name="emergencyContactRelation"
                value={editedDriver?.emergencyContactRelation || ''}
                onChange={handleInputChange}
                placeholder="Enter relation"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.emergencyContactRelation || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
            {isEditing ? (
              <Input 
                id="emergencyContact"
                name="emergencyContact"
                value={editedDriver?.emergencyContact || ''}
                onChange={handleInputChange}
                placeholder="Enter emergency contact number"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.emergencyContact || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2 col-span-2">
            <Label htmlFor="currentAddress">Current Address</Label>
            {isEditing ? (
              <Textarea 
                id="currentAddress"
                name="currentAddress"
                value={editedDriver?.currentAddress || ''}
                onChange={handleInputChange}
                placeholder="Enter current address"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.currentAddress || 'Not provided'}</div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2 col-span-2">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            {isEditing ? (
              <Textarea 
                id="permanentAddress"
                name="permanentAddress"
                value={editedDriver?.permanentAddress || ''}
                onChange={handleInputChange}
                placeholder="Enter permanent address"
              />
            ) : (
              <div className="p-2 border rounded-md bg-gray-50">{driver.permanentAddress || 'Not provided'}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoSection;

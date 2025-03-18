
import React from 'react';
import { IdCard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FileUploadField from './FileUploadField';

interface DriverDocumentationSectionProps {
  aadharFile: File | null;
  setAadharFile: React.Dispatch<React.SetStateAction<File | null>>;
  licenseFile: File | null;
  setLicenseFile: React.Dispatch<React.SetStateAction<File | null>>;
  profilePicture: File | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
}

const DriverDocumentationSection = ({
  aadharFile,
  setAadharFile,
  licenseFile,
  setLicenseFile,
  profilePicture,
  setProfilePicture
}: DriverDocumentationSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <IdCard className="h-5 w-5 text-laundry-blue" />
        <h2 className="text-lg font-semibold">Driver Documentation</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Aadhar Number and Upload */}
        <div className="space-y-2">
          <Label htmlFor="aadharNumber">Aadhar Number</Label>
          <Input id="aadharNumber" placeholder="Enter Aadhar number" required />
        </div>
        
        <FileUploadField 
          id="aadharUpload" 
          label="Aadhar Card Image" 
          file={aadharFile} 
          setFile={setAadharFile} 
        />
        
        {/* License Number and Expiry */}
        <div className="space-y-2">
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input id="licenseNumber" placeholder="Enter license number" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="licenseExpiry">License Expiry Date</Label>
          <Input id="licenseExpiry" type="date" required />
        </div>
        
        {/* License Upload and Driver Picture */}
        <FileUploadField 
          id="licenseUpload" 
          label="Driving License Image" 
          file={licenseFile} 
          setFile={setLicenseFile} 
        />
        
        <FileUploadField 
          id="profilePicture" 
          label="Driver Profile Picture" 
          file={profilePicture} 
          setFile={setProfilePicture} 
        />
      </div>
    </div>
  );
};

export default DriverDocumentationSection;

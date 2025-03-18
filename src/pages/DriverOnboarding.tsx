
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, UserCheck, IdCard, Car, CircleCheck, Upload } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const DriverOnboarding = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // File upload states
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Driver Created",
      description: "New driver has been successfully added",
    });
    navigate('/drivers');
  };
  
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>, 
    setFileFn: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFileFn(event.target.files[0]);
    }
  };
  
  // Custom file input component
  const FileUploadField = ({ 
    id, 
    label, 
    file, 
    setFile 
  }: { 
    id: string; 
    label: string; 
    file: File | null; 
    setFile: React.Dispatch<React.SetStateAction<File | null>> 
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Button 
          type="button"
          variant="outline"
          onClick={() => document.getElementById(id)?.click()}
          className="flex-1 text-gray-500 hover:text-gray-700"
        >
          <Upload className="h-4 w-4 mr-2" />
          {file ? file.name : `Upload ${label}`}
        </Button>
        {file && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => setFile(null)}
            className="h-8 w-8"
          >
            ✕
          </Button>
        )}
      </div>
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e, setFile)}
      />
    </div>
  );
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        className={`fixed z-20 lg:static transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`} 
      />
      
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header 
          toggleSidebar={toggleSidebar} 
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/drivers')}
                className="h-9 w-9 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">Add New Driver</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <UserCheck className="h-5 w-5 text-laundry-blue" />
                  <h2 className="text-lg font-semibold">Personal Information</h2>
                </div>
                
                {/* Personal Information Section - kept the same */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter full name" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" required />
                  </div>
                  
                  <div className="space-y-2 relative">
                    <Label htmlFor="primaryContact">Primary Contact Number</Label>
                    <div className="relative">
                      <Input id="primaryContact" placeholder="Enter primary contact number" required />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      >
                        <CircleCheck className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input id="otp" placeholder="Enter OTP" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryContact">Secondary Contact Number</Label>
                    <Input id="secondaryContact" placeholder="Enter secondary contact number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm password" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                    <Input id="emergencyContactName" placeholder="Enter emergency contact name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relation">Relation with driver</Label>
                    <Input id="relation" placeholder="Enter relation" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-1">
                    <Label htmlFor="emergencyContactNumber">Emergency Contact Number</Label>
                    <Input id="emergencyContactNumber" placeholder="Enter emergency contact number" />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="currentAddress">Current Address</Label>
                  <Textarea id="currentAddress" placeholder="Enter current address" className="h-20" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="permanentAddress">Permanent Address</Label>
                  <Textarea id="permanentAddress" placeholder="Enter permanent address" className="h-20" />
                </div>
              </div>
              
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
                  
                  {/* License Number and Expiry - kept the same */}
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
              
              <div className="flex items-center space-x-2 my-4">
                <Checkbox id="isActive" />
                <Label htmlFor="isActive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Set as active driver
                </Label>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/drivers')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-laundry-blue hover:bg-laundry-blue-dark"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Driver
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverOnboarding;

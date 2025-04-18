import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import PersonalInformationSection from '@/components/driver-onboarding/PersonalInformationSection';
import DriverDocumentationSection from '@/components/driver-onboarding/DriverDocumentationSection';
import VehicleInformationSection from '@/components/driver-onboarding/VehicleInformationSection';
import PaymentDetailsSection from '@/components/driver-onboarding/PaymentDetailsSection';

const DriverOnboarding = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [driverName, setDriverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelation, setEmergencyRelation] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  
  const [aadharNumber, setAadharNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpiry, setLicenseExpiry] = useState('');
  
  const [vehicleModel, setVehicleModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchName, setBranchName] = useState('');
  
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  
  const [rcFile, setRcFile] = useState<File | null>(null);
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [vehicleFrontImage, setVehicleFrontImage] = useState<File | null>(null);
  const [vehicleBackImage, setVehicleBackImage] = useState<File | null>(null);
  const [vehicleRightImage, setVehicleRightImage] = useState<File | null>(null);
  const [vehicleLeftImage, setVehicleLeftImage] = useState<File | null>(null);
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDriverId = `new-${Date.now()}`;
    
    const newDriver = {
      id: newDriverId,
      name: driverName || 'New Driver',
      status: 'active' as const,
      phoneNumber: phoneNumber || '--',
      assignedOrders: 0,
      totalDeliveries: 0,
      rating: 0,
      
      dateOfBirth,
      secondaryPhone,
      email,
      otp,
      password,
      confirmPassword,
      emergencyContactName: emergencyName,
      emergencyContactRelation: emergencyRelation,
      emergencyContact: emergencyPhone,
      currentAddress,
      permanentAddress,
      
      aadharNumber,
      licenseNumber,
      licenseExpiry,
      
      vehicleDetails: {
        model: vehicleModel,
        licensePlate,
      },
      
      paymentDetails: {
        accountHolderName,
        bankName,
        accountNumber,
        confirmAccountNumber,
        ifscCode,
        branchName
      },
      
      documentFiles: {
        aadharFile: aadharFile ? aadharFile.name : '',
        licenseFile: licenseFile ? licenseFile.name : '',
        profilePicture: profilePicture ? profilePicture.name : '',
        rcFile: rcFile ? rcFile.name : '',
        insuranceFile: insuranceFile ? insuranceFile.name : '',
        vehicleFrontImage: vehicleFrontImage ? vehicleFrontImage.name : '',
        vehicleBackImage: vehicleBackImage ? vehicleBackImage.name : '',
        vehicleRightImage: vehicleRightImage ? vehicleRightImage.name : '',
        vehicleLeftImage: vehicleLeftImage ? vehicleLeftImage.name : ''
      }
    };
    
    const existingDriversJson = localStorage.getItem('driversList');
    const existingDrivers = existingDriversJson ? JSON.parse(existingDriversJson) : [];
    
    const updatedDrivers = [...existingDrivers, newDriver];
    
    localStorage.setItem('driversList', JSON.stringify(updatedDrivers));
    
    toast({
      title: "Driver Created",
      description: "New driver has been successfully added to the list",
    });
    
    navigate('/drivers');
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar 
        collapsed={!sidebarOpen}
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
              <PersonalInformationSection 
                driverName={driverName}
                setDriverName={setDriverName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
              
              <DriverDocumentationSection 
                aadharFile={aadharFile}
                setAadharFile={setAadharFile}
                licenseFile={licenseFile}
                setLicenseFile={setLicenseFile}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                aadharNumber={aadharNumber}
                setAadharNumber={setAadharNumber}
                licenseNumber={licenseNumber}
                setLicenseNumber={setLicenseNumber}
                licenseExpiry={licenseExpiry}
                setLicenseExpiry={setLicenseExpiry}
              />
              
              <VehicleInformationSection 
                rcFile={rcFile}
                setRcFile={setRcFile}
                insuranceFile={insuranceFile}
                setInsuranceFile={setInsuranceFile}
                vehicleFrontImage={vehicleFrontImage}
                setVehicleFrontImage={setVehicleFrontImage}
                vehicleBackImage={vehicleBackImage}
                setVehicleBackImage={setVehicleBackImage}
                vehicleRightImage={vehicleRightImage}
                setVehicleRightImage={setVehicleRightImage}
                vehicleLeftImage={vehicleLeftImage}
                setVehicleLeftImage={setVehicleLeftImage}
                vehicleModel={vehicleModel}
                setVehicleModel={setVehicleModel}
                licensePlate={licensePlate}
                setLicensePlate={setLicensePlate}
              />
              
              <PaymentDetailsSection 
                accountHolderName={accountHolderName}
                setAccountHolderName={setAccountHolderName}
                bankName={bankName}
                setBankName={setBankName}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                confirmAccountNumber={confirmAccountNumber}
                setConfirmAccountNumber={setConfirmAccountNumber}
                ifscCode={ifscCode}
                setIfscCode={setIfscCode}
                branchName={branchName}
                setBranchName={setBranchName}
              />
              
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

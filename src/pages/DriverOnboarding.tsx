
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import PersonalInformationSection from '@/components/driver-onboarding/PersonalInformationSection';
import DriverDocumentationSection from '@/components/driver-onboarding/DriverDocumentationSection';
import VehicleInformationSection from '@/components/driver-onboarding/VehicleInformationSection';
import PaymentDetailsSection from '@/components/driver-onboarding/PaymentDetailsSection';

const DriverOnboarding = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Driver details state
  const [driverName, setDriverName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // File upload states
  const [aadharFile, setAadharFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  
  // Vehicle document states
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
    
    // Generate a unique ID for the new driver
    const newDriverId = `new-${Date.now()}`;
    
    // Create new driver object
    const newDriver = {
      id: newDriverId,
      name: driverName || 'New Driver', // Fallback in case name is empty
      status: 'active' as const,
      phoneNumber: phoneNumber || '--',
      assignedOrders: 0,
      totalDeliveries: 0,
      rating: 0
    };
    
    // Get existing drivers from localStorage or use empty array
    const existingDriversJson = localStorage.getItem('driversList');
    const existingDrivers = existingDriversJson ? JSON.parse(existingDriversJson) : [];
    
    // Add new driver to the list
    const updatedDrivers = [...existingDrivers, newDriver];
    
    // Save updated drivers list to localStorage
    localStorage.setItem('driversList', JSON.stringify(updatedDrivers));
    
    // Show success toast
    toast({
      title: "Driver Created",
      description: "New driver has been successfully added to the list",
    });
    
    // Navigate back to drivers page
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
              />
              
              <PaymentDetailsSection />
              
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

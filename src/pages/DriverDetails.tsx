
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, Home, Car, ArrowLeft, Pencil, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Extended driver type with all the fields from the add new driver form
interface ExtendedDriver extends Driver {
  emergencyContact?: string;
  address?: string;
  vehicleDetails?: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
  };
  dateOfBirth?: string;
  secondaryPhone?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  currentAddress?: string;
  permanentAddress?: string;
}

const DriverDetails = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [driver, setDriver] = useState<ExtendedDriver | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState<ExtendedDriver | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    if (!driverId) return;
    
    // Start with empty driver
    let foundDriver: ExtendedDriver | null = null;
    
    // First check localStorage for the driver
    try {
      const savedDriversJson = localStorage.getItem('driversList');
      if (savedDriversJson) {
        const savedDrivers = JSON.parse(savedDriversJson);
        foundDriver = savedDrivers.find((d: Driver) => d.id === driverId) || null;
      }
    } catch (error) {
      console.error('Error fetching driver data from localStorage:', error);
    }
    
    // If not found in localStorage, check sample data
    if (!foundDriver) {
      foundDriver = sampleDrivers.find(d => d.id === driverId) || null;
    }
    
    if (foundDriver) {
      // Set default values for any missing fields to avoid undefined errors
      const extendedDriver: ExtendedDriver = {
        ...foundDriver,
        emergencyContact: foundDriver.emergencyContact || "",
        address: foundDriver.address || "",
        vehicleDetails: foundDriver.vehicleDetails || {
          make: "",
          model: "",
          year: "",
          color: "",
          licensePlate: ""
        },
        dateOfBirth: foundDriver.dateOfBirth || "",
        secondaryPhone: foundDriver.secondaryPhone || "",
        email: foundDriver.email || "",
        emergencyContactName: foundDriver.emergencyContactName || "",
        emergencyContactRelation: foundDriver.emergencyContactRelation || "",
        currentAddress: foundDriver.currentAddress || "",
        permanentAddress: foundDriver.permanentAddress || ""
      };
      
      setDriver(extendedDriver);
      setEditedDriver(extendedDriver);
    } else {
      toast({
        title: "Driver Not Found",
        description: "Could not find the selected driver.",
        variant: "destructive"
      });
      // Redirect back to drivers page if driver not found
      navigate('/drivers');
    }
  }, [driverId, navigate, toast]);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedDriver(driver);
  };
  
  const handleSave = () => {
    if (!editedDriver) return;
    
    // Save to state
    setDriver(editedDriver);
    
    // Save to localStorage
    try {
      const savedDriversJson = localStorage.getItem('driversList');
      if (savedDriversJson) {
        const savedDrivers = JSON.parse(savedDriversJson);
        
        // Check if driver already exists in the list
        const driverIndex = savedDrivers.findIndex((d: Driver) => d.id === editedDriver.id);
        
        if (driverIndex !== -1) {
          // Update existing driver
          savedDrivers[driverIndex] = { ...savedDrivers[driverIndex], ...editedDriver };
        } else {
          // Add new driver
          savedDrivers.push(editedDriver);
        }
        
        localStorage.setItem('driversList', JSON.stringify(savedDrivers));
      } else {
        // If no drivers list exists yet, create one with this driver
        localStorage.setItem('driversList', JSON.stringify([editedDriver]));
      }
    } catch (error) {
      console.error('Error saving driver data:', error);
    }
    
    setIsEditing(false);
    
    toast({
      title: "Driver Updated",
      description: "Driver details have been updated successfully.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedDriver) return;
    
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      // Fix: Use type assertion to avoid TypeScript error with spread operator
      const parentObj = editedDriver[parent as keyof ExtendedDriver] as Record<string, any> || {};
      
      setEditedDriver({
        ...editedDriver,
        [parent]: {
          ...parentObj,
          [child]: value
        }
      });
    } else {
      setEditedDriver({
        ...editedDriver,
        [name]: value
      });
    }
  };
  
  if (!driver) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading driver details...</h2>
        </div>
      </div>
    );
  }
  
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
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
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
            
            {isEditing ? (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancel}
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSave}
                >
                  <Save size={16} className="mr-1" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEdit}
              >
                <Pencil size={16} className="mr-1" />
                Edit Details
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-laundry-blue" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={editedDriver?.name || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Name</span>
                      <span className="font-medium">{driver.name}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input 
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={editedDriver?.dateOfBirth || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Date of Birth</span>
                      <span className="font-medium">{driver.dateOfBirth}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        value={editedDriver?.email || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Email</span>
                      <span className="font-medium">{driver.email}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        name="status"
                        value={editedDriver?.status || 'active'}
                        onChange={(e) => handleInputChange(e as any)}
                        className="mt-1 rounded-md border border-input px-3 py-2"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Status</span>
                      <span className={`font-medium ${driver.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                        {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                      </span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="currentAddress">Current Address</Label>
                      <Textarea 
                        id="currentAddress"
                        name="currentAddress"
                        value={editedDriver?.currentAddress || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Current Address</span>
                      <span className="font-medium">{driver.currentAddress}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="permanentAddress">Permanent Address</Label>
                      <Textarea 
                        id="permanentAddress"
                        name="permanentAddress"
                        value={editedDriver?.permanentAddress || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Permanent Address</span>
                      <span className="font-medium">{driver.permanentAddress}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-laundry-blue" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input 
                        id="phoneNumber"
                        name="phoneNumber"
                        value={editedDriver?.phoneNumber || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Phone Number</span>
                      <span className="font-medium">{driver.phoneNumber}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                      <Input 
                        id="secondaryPhone"
                        name="secondaryPhone"
                        value={editedDriver?.secondaryPhone || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Secondary Phone</span>
                      <span className="font-medium">{driver.secondaryPhone}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                      <Input 
                        id="emergencyContactName"
                        name="emergencyContactName"
                        value={editedDriver?.emergencyContactName || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Emergency Contact Name</span>
                      <span className="font-medium">{driver.emergencyContactName}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="emergencyContactRelation">Relation with Driver</Label>
                      <Input 
                        id="emergencyContactRelation"
                        name="emergencyContactRelation"
                        value={editedDriver?.emergencyContactRelation || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Relation with Driver</span>
                      <span className="font-medium">{driver.emergencyContactRelation}</span>
                    </>
                  )}
                </div>
                
                <div className="flex flex-col">
                  {isEditing ? (
                    <>
                      <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
                      <Input 
                        id="emergencyContact"
                        name="emergencyContact"
                        value={editedDriver?.emergencyContact || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-gray-500">Emergency Contact Number</span>
                      <span className="font-medium">{driver.emergencyContact}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5 text-laundry-blue" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    {isEditing ? (
                      <>
                        <Label htmlFor="vehicleDetails.make">Make</Label>
                        <Input 
                          id="vehicleDetails.make"
                          name="vehicleDetails.make"
                          value={editedDriver?.vehicleDetails?.make || ''}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-gray-500">Make</span>
                        <span className="font-medium">{driver.vehicleDetails?.make}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    {isEditing ? (
                      <>
                        <Label htmlFor="vehicleDetails.model">Model</Label>
                        <Input 
                          id="vehicleDetails.model"
                          name="vehicleDetails.model"
                          value={editedDriver?.vehicleDetails?.model || ''}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-gray-500">Model</span>
                        <span className="font-medium">{driver.vehicleDetails?.model}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    {isEditing ? (
                      <>
                        <Label htmlFor="vehicleDetails.year">Year</Label>
                        <Input 
                          id="vehicleDetails.year"
                          name="vehicleDetails.year"
                          value={editedDriver?.vehicleDetails?.year || ''}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-gray-500">Year</span>
                        <span className="font-medium">{driver.vehicleDetails?.year}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    {isEditing ? (
                      <>
                        <Label htmlFor="vehicleDetails.color">Color</Label>
                        <Input 
                          id="vehicleDetails.color"
                          name="vehicleDetails.color"
                          value={editedDriver?.vehicleDetails?.color || ''}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-gray-500">Color</span>
                        <span className="font-medium">{driver.vehicleDetails?.color}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    {isEditing ? (
                      <>
                        <Label htmlFor="vehicleDetails.licensePlate">License Plate</Label>
                        <Input 
                          id="vehicleDetails.licensePlate"
                          name="vehicleDetails.licensePlate"
                          value={editedDriver?.vehicleDetails?.licensePlate || ''}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-sm text-gray-500">License Plate</span>
                        <span className="font-medium">{driver.vehicleDetails?.licensePlate}</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-laundry-blue" />
                  Delivery Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Assigned Orders</span>
                    <span className="font-medium">{driver.assignedOrders || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Total Deliveries</span>
                    <span className="font-medium">{driver.totalDeliveries || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Rating</span>
                    <span className="font-medium">{driver.rating || 'N/A'} {driver.rating ? '⭐' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DriverDetails;

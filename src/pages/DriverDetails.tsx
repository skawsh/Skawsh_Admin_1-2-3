
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { sampleDrivers } from '@/components/drivers/mockData';
import { Driver } from '@/components/drivers/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, User, Home, Car, ArrowLeft, Pencil, Save, X, CreditCard, IdCard, Calendar, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Extended driver type with all the fields
interface ExtendedDriver extends Driver {
  // All fields are already included in the updated Driver interface
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
  const [activeSection, setActiveSection] = useState<string>('personal');
  
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
        dateOfBirth: foundDriver.dateOfBirth || "",
        secondaryPhone: foundDriver.secondaryPhone || "",
        email: foundDriver.email || "",
        otp: foundDriver.otp || "",
        password: foundDriver.password || "",
        confirmPassword: foundDriver.confirmPassword || "",
        emergencyContactName: foundDriver.emergencyContactName || "",
        emergencyContactRelation: foundDriver.emergencyContactRelation || "",
        emergencyContact: foundDriver.emergencyContact || "",
        currentAddress: foundDriver.currentAddress || "",
        permanentAddress: foundDriver.permanentAddress || "",
        aadharNumber: foundDriver.aadharNumber || "",
        licenseNumber: foundDriver.licenseNumber || "",
        licenseExpiry: foundDriver.licenseExpiry || "",
        vehicleDetails: foundDriver.vehicleDetails || {
          make: "",
          model: "",
          year: "",
          color: "",
          licensePlate: ""
        },
        paymentDetails: foundDriver.paymentDetails || {
          accountHolderName: "",
          bankName: "",
          accountNumber: "",
          confirmAccountNumber: "",
          ifscCode: "",
          branchName: ""
        },
        documentFiles: foundDriver.documentFiles || {
          aadharFile: "",
          licenseFile: "",
          profilePicture: "",
          rcFile: "",
          insuranceFile: "",
          vehicleFrontImage: "",
          vehicleBackImage: "",
          vehicleRightImage: "",
          vehicleLeftImage: ""
        }
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
      
      // Use type assertion to treat the property as a Record to avoid TypeScript error
      // and provide fallback empty object if the property doesn't exist
      const parentObj = (editedDriver[parent as keyof ExtendedDriver] as Record<string, any>) || {};
      
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
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
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

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={activeSection === 'personal' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSectionChange('personal')}
            >
              <User size={16} className="mr-1" />
              Personal Information
            </Button>
            <Button 
              variant={activeSection === 'documentation' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSectionChange('documentation')}
            >
              <IdCard size={16} className="mr-1" />
              Documentation
            </Button>
            <Button 
              variant={activeSection === 'vehicle' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSectionChange('vehicle')}
            >
              <Car size={16} className="mr-1" />
              Vehicle
            </Button>
            <Button 
              variant={activeSection === 'payment' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleSectionChange('payment')}
            >
              <CreditCard size={16} className="mr-1" />
              Payment
            </Button>
          </div>
          
          {/* Personal Information Section */}
          {activeSection === 'personal' && (
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
                    <Label htmlFor="otp">OTP</Label>
                    {isEditing ? (
                      <Input 
                        id="otp"
                        name="otp"
                        value={editedDriver?.otp || ''}
                        onChange={handleInputChange}
                        placeholder="Enter OTP"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.otp || 'Not provided'}</div>
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
                    <Label htmlFor="password">Password</Label>
                    {isEditing ? (
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={editedDriver?.password || ''}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">••••••••</div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    {isEditing ? (
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={editedDriver?.confirmPassword || ''}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">••••••••</div>
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
          )}
          
          {/* Documentation Section */}
          {activeSection === 'documentation' && (
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
          )}
          
          {/* Vehicle Information Section */}
          {activeSection === 'vehicle' && (
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
          )}
          
          {/* Payment Details Section */}
          {activeSection === 'payment' && (
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-laundry-blue" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="paymentDetails.accountHolderName">Account Holder Name</Label>
                    {isEditing ? (
                      <Input 
                        id="paymentDetails.accountHolderName"
                        name="paymentDetails.accountHolderName"
                        value={editedDriver?.paymentDetails?.accountHolderName || ''}
                        onChange={handleInputChange}
                        placeholder="Enter account holder name"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.accountHolderName || 'Not provided'}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="paymentDetails.bankName">Bank Name</Label>
                    {isEditing ? (
                      <Input 
                        id="paymentDetails.bankName"
                        name="paymentDetails.bankName"
                        value={editedDriver?.paymentDetails?.bankName || ''}
                        onChange={handleInputChange}
                        placeholder="Enter bank name"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.bankName || 'Not provided'}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="paymentDetails.accountNumber">Account Number</Label>
                    {isEditing ? (
                      <Input 
                        id="paymentDetails.accountNumber"
                        name="paymentDetails.accountNumber"
                        value={editedDriver?.paymentDetails?.accountNumber || ''}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.accountNumber || 'Not provided'}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="paymentDetails.confirmAccountNumber">Confirm Account Number</Label>
                    {isEditing ? (
                      <Input 
                        id="paymentDetails.confirmAccountNumber"
                        name="paymentDetails.confirmAccountNumber"
                        value={editedDriver?.paymentDetails?.confirmAccountNumber || ''}
                        onChange={handleInputChange}
                        placeholder="Re-enter account number"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.confirmAccountNumber || 'Not provided'}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="paymentDetails.ifscCode">IFSC Code</Label>
                    {isEditing ? (
                      <Input 
                        id="paymentDetails.ifscCode"
                        name="paymentDetails.ifscCode"
                        value={editedDriver?.paymentDetails?.ifscCode || ''}
                        onChange={handleInputChange}
                        placeholder="Enter IFSC code"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.ifscCode || 'Not provided'}</div>
                    )}
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="paymentDetails.branchName">Branch Name</Label>
                    {isEditing ? (
                      <Input 
                        id="paymentDetails.branchName"
                        name="paymentDetails.branchName"
                        value={editedDriver?.paymentDetails?.branchName || ''}
                        onChange={handleInputChange}
                        placeholder="Enter branch name"
                      />
                    ) : (
                      <div className="p-2 border rounded-md bg-gray-50">{driver.paymentDetails?.branchName || 'Not provided'}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DriverDetails;

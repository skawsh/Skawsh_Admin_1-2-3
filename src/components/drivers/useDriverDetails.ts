
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { sampleDrivers } from './mockData';
import { Driver } from './types';

export const useDriverDetails = (driverId?: string) => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [editedDriver, setEditedDriver] = useState<Driver | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!driverId) return;
    
    let foundDriver: Driver | null = null;
    
    try {
      const savedDriversJson = localStorage.getItem('driversList');
      if (savedDriversJson) {
        const savedDrivers = JSON.parse(savedDriversJson);
        foundDriver = savedDrivers.find((d: Driver) => d.id === driverId) || null;
      }
    } catch (error) {
      console.error('Error fetching driver data from localStorage:', error);
    }
    
    if (!foundDriver) {
      foundDriver = sampleDrivers.find(d => d.id === driverId) || null;
    }
    
    if (foundDriver) {
      const extendedDriver: Driver = {
        ...foundDriver,
        dateOfBirth: foundDriver.dateOfBirth || "",
        secondaryPhone: foundDriver.secondaryPhone || "",
        email: foundDriver.email || "",
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
      navigate('/drivers');
    }
  }, [driverId, navigate, toast]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditedDriver(driver);
  };
  
  const handleSave = () => {
    if (!editedDriver) return;
    
    setDriver(editedDriver);
    
    try {
      const savedDriversJson = localStorage.getItem('driversList');
      if (savedDriversJson) {
        const savedDrivers = JSON.parse(savedDriversJson);
        
        const driverIndex = savedDrivers.findIndex((d: Driver) => d.id === editedDriver.id);
        
        if (driverIndex !== -1) {
          savedDrivers[driverIndex] = { ...savedDrivers[driverIndex], ...editedDriver };
        } else {
          savedDrivers.push(editedDriver);
        }
        
        localStorage.setItem('driversList', JSON.stringify(savedDrivers));
      } else {
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
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      
      const parentObj = (editedDriver[parent as keyof Driver] as Record<string, any>) || {};
      
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
  
  const handlePasswordReset = (newPassword: string) => {
    if (!driver) return;
    
    try {
      const savedDriversJson = localStorage.getItem('driversList');
      if (savedDriversJson) {
        const savedDrivers = JSON.parse(savedDriversJson);
        const driverIndex = savedDrivers.findIndex((d: Driver) => d.id === driver.id);
        
        if (driverIndex !== -1) {
          // Update the password in localStorage
          if (!savedDrivers[driverIndex].password) {
            savedDrivers[driverIndex].password = newPassword;
          } else {
            savedDrivers[driverIndex] = {
              ...savedDrivers[driverIndex],
              password: newPassword
            };
          }
          
          localStorage.setItem('driversList', JSON.stringify(savedDrivers));
          
          // Update local state if needed
          if (driver) {
            setDriver({
              ...driver,
              password: newPassword
            });
          }
          
          if (editedDriver) {
            setEditedDriver({
              ...editedDriver,
              password: newPassword
            });
          }
          
          toast({
            title: "Password Updated",
            description: "Driver password has been updated successfully.",
          });
          
          setPasswordDialogOpen(false);
        }
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Password Update Failed",
        description: "There was an error updating the password.",
        variant: "destructive"
      });
    }
  };
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return {
    driver,
    editedDriver,
    isEditing,
    activeSection,
    passwordDialogOpen,
    setPasswordDialogOpen,
    handleEdit,
    handleCancel,
    handleSave,
    handleInputChange,
    handlePasswordReset,
    handleSectionChange,
  };
};

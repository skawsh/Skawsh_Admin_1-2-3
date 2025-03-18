
// Driver status
export type DriverStatus = 'active' | 'inactive';

// Driver data structure
export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  phoneNumber: string;
  assignedOrders?: number;
  totalDeliveries?: number;
  rating?: number;
  
  // Personal Information
  dateOfBirth?: string;
  secondaryPhone?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContact?: string;
  currentAddress?: string;
  permanentAddress?: string;
  
  // Driver Documentation
  aadharNumber?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  
  // Vehicle Information
  vehicleDetails?: {
    make?: string;
    model?: string;
    year?: string;
    color?: string;
    licensePlate?: string;
  };
  
  // Payment Details
  paymentDetails?: {
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    confirmAccountNumber?: string;
    ifscCode?: string;
    branchName?: string;
  };
  
  // Document file references (would normally store file paths/references)
  documentFiles?: {
    aadharFile?: string;
    licenseFile?: string;
    profilePicture?: string;
    rcFile?: string;
    insuranceFile?: string;
    vehicleFrontImage?: string;
    vehicleBackImage?: string;
    vehicleRightImage?: string;
    vehicleLeftImage?: string;
  };
}

// Component props types
export interface DriversTableProps {
  className?: string;
}

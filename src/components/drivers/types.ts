
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
  // Additional fields from the driver onboarding form
  dateOfBirth?: string;
  secondaryPhone?: string;
  email?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContact?: string;
  currentAddress?: string;
  permanentAddress?: string;
  vehicleDetails?: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
  };
}

// Component props types
export interface DriversTableProps {
  className?: string;
}

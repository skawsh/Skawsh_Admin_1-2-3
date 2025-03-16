
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
}

// Component props types
export interface DriversTableProps {
  className?: string;
}

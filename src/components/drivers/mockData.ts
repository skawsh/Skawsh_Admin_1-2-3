
import { Driver } from './types';

// Sample driver data
export const sampleDrivers: Driver[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    status: 'active',
    phoneNumber: '+91 98765 43210',
    assignedOrders: 3,
    totalDeliveries: 145,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Priya Sharma',
    status: 'active',
    phoneNumber: '+91 87654 32109',
    assignedOrders: 5,
    totalDeliveries: 120,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Amit Singh',
    status: 'active',
    phoneNumber: '+91 76543 21098',
    assignedOrders: 2,
    totalDeliveries: 98,
    rating: 4.6
  },
  {
    id: '4',
    name: 'Neha Patel',
    status: 'active',
    phoneNumber: '+91 65432 10987',
    assignedOrders: 4,
    totalDeliveries: 112,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Rahul Gupta',
    status: 'inactive',
    phoneNumber: '+91 54321 09876',
    assignedOrders: 0,
    totalDeliveries: 87,
    rating: 4.3
  },
  {
    id: '6',
    name: 'Divya Reddy',
    status: 'inactive',
    phoneNumber: '+91 43210 98765',
    assignedOrders: 0,
    totalDeliveries: 76,
    rating: 4.5
  },
  // Adding new drivers
  {
    id: '7',
    name: 'Chetan Kumar',
    status: 'active',
    phoneNumber: '+91 87654 32100',
    assignedOrders: 0,
    totalDeliveries: 92,
    rating: 4.7
  },
  {
    id: '8',
    name: 'Deepak Sharma',
    status: 'active',
    phoneNumber: '+91 76543 21000',
    assignedOrders: 0,
    totalDeliveries: 78,
    rating: 4.5
  },
  {
    id: '9',
    name: 'Saiteja Reddy',
    status: 'active',
    phoneNumber: '+91 65432 10000',
    assignedOrders: 0,
    totalDeliveries: 85,
    rating: 4.6
  },
  {
    id: '10',
    name: 'Mahesh Verma',
    status: 'active',
    phoneNumber: '+91 54321 00000',
    assignedOrders: 0,
    totalDeliveries: 80,
    rating: 4.4
  },
  {
    id: '11',
    name: 'Eswari Devi',
    status: 'active',
    phoneNumber: '+91 43210 00000',
    assignedOrders: 0,
    totalDeliveries: 72,
    rating: 4.8
  }
];

// Calculate metrics
export const totalDrivers = sampleDrivers.length;
export const activeDrivers = sampleDrivers.filter(driver => driver.status === 'active').length;
export const inactiveDrivers = sampleDrivers.filter(driver => driver.status === 'inactive').length;

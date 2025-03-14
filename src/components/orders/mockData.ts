
import { Order } from './types';

// Sample order data for Hyderabad, India region with current dates
export const sampleOrders: Order[] = [
  {
    id: 'ORD-0001',
    orderDate: '2024-07-28',
    customer: 'Rajesh Kumar',
    status: 'collected',
    studio: 'Madhapur Studio',
    driver: 'Anand Reddy',
    total: 950,
    deliveryDate: '2024-07-30',
    washType: 'standard',
  },
  {
    id: 'ORD-0002',
    orderDate: '2024-07-29',
    customer: 'Priya Sharma',
    status: 'in-progress',
    studio: 'Hitech City Studio',
    driver: 'Kavya Singh',
    total: 755,
    deliveryDate: null,
    washType: 'express',
  },
  {
    id: 'ORD-0003',
    orderDate: '2024-07-29',
    customer: 'Arun Verma',
    status: 'ready-for-collect',
    studio: 'Gachibowli Studio',
    driver: 'Ravi Teja',
    total: 1200,
    deliveryDate: null,
    washType: 'both',
  },
  {
    id: 'ORD-0004',
    orderDate: '2024-07-30',
    customer: 'Deepika Reddy',
    status: 'new',
    studio: 'Banjara Hills Studio',
    driver: 'Unassigned',
    total: 890,
    deliveryDate: null,
    washType: 'standard',
  },
  {
    id: 'ORD-0005',
    orderDate: '2024-07-27',
    customer: 'Venkat Rao',
    status: 'cancelled',
    studio: 'Jubilee Hills Studio',
    driver: 'Cancelled',
    total: 0,
    deliveryDate: null,
    washType: 'express',
  },
  {
    id: 'ORD-0006',
    orderDate: '2024-07-31',
    customer: 'Sneha Reddy',
    status: 'received',
    studio: 'Ameerpet Studio',
    driver: 'Pending Assignment',
    total: 675,
    deliveryDate: null,
    washType: 'standard',
  },
  {
    id: 'ORD-0007',
    orderDate: '2024-07-26',
    customer: 'Rahul Chowdary',
    status: 'delivered',
    studio: 'Kukatpally Studio',
    driver: 'Srinivas Kumar',
    total: 1450,
    deliveryDate: '2024-07-28',
    washType: 'both',
  },
  {
    id: 'ORD-0008',
    orderDate: '2024-07-25',
    customer: 'Neha Singh',
    status: 'delivered',
    studio: 'Madhapur Studio',
    driver: 'Anand Reddy',
    total: 875,
    deliveryDate: '2024-07-27',
    washType: 'standard',
  },
  {
    id: 'ORD-0009',
    orderDate: '2024-07-24',
    customer: 'Kiran Reddy',
    status: 'collected',
    studio: 'Hitech City Studio',
    driver: 'Ravi Teja',
    total: 1100,
    deliveryDate: '2024-07-26',
    washType: 'express',
  },
  {
    id: 'ORD-0010',
    orderDate: '2024-07-23',
    customer: 'Ananya Desai',
    status: 'delivered',
    studio: 'Gachibowli Studio',
    driver: 'Srinivas Kumar',
    total: 1150,
    deliveryDate: '2024-07-25',
    washType: 'both',
  }
];

// Calculate the total orders
export const totalOrders = sampleOrders.length;

// Calculate delivered orders
export const deliveredOrders = sampleOrders.filter(order => 
  order.status === 'delivered'
).length;

// Calculate collected orders
export const collectedOrders = sampleOrders.filter(order => 
  order.status === 'collected'
).length;

// Calculate in-progress orders
export const inProgressOrders = sampleOrders.filter(order => 
  order.status === 'in-progress' || order.status === 'received' || order.status === 'ready-for-collect'
).length;

// Calculate total revenue
export const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.total, 0);

// Calculate average order value
export const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

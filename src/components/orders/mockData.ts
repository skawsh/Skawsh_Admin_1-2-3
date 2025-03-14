
import { Order } from './types';

// Sample order data for Hyderabad, India region
export const sampleOrders: Order[] = [
  {
    id: 'ORD-0001',
    orderDate: '2023-03-12',
    customer: 'Rajesh Kumar',
    status: 'collected',
    studio: 'Madhapur Studio',
    driver: 'Anand Reddy',
    total: 950,
    deliveryDate: '2023-03-14',
  },
  {
    id: 'ORD-0002',
    orderDate: '2023-03-13',
    customer: 'Priya Sharma',
    status: 'in-progress',
    studio: 'Hitech City Studio',
    driver: 'Kavya Singh',
    total: 755,
    deliveryDate: null,
  },
  {
    id: 'ORD-0003',
    orderDate: '2023-03-13',
    customer: 'Arun Verma',
    status: 'ready-for-collect',
    studio: 'Gachibowli Studio',
    driver: 'Ravi Teja',
    total: 1200,
    deliveryDate: null,
  },
  {
    id: 'ORD-0004',
    orderDate: '2023-03-14',
    customer: 'Deepika Patel',
    status: 'new',
    studio: 'Madhapur Studio',
    driver: 'Unassigned',
    total: 890,
    deliveryDate: null,
  },
  {
    id: 'ORD-0005',
    orderDate: '2023-03-11',
    customer: 'Venkat Rao',
    status: 'cancelled',
    studio: 'Jubilee Hills Studio',
    driver: 'Cancelled',
    total: 0,
    deliveryDate: null,
  },
  {
    id: 'ORD-0006',
    orderDate: '2023-03-15',
    customer: 'Sneha Reddy',
    status: 'received',
    studio: 'Madhapur Studio',
    driver: 'Pending Assignment',
    total: 675,
    deliveryDate: null,
  },
  {
    id: 'ORD-0007',
    orderDate: '2023-03-10',
    customer: 'Rahul Mehta',
    status: 'delivered',
    studio: 'Banjara Hills Studio',
    driver: 'Srinivas Kumar',
    total: 1450,
    deliveryDate: '2023-03-12',
  },
  {
    id: 'ORD-0008',
    orderDate: '2023-03-09',
    customer: 'Neha Singh',
    status: 'delivered',
    studio: 'Madhapur Studio',
    driver: 'Anand Reddy',
    total: 875,
    deliveryDate: '2023-03-11',
  },
  {
    id: 'ORD-0009',
    orderDate: '2023-03-08',
    customer: 'Kiran Reddy',
    status: 'collected',
    studio: 'Hitech City Studio',
    driver: 'Ravi Teja',
    total: 1100,
    deliveryDate: '2023-03-10',
  },
  {
    id: 'ORD-0010',
    orderDate: '2023-03-07',
    customer: 'Ananya Desai',
    status: 'delivered',
    studio: 'Gachibowli Studio',
    driver: 'Srinivas Kumar',
    total: 1150,
    deliveryDate: '2023-03-09',
  }
];

// Calculate the total orders
export const totalOrders = sampleOrders.length;

// Calculate in-progress orders
export const inProgressOrders = sampleOrders.filter(order => 
  order.status === 'in-progress' || order.status === 'received' || order.status === 'ready-for-collect'
).length;

// Calculate total revenue
export const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.total, 0);

// Calculate average order value
export const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;


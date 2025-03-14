
import { Order } from './types';

// Get current date for reference
const today = new Date();

// Calculate a date from the last month (30 days ago)
const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 30);

// Helper function to get a random date between two dates
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to format date to YYYY-MM-DD
const formatDateString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Sample order data for Hyderabad, India region with realistic dates within the last month
export const sampleOrders: Order[] = [
  {
    id: 'ORD-0001',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Rajesh Kumar',
    status: 'collected',
    studio: 'PKC Laundries - Nallagandla',
    driver: 'Anand Reddy',
    total: 950,
    deliveryDate: formatDateString(getRandomDate(lastMonth, today)),
    washType: 'standard',
  },
  {
    id: 'ORD-0002',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Priya Sharma',
    status: 'in-progress',
    studio: 'MagicKlean - Masab Tank',
    driver: 'Kavya Singh',
    total: 755,
    deliveryDate: null,
    washType: 'express',
  },
  {
    id: 'ORD-0003',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Arun Verma',
    status: 'ready-for-collect',
    studio: 'Cleanovo - Film Nagar',
    driver: 'Ravi Teja',
    total: 1200,
    deliveryDate: null,
    washType: 'both',
  },
  {
    id: 'ORD-0004',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Deepika Reddy',
    status: 'new',
    studio: 'UClean Laundry - Himayatnagar',
    driver: 'Unassigned',
    total: 890,
    deliveryDate: null,
    washType: 'standard',
  },
  {
    id: 'ORD-0005',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Venkat Rao',
    status: 'cancelled',
    studio: 'Tumbledry - Jubilee Hills',
    driver: 'Cancelled',
    total: 0,
    deliveryDate: null,
    washType: 'express',
  },
  {
    id: 'ORD-0006',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Sneha Reddy',
    status: 'received',
    studio: 'Washmart Laundry - Kukatpally',
    driver: 'Pending Assignment',
    total: 675,
    deliveryDate: null,
    washType: 'standard',
  },
  {
    id: 'ORD-0007',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Rahul Chowdary',
    status: 'delivered',
    studio: 'We Washh - Kukatpally',
    driver: 'Srinivas Kumar',
    total: 1450,
    deliveryDate: formatDateString(getRandomDate(lastMonth, today)),
    washType: 'both',
  },
  {
    id: 'ORD-0008',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Neha Singh',
    status: 'delivered',
    studio: 'The Laundry Basket - Kukatpally',
    driver: 'Anand Reddy',
    total: 875,
    deliveryDate: formatDateString(getRandomDate(lastMonth, today)),
    washType: 'standard',
  },
  {
    id: 'ORD-0009',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Kiran Reddy',
    status: 'collected',
    studio: 'FABO Laundry - Kukatpally',
    driver: 'Ravi Teja',
    total: 1100,
    deliveryDate: formatDateString(getRandomDate(lastMonth, today)),
    washType: 'express',
  },
  {
    id: 'ORD-0010',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Ananya Desai',
    status: 'delivered',
    studio: 'Sunshine Dry Cleaners - Toli Chowki',
    driver: 'Srinivas Kumar',
    total: 1150,
    deliveryDate: formatDateString(getRandomDate(lastMonth, today)),
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

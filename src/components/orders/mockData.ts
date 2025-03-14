
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

// Helper function to ensure the delivery date is always after the order date
const getDeliveryDate = (orderDate: Date) => {
  // Add 1-3 days to order date for delivery
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + Math.floor(Math.random() * 3) + 1);
  
  // Make sure delivery date is not in the future beyond today
  return deliveryDate > today ? today : deliveryDate;
};

// Sample order data for Hyderabad, India region with realistic dates within the last month
export const sampleOrders: Order[] = [
  {
    id: 'ORD-0001',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Rajesh Kumar',
    status: 'collected',
    studio: 'PKC Laundries',
    driver: 'Anand Reddy',
    total: 950,
    deliveryDate: null,
    washType: 'standard',
    assigned: true
  },
  {
    id: 'ORD-0002',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Priya Sharma',
    status: 'in-progress',
    studio: 'MagicKlean',
    driver: 'Kavya Singh',
    total: 755,
    deliveryDate: null,
    washType: 'express',
    assigned: true
  },
  {
    id: 'ORD-0003',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Arun Verma',
    status: 'ready-for-collect',
    studio: 'Cleanovo',
    driver: 'Ravi Teja',
    total: 1200,
    deliveryDate: null,
    washType: 'both',
    assigned: true
  },
  {
    id: 'ORD-0004',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Deepika Reddy',
    status: 'new',
    studio: 'UClean',
    driver: 'Unassigned',
    total: 890,
    deliveryDate: null,
    washType: 'standard',
    assigned: false
  },
  {
    id: 'ORD-0005',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Venkat Rao',
    status: 'cancelled',
    studio: 'Tumbledry',
    driver: 'Cancelled',
    total: 0,
    deliveryDate: null,
    washType: 'express',
    assigned: false
  },
  {
    id: 'ORD-0006',
    orderDate: formatDateString(getRandomDate(lastMonth, today)),
    customer: 'Sneha Reddy',
    status: 'received',
    studio: 'Washmart',
    driver: 'Pending Assignment',
    total: 675,
    deliveryDate: null,
    washType: 'standard',
    assigned: false
  },
];

// Process the orders to add proper delivery dates
sampleOrders.forEach(order => {
  // Create a date object from order date string
  const orderDateObj = new Date(order.orderDate);
  
  // Delivered and Collected statuses should have delivery dates
  if (order.status === 'delivered' || order.status === 'collected') {
    order.deliveryDate = formatDateString(getDeliveryDate(orderDateObj));
  }
});

// Add more orders with logical dates
const orderDate7 = getRandomDate(lastMonth, today);
const orderDate8 = getRandomDate(lastMonth, today);
const orderDate9 = getRandomDate(lastMonth, today);
const orderDate10 = getRandomDate(lastMonth, today);
const orderDate11 = getRandomDate(lastMonth, today);
const orderDate12 = getRandomDate(lastMonth, today);

sampleOrders.push(
  {
    id: 'ORD-0007',
    orderDate: formatDateString(orderDate7),
    customer: 'Rahul Chowdary',
    status: 'delivered',
    studio: 'We Washh',
    driver: 'Srinivas Kumar',
    total: 1450,
    deliveryDate: formatDateString(getDeliveryDate(orderDate7)),
    washType: 'both',
    assigned: true
  },
  {
    id: 'ORD-0008',
    orderDate: formatDateString(orderDate8),
    customer: 'Neha Singh',
    status: 'delivered',
    studio: 'The Laundry Basket',
    driver: 'Anand Reddy',
    total: 875,
    deliveryDate: formatDateString(getDeliveryDate(orderDate8)),
    washType: 'standard',
    assigned: true
  },
  {
    id: 'ORD-0009',
    orderDate: formatDateString(orderDate9),
    customer: 'Kiran Reddy',
    status: 'collected',
    studio: 'FABO',
    driver: 'Ravi Teja',
    total: 1100,
    deliveryDate: formatDateString(getDeliveryDate(orderDate9)),
    washType: 'express',
    assigned: true
  },
  {
    id: 'ORD-0010',
    orderDate: formatDateString(orderDate10),
    customer: 'Ananya Desai',
    status: 'delivered',
    studio: 'Sunshine',
    driver: 'Srinivas Kumar',
    total: 1150,
    deliveryDate: formatDateString(getDeliveryDate(orderDate10)),
    washType: 'both',
    assigned: true
  },
  {
    id: 'ORD-0011',
    orderDate: formatDateString(orderDate11),
    customer: 'Vikram Malhotra',
    status: 'new',
    studio: 'Bhavani BAND BOX',
    driver: 'Unassigned',
    total: 780,
    deliveryDate: null,
    washType: 'standard',
    assigned: false
  },
  {
    id: 'ORD-0012',
    orderDate: formatDateString(orderDate12),
    customer: 'Aarti Patel',
    status: 'ready-for-collect',
    studio: 'Balus Modern',
    driver: 'Kavya Singh',
    total: 1320,
    deliveryDate: null,
    washType: 'express',
    assigned: true
  }
);

// Calculate the total orders
export const totalOrders = sampleOrders.length;

// Calculate new orders
export const newOrders = sampleOrders.filter(order => 
  order.status === 'new'
).length;

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
  order.status === 'in-progress'
).length;

// Calculate ready-for-collect orders
export const readyForCollectOrders = sampleOrders.filter(order => 
  order.status === 'ready-for-collect'
).length;

// Calculate cancelled orders
export const cancelledOrders = sampleOrders.filter(order => 
  order.status === 'cancelled'
).length;

// Calculate assigned orders
export const assignedOrders = sampleOrders.filter(order => 
  order.assigned === true
).length;

// Calculate total revenue
export const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.total, 0);

// Calculate average order value
export const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

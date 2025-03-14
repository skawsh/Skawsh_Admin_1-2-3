
import { Order } from '../types';
import { getRandomDate, formatDateString, getDeliveryDate } from '../utils/dateUtils';

// Get current date for reference
const today = new Date();

// Calculate a date from the last month (30 days ago)
const lastMonth = new Date(today);
lastMonth.setDate(today.getDate() - 30);

// Generate sample orders
export const generateSampleOrders = (): Order[] => {
  const orders: Order[] = [
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

  // Add more orders with logical dates
  const orderDate7 = getRandomDate(lastMonth, today);
  const orderDate8 = getRandomDate(lastMonth, today);
  const orderDate9 = getRandomDate(lastMonth, today);
  const orderDate10 = getRandomDate(lastMonth, today);
  const orderDate11 = getRandomDate(lastMonth, today);
  const orderDate12 = getRandomDate(lastMonth, today);

  orders.push(
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

  // Process the orders to add proper delivery dates
  orders.forEach(order => {
    // Create a date object from order date string
    const orderDateObj = new Date(order.orderDate);
    
    // Delivered and Collected statuses should have delivery dates
    if (order.status === 'delivered' || order.status === 'collected') {
      order.deliveryDate = formatDateString(getDeliveryDate(orderDateObj));
    }
  });

  return orders;
};

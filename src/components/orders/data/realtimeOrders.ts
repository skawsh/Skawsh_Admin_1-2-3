
import { Order } from '../types';
import { formatDateString } from '../utils/dateUtils';

// Generate real-time orders with current timestamps
export const generateRealtimeOrders = (): Order[] => {
  const orders: Order[] = [];
  
  // Get current time and time intervals
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
  const twentyMinutesAgo = new Date(now.getTime() - 20 * 60 * 1000);
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

  // Add real-time new orders
  orders.push(
    {
      id: 'ORD-RT001',
      orderDate: formatDateString(now),
      customer: 'Vijay Malhotra',
      status: 'new',
      studio: 'CleanCorp',
      driver: 'Unassigned',
      total: 850,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      phone: '+91 9998887770',
      customerAddress: '204, Jubilee Heights, Madhapur, Hyderabad',
      studioAddress: 'CleanCorp, Raheja Mindspace, HITEC City'
    },
    {
      id: 'ORD-RT002',
      orderDate: formatDateString(fiveMinutesAgo),
      customer: 'Aarti Saxena',
      status: 'new',
      studio: 'We Washh',
      driver: 'Unassigned',
      total: 1250,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      phone: '+91 8889997770',
      customerAddress: '45-B, Financial District, Gachibowli, Hyderabad',
      studioAddress: 'We Washh, Cyber Towers, Hitech City'
    },
    {
      id: 'ORD-RT003',
      orderDate: formatDateString(tenMinutesAgo),
      customer: 'Rohit Menon',
      status: 'new',
      studio: 'Laundry Lab',
      driver: 'Unassigned',
      total: 725,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 7776665550',
      customerAddress: '123, Lotus Pond View, Khajaguda, Hyderabad',
      studioAddress: 'Laundry Lab, Q City, Gachibowli'
    },
    {
      id: 'ORD-RT004',
      orderDate: formatDateString(fifteenMinutesAgo),
      customer: 'Meera Kapoor',
      status: 'new',
      studio: 'TidyTowels',
      driver: 'Unassigned',
      total: 950,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      phone: '+91 6667778880',
      customerAddress: '78, Oakridge Residency, Kondapur, Hyderabad',
      studioAddress: 'TidyTowels, Skyview Complex, Kondapur'
    }
  );

  // Add real-time Ready for Collection orders
  orders.push(
    {
      id: 'ORD-RTC001',
      orderDate: formatDateString(twentyMinutesAgo),
      customer: 'Pranav Agarwal',
      status: 'ready-for-collect',
      studio: 'WashWorld',
      driver: 'Unassigned',
      total: 1100,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      phone: '+91 8887776660',
      customerAddress: '42, Serene Valley, Manikonda, Hyderabad',
      studioAddress: 'WashWorld, Golden Mile, Manikonda'
    },
    {
      id: 'ORD-RTC002',
      orderDate: formatDateString(thirtyMinutesAgo),
      customer: 'Divya Krishnan',
      status: 'ready-for-collect',
      studio: 'SparkleWash',
      driver: 'Unassigned',
      total: 875,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 9996665550',
      customerAddress: '156, Lake View Apartments, Kukatpally, Hyderabad',
      studioAddress: 'SparkleWash, KPHB Colony, Kukatpally'
    },
    {
      id: 'ORD-RTC003',
      orderDate: formatDateString(thirtyMinutesAgo),
      customer: 'Karan Bajaj',
      status: 'ready-for-collect',
      studio: 'LuxWash',
      driver: 'Unassigned',
      total: 1450,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      phone: '+91 7778889990',
      customerAddress: '89, Green Meadows, Gachibowli, Hyderabad',
      studioAddress: 'LuxWash, DLF Cyber City, Gachibowli'
    }
  );
  
  return orders;
};

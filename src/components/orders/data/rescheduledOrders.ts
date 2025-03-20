
import { Order } from '../types';
import { formatDateString, getRandomDate } from '../utils/dateUtils';

// Generate exclusively rescheduled orders (not in new or ready collections)
export const generateRescheduledOrders = (): Order[] => {
  const rescheduledOrders: Order[] = [
    {
      id: 'ORD-R001',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Sanjay Mehta',
      status: 'new',
      studio: 'Laundry Express',
      driver: 'Unassigned',
      total: 1250,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      rescheduled: true,
      phone: '+91 9876123450',
      customerAddress: '27, Film Nagar, Hyderabad',
      studioAddress: 'Laundry Express, Road No. 12, Banjara Hills'
    },
    {
      id: 'ORD-R002',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Lakshmi Devi',
      status: 'ready-for-collect',
      studio: 'Speed Wash',
      driver: 'Unassigned',
      total: 895,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      rescheduled: true,
      phone: '+91 8761234509',
      customerAddress: '45, Nallagandla, Hyderabad',
      studioAddress: 'Speed Wash, Near BHEL, Chandanagar'
    },
    {
      id: 'ORD-R003',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Nitin Kapoor',
      status: 'new',
      studio: 'Wash Masters',
      driver: 'Unassigned',
      total: 750,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      rescheduled: true,
      phone: '+91 7651234098',
      customerAddress: '19, Bowanpally, Secunderabad',
      studioAddress: 'Wash Masters, Karkhana, Secunderabad'
    },
    {
      id: 'ORD-R004',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Meera Sharma',
      status: 'new',
      studio: 'Urban Clean',
      driver: 'Unassigned',
      total: 1100,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      rescheduled: true,
      phone: '+91 6541234987',
      customerAddress: '54, LB Nagar, Hyderabad',
      studioAddress: 'Urban Clean, Kothapet, Hyderabad'
    },
    {
      id: 'ORD-R005',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Arjun Nair',
      status: 'new',
      studio: 'Fresh Laundry',
      driver: 'Unassigned',
      total: 980,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      rescheduled: true,
      phone: '+91 5431234876',
      customerAddress: '37, Sainikpuri, Secunderabad',
      studioAddress: 'Fresh Laundry, Defence Colony, Sainikpuri'
    }
  ];

  return rescheduledOrders;
};


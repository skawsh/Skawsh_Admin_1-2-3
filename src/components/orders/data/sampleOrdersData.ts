
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
      status: 'delivered',
      studio: 'PKC Laundries',
      driver: 'Anand Reddy',
      total: 950,
      deliveryDate: null,
      washType: 'standard',
      assigned: true,
      phone: '+91 98765 12345',
      customerAddress: '42/A, MG Road, Bangalore 560001',
      studioAddress: '15 Commercial St, Bangalore 560001'
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
      assigned: true,
      phone: '+91 87654 23456',
      customerAddress: '78 Indiranagar, Bangalore 560038',
      studioAddress: '101 CMH Road, Bangalore 560038'
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
      assigned: true,
      phone: '+91 76543 34567',
      customerAddress: '23 Koramangala 4th Block, Bangalore 560034',
      studioAddress: '56 Koramangala 5th Block, Bangalore 560034'
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
      assigned: false,
      phone: '+91 65432 45678',
      customerAddress: '109 HSR Layout, Bangalore 560102',
      studioAddress: '202 HSR Layout Sector 2, Bangalore 560102'
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
      assigned: false,
      phone: '+91 54321 56789',
      customerAddress: '45 Whitefield, Bangalore 560066',
      studioAddress: '78 Whitefield Main Road, Bangalore 560066'
    },
    {
      id: 'ORD-0006',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Sneha Reddy',
      status: 'new',
      studio: 'Washmart',
      driver: 'Unassigned',
      total: 675,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 43210 67890',
      customerAddress: '67 JP Nagar Phase 7, Bangalore 560078',
      studioAddress: '123 JP Nagar Phase 6, Bangalore 560078'
    },
    {
      id: 'ORD-0007',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Rahul Chowdary',
      status: 'delivered',
      studio: 'We Washh',
      driver: 'Srinivas Kumar',
      total: 1450,
      deliveryDate: null,
      washType: 'both',
      assigned: true,
      phone: '+91 32109 78901',
      customerAddress: '34 Jayanagar 4th Block, Bangalore 560041',
      studioAddress: '56 Jayanagar 3rd Block, Bangalore 560041'
    },
    {
      id: 'ORD-0008',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Neha Singh',
      status: 'delivered',
      studio: 'The Laundry Basket',
      driver: 'Anand Reddy',
      total: 875,
      deliveryDate: null,
      washType: 'standard',
      assigned: true,
      phone: '+91 21098 89012',
      customerAddress: '78 Richmond Road, Bangalore 560025',
      studioAddress: '90 Richmond Circle, Bangalore 560025'
    },
    {
      id: 'ORD-0009',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Kiran Reddy',
      status: 'delivered',
      studio: 'FABO',
      driver: 'Ravi Teja',
      total: 1100,
      deliveryDate: null,
      washType: 'express',
      assigned: true,
      phone: '+91 10987 90123',
      customerAddress: '12 Malleshwaram, Bangalore 560003',
      studioAddress: '34 Malleshwaram Market, Bangalore 560003'
    },
    {
      id: 'ORD-0010',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Ananya Desai',
      status: 'delivered',
      studio: 'Sunshine',
      driver: 'Srinivas Kumar',
      total: 1150,
      deliveryDate: null,
      washType: 'both',
      assigned: true,
      phone: '+91 09876 01234',
      customerAddress: '56 Bannerghatta Road, Bangalore 560076',
      studioAddress: '78 Bannerghatta Main Road, Bangalore 560076'
    },
    {
      id: 'ORD-0011',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Vikram Malhotra',
      status: 'new',
      studio: 'Bhavani BAND BOX',
      driver: 'Unassigned',
      total: 780,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 98765 12345',
      customerAddress: '90 Ulsoor, Bangalore 560008',
      studioAddress: '123 Ulsoor Lake Road, Bangalore 560008'
    },
    {
      id: 'ORD-0012',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Aarti Patel',
      status: 'ready-for-collect',
      studio: 'Balus Modern',
      driver: 'Kavya Singh',
      total: 1320,
      deliveryDate: null,
      washType: 'express',
      assigned: true,
      phone: '+91 87654 23456',
      customerAddress: '45 BTM Layout, Bangalore 560029',
      studioAddress: '67 BTM 2nd Stage, Bangalore 560029'
    }
  ];

  // Add more new orders
  orders.push(
    {
      id: 'ORD-0013',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Arnav Mehta',
      status: 'new',
      studio: 'Express Wash',
      driver: 'Unassigned',
      total: 930,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 76543 34567',
      customerAddress: '101 Bellandur, Bangalore 560103',
      studioAddress: '234 Bellandur Junction, Bangalore 560103'
    },
    {
      id: 'ORD-0014',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Sameer Joshi',
      status: 'new',
      studio: 'Speed Laundry',
      driver: 'Unassigned',
      total: 750,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      phone: '+91 65432 45678',
      customerAddress: '78 Marathahalli, Bangalore 560037',
      studioAddress: '111 Marathahalli Bridge, Bangalore 560037'
    },
    {
      id: 'ORD-0015',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Meena Gupta',
      status: 'new',
      studio: 'Wash Express',
      driver: 'Unassigned',
      total: 1050,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      phone: '+91 54321 56789',
      customerAddress: '23 Electronic City, Bangalore 560100',
      studioAddress: '45 Electronic City Phase 1, Bangalore 560100'
    }
  );

  // Add more ready-for-collect orders
  orders.push(
    {
      id: 'ORD-0016',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Vivek Malhotra',
      status: 'ready-for-collect',
      studio: 'Fresh Laundromat',
      driver: 'Unassigned',
      total: 870,
      deliveryDate: null,
      washType: 'standard',
      assigned: false,
      phone: '+91 43210 67890',
      customerAddress: '56 Domlur, Bangalore 560071',
      studioAddress: '78 Domlur Layout, Bangalore 560071'
    },
    {
      id: 'ORD-0017',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Preeti Verma',
      status: 'ready-for-collect',
      studio: 'Cleanly',
      driver: 'Unassigned',
      total: 980,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      phone: '+91 32109 78901',
      customerAddress: '89 Banaswadi, Bangalore 560033',
      studioAddress: '112 Banaswadi Main Road, Bangalore 560033'
    },
    {
      id: 'ORD-0018',
      orderDate: formatDateString(getRandomDate(lastMonth, today)),
      customer: 'Rajan Iyer',
      status: 'ready-for-collect',
      studio: 'Wash & Fold',
      driver: 'Unassigned',
      total: 1150,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      phone: '+91 21098 89012',
      customerAddress: '34 RR Nagar, Bangalore 560098',
      studioAddress: '56 RR Nagar Main Road, Bangalore 560098'
    }
  );

  // Process the orders to add proper delivery dates
  orders.forEach(order => {
    // Create a date object from order date string
    const orderDateObj = new Date(order.orderDate);
    
    // Only delivered status should have delivery dates
    if (order.status === 'delivered') {
      order.deliveryDate = formatDateString(getDeliveryDate(orderDateObj));
    }
  });

  return orders;
};

// Generate exclusively rescheduled orders (not in new or ready collections)
export const generateExclusiveRescheduledOrders = (): Order[] => {
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
      phone: '+91 98765 54321',
      customerAddress: '123 Hebbal, Bangalore 560024',
      studioAddress: '456 Hebbal Main Road, Bangalore 560024'
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
      phone: '+91 87654 65432',
      customerAddress: '78 Cox Town, Bangalore 560005',
      studioAddress: '90 Cox Town Market, Bangalore 560005'
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
      phone: '+91 76543 76543',
      customerAddress: '45 Vijayanagar, Bangalore 560040',
      studioAddress: '67 Vijayanagar Main Road, Bangalore 560040'
    },
    {
      id: 'ORD-R004',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Meera Sharma',
      status: 'ready-for-collect',
      studio: 'Urban Clean',
      driver: 'Unassigned',
      total: 1100,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      rescheduled: true,
      phone: '+91 65432 87654',
      customerAddress: '12 Frazer Town, Bangalore 560005',
      studioAddress: '34 Frazer Town Market, Bangalore 560005'
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
      phone: '+91 54321 98765',
      customerAddress: '90 Kalyan Nagar, Bangalore 560043',
      studioAddress: '112 Kalyan Nagar Main Road, Bangalore 560043'
    },
    {
      id: 'ORD-R006',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Divya Menon',
      status: 'new',
      studio: 'Elite Laundries',
      driver: 'Unassigned',
      total: 1250,
      deliveryDate: null,
      washType: 'express',
      assigned: false,
      rescheduled: true,
      phone: '+91 43210 12345',
      customerAddress: '56 Kammanahalli, Bangalore 560084',
      studioAddress: '78 Kammanahalli Main Road, Bangalore 560084'
    },
    {
      id: 'ORD-R007',
      orderDate: formatDateString(getRandomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date())),
      customer: 'Prakash Rao',
      status: 'ready-for-collect',
      studio: 'Quick Wash',
      driver: 'Unassigned',
      total: 860,
      deliveryDate: null,
      washType: 'both',
      assigned: false,
      rescheduled: true,
      phone: '+91 32109 23456',
      customerAddress: '34 Yelahanka, Bangalore 560064',
      studioAddress: '56 Yelahanka New Town, Bangalore 560064'
    }
  ];

  return rescheduledOrders;
};

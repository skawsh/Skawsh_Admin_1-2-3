
import { Order } from '../types';
import { 
  generateStandardOrders, 
  generateAdditionalOrders 
} from './standardOrders';
import { generateRealtimeOrders } from './realtimeOrders';
import { generateRescheduledOrders } from './rescheduledOrders';
import { processOrders, combineOrders } from './orderProcessor';

// Generate sample orders by combining all order types
export const generateSampleOrders = (): Order[] => {
  // Get orders from different sources
  const standardOrders = generateStandardOrders();
  const additionalOrders = generateAdditionalOrders();
  const realtimeOrders = generateRealtimeOrders();
  const rescheduledOrders = generateRescheduledOrders();
  
  // Combine all order types
  const allOrders = combineOrders(standardOrders, additionalOrders, realtimeOrders, rescheduledOrders);
  
  // Process orders to ensure all data is consistent
  return processOrders(allOrders);
};

// Generate exclusive rescheduled orders
export const generateExclusiveRescheduledOrders = (): Order[] => {
  return generateRescheduledOrders();
};


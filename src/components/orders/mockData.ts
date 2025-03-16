
import { generateSampleOrders, generateExclusiveRescheduledOrders } from './data/sampleOrdersData';
import { calculateOrderMetrics } from './data/orderMetrics';

// Generate the sample orders
export const sampleOrders = generateSampleOrders();

// Generate exclusive rescheduled orders
export const exclusiveRescheduledOrders = generateExclusiveRescheduledOrders();

// Calculate and export all the metrics
const metrics = calculateOrderMetrics(sampleOrders);

// Export individual metrics
export const {
  totalOrders,
  newOrders,
  deliveredOrders,
  inProgressOrders,
  readyForCollectOrders,
  cancelledOrders,
  assignedOrders,
  totalRevenue,
  avgOrderValue
} = metrics;

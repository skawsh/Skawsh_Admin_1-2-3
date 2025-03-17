
import { Order } from '../types';

// Calculate various metrics from the orders
export const calculateOrderMetrics = (orders: Order[]) => {
  // Calculate the total orders
  const totalOrders = orders.length;

  // Calculate new orders
  const newOrders = orders.filter(order => 
    order.status === 'new'
  ).length;

  // Calculate delivered orders
  const deliveredOrders = orders.filter(order => 
    order.status === 'delivered'
  ).length;

  // Calculate in-progress orders
  const inProgressOrders = orders.filter(order => 
    order.status === 'in-progress'
  ).length;

  // Calculate ready-for-collect orders
  const readyForCollectOrders = orders.filter(order => 
    order.status === 'ready-for-collect'
  ).length;

  // Calculate cancelled orders
  const cancelledOrders = orders.filter(order => 
    order.status === 'cancelled'
  ).length;

  // Calculate assigned orders
  const assignedOrders = orders.filter(order => 
    order.assigned === true
  ).length;

  // Calculate completed orders
  const completedOrders = orders.filter(order => 
    order.status === 'completed' || 
    (order.status === 'new' && order.dropped === true)
  ).length;

  // Calculate total revenue
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Calculate average order value
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

  return {
    totalOrders,
    newOrders,
    deliveredOrders,
    inProgressOrders,
    readyForCollectOrders,
    cancelledOrders,
    assignedOrders,
    completedOrders,
    totalRevenue,
    avgOrderValue
  };
};
